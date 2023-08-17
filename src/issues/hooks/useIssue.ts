import React from "react"
import { useQuery } from "@tanstack/react-query"
import { Issue } from "../interfaces/issue"
import { gitHubApi } from "../../api/gitHubApi"

const getIssueInfo = async (issueNumber: number): Promise<Issue> => {
  const { data } = await gitHubApi.get<Issue>(`/issues/${issueNumber}`)
  return data
}

export const useIssue = (issueNumber: number) => {
  const Issueuery = useQuery(["issue", issueNumber], () =>
    getIssueInfo(issueNumber)
  )
}
