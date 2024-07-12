export interface VisPresence {
  displayName: string;
  userName: string;
  request?: boolean;
  click?: {
    position: {
      x: number,
      y: number
    }
  };
  lockedElementId?: string;
  unlockedElementId?: any;
}
