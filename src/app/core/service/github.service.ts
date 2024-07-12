import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import {
  AccessTokenResponse,
  Branch,
  GithubRepository,
  RepoBranch,
  RepoCommit,
  RepoPull,
} from "../model/github";
import { ZipService } from "../fileSystem/ZipWorker/zip.service";
import { FilesService } from "../fileSystem/Filer/files.service";
import { ZipSingleTaskInterface } from "../fileSystem/ZipWorker/zip-single-task.interface";
import { GitService } from "src/app/api/collab/services";
import { RepositoryService } from "./repository.service";

/**
 * Service for working with GitHub API.
 */
@Injectable({ providedIn: "root" })
export class GithubService {
  public zipTasks: Array<ZipSingleTaskInterface> =
    new Array<ZipSingleTaskInterface>();
  public refreshing: boolean = false;

  constructor(
    private http: HttpClient,
    private zipWorker: ZipService,
    private fileService: FilesService,
    private gitService: GitService,
    private repoService: RepositoryService
  ) {
    this.reauthorize();
  }

  public reauthorize() {
    const refreshToken = localStorage.getItem("github_refresh_token");

    if (refreshToken) {
      this.refreshToken();
    }
  }

  /**
   *
   * @returns true if user is authenticated, false otherwise
   */
  public isAuthenticated(): boolean {
    const accessToken = localStorage.getItem("github_access_token");

    return !!accessToken;
  }

  /**
   * Gets access token from GitHub OAuth.
   * @param code code from GitHub OAuth
   */
  public getAccessToken(code: string): void {
    this.http
      .post<AccessTokenResponse>(
        environment.baseUrl + `/auth/oauth/access_token`,
        {
          code: code,
          scope: "repo",
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .subscribe((data) => {
        if (data.error) {
          console.error(data.error);
          return;
        }

        localStorage.setItem("github_access_token", data.access_token);
        localStorage.setItem("github_refresh_token", data.refresh_token);
      });
  }

  /**
   * Refreshes access token from GitHub OAuth.
   */
  public refreshToken(): void {
    this.refreshing = true;
    const refreshToken = localStorage.getItem("github_refresh_token");

    this.http
      .post<AccessTokenResponse>(
        environment.baseUrl + `/auth/oauth/refresh_token`,
        {
          refresh_token: refreshToken,
          grant_type: "refresh_token",
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .subscribe((data) => {
        if (data.error) {
          console.error(data.error);

          localStorage.removeItem("github_access_token");
          localStorage.removeItem("github_refresh_token");
        }

        localStorage.setItem("github_access_token", data.access_token);
        localStorage.setItem("github_refresh_token", data.refresh_token);

        this.refreshing = false;
      });
  }

  /**
   * @returns list of repositories for authenticated user
   */
  public getRepositories() {
    return this.http.get<GithubRepository[]>(
      environment.githubUrl + `/user/repos`
    );
  }

  /**
   * Returns contents for given repository default branch.
   * @param repo repository to get contents for
   * @returns tree of contents for given repository
   */
  public getRepositoryContents(repo: GithubRepository) {
    return this.http.get(
      environment.githubUrl +
        `/repos/${repo.owner.login}/${repo.name}/zipball`
    );
  }

  /**
   * Returns branch for given repository and name.
   * @param repo repository to get branch for
   * @param branch name of branch to get
   * @returns branch for given repository and name
   */
  public getRepositoryBranch(repo: GithubRepository, branch: string) {
    return this.http.get<Branch>(
      environment.githubUrl +
        `/repos/${repo.owner.login}/${repo.name}/branches/${branch}`
    );
  }

  /**
   * Returns branches for given repository.
   * @param repo repository to get branches for
   * @returns branches for given repository
   */
  public getRepositoryBranches(repo: GithubRepository) {
    return this.http.get<Branch[]>(
      environment.githubUrl +
        `/repos/${repo.owner.login}/${repo.name}/branches`
    );
  }

  public async zipFiles(): Promise<any> {
    // Get all files as zip Tasks.
    await this.getAllDirs("/");
    // Zip files and upload them to server
    this.zipWorker.zipEntries(this.zipTasks);
    this.zipTasks = [];
  }

  /**
   * Getting all repositories from indexedDB.
   * @param dirName - Name of dir to read.
   */
  public async getAllDirs(dirName: string): Promise<any> {
    await this.fileService.readDir(dirName).then(async (file) => {
      for (const singleFile of file) {
        // @ts-ignore
        const stats: any = await this.fileService.getStat(
          dirName + "/" + singleFile
        );
        if (stats.type === "dir") {
          // @ts-ignore
          this.zipTasks.push({
            data: { fileName: dirName + "/" + singleFile, text: null },
          });
          await this.getAllDirs(dirName + "/" + singleFile);
        } else {
          // @ts-ignore
          this.zipTasks.push({
            data: {
              fileName: dirName + "/" + singleFile,
              // @ts-ignore
              text: await this.fileService.readFiles(
                dirName + "/" + singleFile
              ),
            },
          });
        }
      }
    });
  }

  public getCommits(owner: string, repo: string) {
    return this.http.get<RepoCommit[]>(
      environment.githubUrl + `/repos/${owner}/${repo}/commits`
    );
  }

  public getBranches(owner: string, repo: string) {
    return this.http.get<RepoBranch[]>(
      environment.githubUrl + `/repos/${owner}/${repo}/branches`
    );
  }

  public getPullRequests(owner: string, repo: string) {
    return this.http.get<RepoPull[]>(
      environment.githubUrl + `/repos/${owner}/${repo}/pulls`
    );
  }

  public async checkoutNewBranch(currentBranch: string, newBranch: string) {
    return this.gitService
      .gitRepoIdBranchPost({
        repoId: this.repoService.currentRepo.uuid.toString(),
        authorization: localStorage.getItem("token"),
        body: {
          base: currentBranch,
          new: newBranch,
          github_token: localStorage.getItem("github_access_token"),
        },
      })
      .toPromise();
  }
}
