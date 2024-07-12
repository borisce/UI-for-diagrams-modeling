import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from 'rxjs';
import {InvitationDecision} from "src/app/api/models/invitation-decision";
import {environment} from "src/environments/environment";
import {Organization, TeamMemberRole} from "../model/organization.model";
import {Page} from "../model/page";
import {UserBalanceChange} from "../model/user-balance-change";

@Injectable({
  providedIn: "root",
})
export class OrganizationService {
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Get organization information
   */
  public getOrganization(): Observable<Organization> {
    return this.httpClient.get<Organization>(environment.baseUrl + '/organization');
  }

  /**
   * Get all organizations from DB
   */
  public getAllOrganizations(): any {
    return this.httpClient.get(environment.baseUrl + '/organization/all');
  }

  /**
   * Create a new organization
   */
  public createOrganization(name: string) {
    return this.httpClient.post(environment.baseUrl + '/organization', {
      'name': name
    });
  }

  /**
   * Update organization owner
   */
  public updateOrganization(owner: string) {
    return this.httpClient.put(environment.baseUrl + '/organization', {
      'owner': owner
    });
  }

  /**
   * Delete current organization
   */
  public deleteOrganization() {
    return this.httpClient.delete(environment.baseUrl + '/organization');
  }

  /**
   * Leave current organization
   */
  public leaveOrganization() {
    return this.httpClient.delete(environment.baseUrl + '/organization/leave');
  }

  /**
   * Delete specific organization
   */
  public deleteSpecificOrganization(uuid: any) {
    return this.httpClient.delete(environment.baseUrl + `/organization/${uuid}`);
  }

  /**
   * Get organization settings
   */
  public getOrganizationSettings() {
    return this.httpClient.get(environment.baseUrl + '/organization/settings');
  }

  /**
   * Change organization settings
   */
  public updateOrganizationSettings(schema: OrgSettingsUpdateRequestSchema) {
    return this.httpClient.put(environment.baseUrl + '/organization/settings', {schema});
  }

  /**
   * Get all organization repositories
   */
  public getOrganizationRepos(pageIndex: number, pageSize: number): any {
    const params = new HttpParams()
      .set('page', pageIndex.toString())
      .set('size', pageSize.toString());

    return this.httpClient.get(environment.baseUrl + '/repos/org', {params: params});
  }

  /**
   * Get ther owner of organization
   */
  public getOwnerOrg(ownerUsername: string) {
    return this.httpClient.get(environment.baseUrl + `/organization/admin/owner/${ownerUsername}`);
  }

  public getBalanceChanges(pageIndex: number, pageSize: number)
    : Observable<Page<UserBalanceChange>> {
    const url_params: string = `?page=${pageIndex || 0}&size=${pageSize || 10}`;
    return this.httpClient.get<Page<UserBalanceChange>>
    (environment.baseUrl + `/organization/balance-changes` + url_params);
  }
}

@Injectable({
  providedIn: "root",
})
export class OrganizationMemberManagementService {
  private readonly organizationMemberURL = "/organization/members";

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Get organization members
   * @param pageIndex - Pagination page
   * @param pageSize - Pagination batch size
   * @returns An OrganizationMembersResponse with organization members
   */
  public getOrganizationMembers(
    pageIndex: number,
    pageSize: number
  ): any {
    const params = new HttpParams()
      .set("page", pageIndex.toString())
      .set("size", pageSize.toString());

    return this.httpClient.get(
      environment.baseUrl + this.organizationMemberURL,
      {params: params}
    );
  }

  /**
   * Get organization members by Admin
   * @returns An OrganizationMembersResponse with organization members
   */
  // public getOrganizationMembersAdmin(uuid: any): any {
  //   return this.httpClient.get(
  //     environment.baseUrl + this.organizationMemberURL + `/${uuid}/admin`
  //   );
  // }

  /**
   * Invite organization member
   * @param inviteEmail - Organization member email
   */
  public inviteOrganizationMember(inviteEmail: string) {
    return this.httpClient.post(
      environment.baseUrl + this.organizationMemberURL,
      {
        email: inviteEmail,
      }
    );
  }


  public updateUserPackage(userUuid: string, packageType: number[]) {
    return this.httpClient.post(
      environment.baseUrl + '/organization/packages/update',
      {
        user_uuid: userUuid,
        type_packages_ids: packageType
      }
    );
  }

  /**
   * Get specific users org invitations
   */
  public getUserSpecificInvitations() {
    return this.httpClient.get(environment.baseUrl + "/organization_invite/get_users_invitations");
  }

  /**
   * Get all organization invitations
   */
  public getOutgoingInvitations() {
    return this.httpClient.get(environment.baseUrl + "/organization_invite/get_invited_users");
  }

  /**
   * Decide invitation
   */
  public decideInvitation(decStatus: InvitationDecision) {
    return this.httpClient.put(environment.baseUrl + this.organizationMemberURL + "/invitation/decision", decStatus);
  }

