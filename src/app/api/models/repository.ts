export interface Repository {
  pipe: any;
  uuid: string;
  created: any;
  createdBy: string;
  lastModified: any;
  lastModifiedBy: string;
  name: string;
  author: string;
  fileName: string;
  favorite: boolean;
  archived: boolean;
  description: string;
  uri: string;
  id: number;
  is_private: boolean;
  isPublic: boolean;
  authorUUID: string;
  organizationUUID: string;
}
