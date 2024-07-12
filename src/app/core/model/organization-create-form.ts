import { OrganizationInviteDto } from "./organization-invite-dto";

export interface OrganizationCreateForm {
  title: String;
  ownerId: Number;
  invites: OrganizationInviteDto[];
}
