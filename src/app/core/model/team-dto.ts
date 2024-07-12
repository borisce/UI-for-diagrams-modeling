import { RepositoryEditationComponent } from "src/app/modules/home/user-edit/repository-editation/repository-editation.component";
import { OrganizationDto } from "./organization-dto";
import { RepoDto } from "./repo-dto";
import { TeamMembershipDto } from "./team-membership-dto";

export interface TeamDto {
    name: String;
    memberships: TeamMembershipDto[];
    organization: OrganizationDto;
    repo: RepoDto;
}
