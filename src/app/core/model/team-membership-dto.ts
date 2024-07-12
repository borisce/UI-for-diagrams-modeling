import { UserDto } from "./user-dto";
import { UserTeamPermission } from "./user-team-permission.enum";

export interface TeamMembershipDto {
    user: UserDto;
    permission: UserTeamPermission;
}
