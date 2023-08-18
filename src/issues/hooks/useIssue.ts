import React from "react"
import { useQuery } from "@tanstack/react-query"
import { Issue } from "../interfaces/issue"
import { gitHubApi } from "../../api/gitHubApi"

const getIssueInfo = async (issueNumber: number): Promise<Issue> => {
  const { data } = await gitHubApi.get<Issue>(`/issues/${issueNumber}`)
  return data
}

const getIssueComments = async (issueNumber: number) => {
  const { data } = await gitHubApi.get(`/issues/${issueNumber}/comments`)
  return data
}

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery(["issue", issueNumber], () =>
    getIssueInfo(issueNumber)
  )

  const commentsQuery = useQuery(
    ["issue", issueNumber, "comments"],
    () => getIssueComments(issueQuery.data!.number),
    {
      enabled: issueQuery.data !== undefined,
    }
  )

  return { issueQuery, commentsQuery }
}
