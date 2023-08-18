import React from "react"
import axios from "axios"
import { Issue, State } from "../interfaces"
import { FiInfo, FiMessageSquare, FiCheckCircle } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { getIssueInfo, getIssueComments } from "../hooks/useIssue"

interface Props {
  issue: Issue
}

export const IssueItem: React.FC<Props> = ({ issue }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const onMouseEnter = () => {
    queryClient.prefetchQuery(["issue", issue.number], () =>
      getIssueInfo(issue.number)
    )

    // comments
    queryClient.prefetchQuery(["comments", issue.number], () =>
      getIssueComments(issue.number)
    )
  }

  return (
    <div
      className="card mb-2 issue"
      onClick={() => navigate(`/issues/issue/${issue.number}`)}
      onMouseEnter={onMouseEnter}
    >
      <div className="card-body d-flex align-items-center">
        {issue.state === State.Open ? (
          <FiInfo size={30} color="red" />
        ) : (
          <FiCheckCircle size={30} color="green" />
        )}

        <div className="d-flex flex-column flex-fill px-2">
          <span>{issue.title}</span>
          <span className="issue-subinfo">
            #{issue.number} opened {issue.created_at} by{" "}
            <span className="fw-bold">{issue.user.login}</span>
          </span>
        </div>

        <div className="d-flex align-items-center">
          <img
            src={issue.user.avatar_url}
            alt="User Avatar"
            className="avatar"
          />
          <span className="px-2">{issue.comments}</span>
          <FiMessageSquare />
        </div>
      </div>
    </div>
  )
}
