// Generated by https://quicktype.io

export interface Label {
  id: number
  node_id: string
  url: string
  name: string
  color: string
  default: boolean
  description?: string
}

export enum Description {
  Empty = "",
  PullRequestsThatUpdateDependencyFiles = "Pull requests that update dependency files",
}