  /**
   * Delete invitation.
   * @param uuid
   */
  public deleteInvitation(uuid: any) {
    return this.httpClient.delete(
      environment.baseUrl + `/organization_invite/${uuid}`
    );
  }

  /**
   * Update organization member role
   * @param userUuid - User identifier string
   * @param role - User role
   */
  public updateOrganizationMemberRole(userUuid: string, role: TeamMemberRole) {
    return this.httpClient.put(
      environment.baseUrl + this.organizationMemberURL + `/${userUuid}`,
      {role: role}
    );
  }

  /**
   * Remove organization member
   * @param userUuid - User identifier string
   */
  public deleteOrganizationMember(userUuid: string) {
    return this.httpClient.delete(
      environment.baseUrl + this.organizationMemberURL + `/${userUuid}`
    );
  }
}

@Injectable({
  providedIn: "root",
})
export class OrganizationTeamManagementService {
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Get all teams in organization
   * @param pageIndex - Pagination page
   * @param pageSize - Pagination batch size
   */
  public getOrganizationTeams(
    pageIndex: number,
    pageSize: number
  ): any {
    const params = new HttpParams()
      .set("page", pageIndex.toString())
      .set("size", pageSize.toString());

    return this.httpClient.get(
      environment.baseUrl + "/organization/teams",
      {params: params}
    );
  }

  /**
   * Create a new team
   * @param teamName - Name of a newly created team
   */
  public createOrganizationTeam(teamName: string) {
    return this.httpClient.post(environment.baseUrl + "/organization/teams", {
      name: teamName,
    });
  }

  /**
   * Update team name
   * @param teamUuid
   * @param newTeamName
   */
  public updateOrganizationTeam(teamUuid: string, newTeamName: string) {
    return this.httpClient.put(environment.baseUrl + `/organization/teams/${teamUuid}`, {
      name: newTeamName,
    });
  }

  /**
   * Get team details
   * @param teamUuid
   */
  public getOrganizationTeamDetails(
    teamUuid: string
  ): any {
    return this.httpClient.get(
      environment.baseUrl + `/organization/teams/${teamUuid}`
    );
  }

  /**
   * Remove a team
   * @param teamUuid - Team identifier string
   */
  public deleteOrganizationTeam(teamUuid: string) {
    return this.httpClient.delete(
      environment.baseUrl + `/organization/teams/${teamUuid}`
    );
  }

  /**
   * Get all team members
   * @param teamUuid - Team identifier string
   * @param pageIndex - Pagination page
   * @param pageSize - Pagination batch size
   */
  public getOrganizationTeamMembers(
    teamUuid: string,
    pageIndex: number,
    pageSize: number
  ): any {
    const params = new HttpParams()
      .set("page", pageIndex.toString())
      .set("size", pageSize.toString());

    return this.httpClient.get(
      environment.baseUrl + `/organization/teams/${teamUuid}/members`, {params: params}
    );
  }

  /**
   * Add new team member
   * @param teamUuid - Team identifier string
   * @param userUuid - User identifier string
   * @param role - New member role
   */
  public addOrganizationTeamMember(
    teamUuid: string,
    userUuid: string,
    role: TeamMemberRole
  ) {
    return this.httpClient.post(
      environment.baseUrl + `/organization/teams/${teamUuid}/members`,
      {
        uuid: userUuid,
        role: role,
      }
    );
  }

  /**
   * Update team member role
   * @param team_uuid - Team identifier string
   * @param member_uuid - User identifier string
   * @param role - Team member role
   * @returns
   */
  public updateOrganizationTeamMember(team_uuid: string, member_uuid: string, role: TeamMemberRole) {
    return this.httpClient.put(environment.baseUrl + `/organization/teams/${team_uuid}/members/${member_uuid}`, {
      role: role
    })
  }

  /**
   * Remove a team member
   * @param teamUuid - Team identifier string
   * @param memberUuid - User identifier string
   */
  public deleteOrganizationTeamMember(teamUuid: string, memberUuid: string) {
    return this.httpClient.delete(
      environment.baseUrl +
      `/organization/teams/${teamUuid}/members/${memberUuid}`
    );
  }

  /**
   * Get the owner of a team
   */
  public getOwnerTeam(ownerUsername: string) {
    return this.httpClient.get(environment.baseUrl + `/organization/teams/admin/owner/${ownerUsername}`);
  }

}

export interface OrgSettingsUpdateRequestSchema {
  name_policy: string;
  reader_by_default: boolean;
  authorization: {
    type: AuthorizationType;
    username: string;
    password: string;
    sshKey: string;
  }
}

export enum AuthorizationType {
  NONE = 'none',
  PLAINTEXT = 'plaintext',
  SSH = 'ssh',
  ORGANIZATION = 'organization'
}

export interface RepoGetAllSuccessSchema {
  pageNum: number;
  totalPages: number;
  totalItems: number;
  data: UserRepoSchemaLite[];
}

export interface UserRepoSchemaLite {
  created: string;
  last_modified: string;
  uuid: string;
  name: string;
  uri: string;
  archived: boolean;
  favorite: boolean;
}
