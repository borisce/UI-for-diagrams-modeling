export interface IPresence {
  displayName: string;
  userName: string;
  position?: monaco.IPosition;
  selection?: monaco.ISelection;
  request?: boolean;
  rename?: string;
}
