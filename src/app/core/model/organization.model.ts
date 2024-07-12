/**
 * @param uuid - Universally unique identifier of organization
 * @param name - Organization name
 * @param owner - Universally unique identifier of organization owner
 */
export interface Organization {
  uuid: string;
  name: string;
  balance?: number;
  owner: string;
}

export interface OrganizationMembersResponse {
  pageNum: number;
  totalPages: number;
  totalItems: number;
  data: TeamMember[];
}

export interface TeamMember {
  uuid: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: TeamMemberRole;
}

export enum TeamMemberRole {
  ADMIN = "ADMIN",
  MEMBER = "READ",
  VIEWER = "viewer",
  CONTRIBUTOR = "contributor"
}

export interface OrganizationTeam {
  uuid: string;
  name: string;
  owner: string;
  member: boolean;
}

export interface OrganizationTeamResponse {
  pageNum: number;
  totalPages: number;
  totalItems: number;
  data: OrganizationTeam[];
}
