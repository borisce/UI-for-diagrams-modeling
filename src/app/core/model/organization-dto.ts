import { OrganizationInviteDto } from "./organization-invite-dto";
import { TeamDto } from "./team-dto";
import { UserDto } from "./user-dto";

export interface OrganizationDto {
    title: String;
    owner: UserDto;
    invites: OrganizationInviteDto[];
    teams: TeamDto[];
}
