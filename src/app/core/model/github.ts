export interface AccessTokenResponse {
  error?: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
}

export interface GithubRepository {
  id: number,
  node_id: string,
  name: string,
  full_name: string,
  private: boolean,
  owner: Owner,
  html_url: string,
  description: string,
  fork: boolean,
  url: string,
  created_at: string
  default_branch: string,
}

export interface Owner {
  login: string,
  id: number,
  node_id: string,
  avatar_url: string,
  url: string,
  received_events_url: string,
  type: string,
}

export interface Branch {
  name: string,
  commit: Commit
  protected: boolean
}

export interface Commit {
  sha: string,
  url: string
}

export interface RepoCommit {
  url: string,
  sha: string,
  node_id: string,
  html_url: string,
  comments_url: string,
  commit: {
    url: string,
    author: {
      name: string,
      email: string,
      date: string
    },
  },
  message: string,
  tree: {
    url: string,
    sha: string
  },
  comment_count: number,
}

export interface RepoBranch {
  name: string,
  commit: {
    sha: string,
    url: string
  },
  protected: boolean
}

export interface RepoPull {
  url: string,
  id: number,
  node_id: string,
  html_url: string,
  diff_url: string,
  patch_url: string,
  issue_url: string,
  commits_url: number,
  review_comments_url: string,
  comments_url: string,
  state: string,
  locked: boolean,
  title: string,
  user: {
    login: string,
    id: number,
    node_id: string,
    avatar_url: string,
    url: string,
    html_url: string,
    type: string
  },
}

export enum FileState {
  UNMODIFIED = 'unmodified',
  MODIFIED = 'modified',
  ADDED = 'added',
  DELETED = 'deleted'
}