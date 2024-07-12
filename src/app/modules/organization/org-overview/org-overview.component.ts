import { Component, OnInit } from "@angular/core";
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from "@angular/animations";
import { OrganizationService } from "src/app/core/service/organization.service";
import { RepositoryEditationComponent } from "../../home/user-edit/repository-editation/repository-editation.component";

const listAnimation: any = trigger("listAnimation", [
  transition("* <=> *", [
    query(
      ":enter",
      [
        style({ opacity: 0 }),
        stagger("80ms", animate("600ms ease-out", style({ opacity: 1 }))),
      ],
      { optional: true }
    ),
    query(":leave", animate("200ms", style({ opacity: 0 })), {
      optional: true,
    }),
  ]),
]);

@Component({
  selector: "app-org-overview",
  templateUrl: "./org-overview.component.html",
  styleUrls: ["./org-overview.component.scss"],
  animations: [listAnimation],
})
export class OrgOverviewComponent implements OnInit {
  organizationName: String = null;
  teamMembers: number = 0;
  availableRepositories: number = 0;
  repositories: any[] = [];

  constructor(private orgService: OrganizationService) { }

  ngOnInit(): void {
    this.getRepositories();
  }

  async getRepositories() {
    const pageIndex = 0;
    const pageSize = 6;
    const reposPromise = await this.orgService.getOrganizationRepos(pageIndex, pageSize).toPromise();
    const repos = reposPromise.data;
    repos.forEach(element => {
      this.repositories.push({
        name: element.name,
        uri: element.uri,
        id: element.uuid,
        favorite: element.favorite,
        fileName: null,
        description: null,
        author: null
      })
    });

    this.availableRepositories = this.repositories.length;
  }
}
