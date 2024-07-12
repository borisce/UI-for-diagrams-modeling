/* Export model which stores the decision of invitation to an organization, 
 * after an invited user makes an actions to the invitation. 
 * decision - user accepted (true) or rejected (false) the invitation
 */
export interface InvitationDecision {
  organizationId: number,
  invitationId: number,
  decision: boolean,
}