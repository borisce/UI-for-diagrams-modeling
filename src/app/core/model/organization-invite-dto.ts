import { OrganizationDto } from "./organization-dto";
import { OrganizationInviteStatus } from "./organization-invite-status.enum";

export interface OrganizationInviteDto {
    email: String;
    status: OrganizationInviteStatus;
    organization: OrganizationDto;
}