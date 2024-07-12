/* tslint:disable */
export interface NewBranch {

  /**
   * Branch on which the new one should be based
   */
  base?: string;

  /**
   * New branch name
   */
  new: string;

  /**
   * Github token
   */
  github_token: string;
}
