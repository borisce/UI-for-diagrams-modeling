export class ModalGitCredentialsDataModel {
  constructor(
    public gitCredentialsRequiredFunc:
      (gitUsername: string, gitPassword: string, message?: string) => Promise<any>) {
  }
}
