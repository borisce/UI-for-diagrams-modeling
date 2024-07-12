import { Component, OnInit, ViewChild } from '@angular/core';
import { ForumService } from '../../core/service/forum.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/service';
import { Repository } from 'src/app/api/models/repository';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UUID } from 'antlr4ts/misc/UUID';

@Component({
  selector: 'app-my-repos',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
})

export class ForumComponent implements OnInit {
  @ViewChild("paginator") paginator: MatPaginator;

  public repositories: Repository[];
  public threads: [];
  public loadingState: boolean = true;
  public pageLength: number = 0;
  public pageSize: number = 12;
  public pageIndex: number = 0;
  private allRepositories: Repository[] = [];
  public breakpoint: number;
  public allR: Repository[] = [];
  public favRepositorie: Repository[] = [];
  public selectedTabIndex: number = 0;

  constructor(
    private forumService: ForumService,
    public authenticationService: AuthenticationService,
    private router: Router,
  ) {
    this.repositories = [];
  }

  public ngOnInit(): void {
    this.showForum(this.pageIndex);
  }

  public getForumContent(page: number, pageSize: number): any {
    return this.forumService.getForumContent(
      page,
      pageSize,
    );
  }

  public redirect(pagename: string): any {
    this.router.navigate(['/' + pagename]);
  }

  public async showForum(page: number) {
    this.loadingState = true;
    const forumPage: any = await this.getForumContent(
      0,
      1000
    ).toPromise();
    this.threads = forumPage.content;
    this.loadingState = false;
  }

  public onThreadOpen(uuid: UUID) {
    console.log('forum : ' + uuid);
    this.forumService.currentThreadUUID = uuid;
    this.redirect('forum/thread/' + uuid);
  }
}
