import { Injectable } from "@angular/core";
import {
  CanActivate,
} from "@angular/router";
import { GithubService } from "../service/github.service";
import { HttpParams } from "@angular/common/http";

/**
 * Github guard is used for checking if there is a code in the query params and then getting the access token.
 */
@Injectable({ providedIn: "root" })
export class GithubGuard implements CanActivate {
  constructor(private githubService: GithubService) {}

  public canActivate(): boolean {
    const getParamValueQueryString = (paramName) => {
      const url = window.location.href;
      let paramValue;
      if (url.includes("?")) {
        const httpParams = new HttpParams({ fromString: url.split("?")[1] });
        paramValue = httpParams.get(paramName);
      }
      return paramValue;
    };

    const githubCode = getParamValueQueryString("code");

    if (githubCode) {
      this.githubService.getAccessToken(githubCode);
    }

    return true;
  }
}
