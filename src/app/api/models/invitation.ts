/* Export model which stores invitation to an organization.
 * email - Invited users email
 * status - Status of the invitation
 * created - Creation date of the invitation
 * created_by - Username of the invitee
 * organization_name - Name of the organization 
*/
export interface Invitation {
  email: string,
  status: string,
  organization_id: bigint,
  invitation_id: bigint,
  created: any,
  created_by: string,
  organization_name: string,
  uuid: any;
}