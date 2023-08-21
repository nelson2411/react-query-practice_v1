import { Link, Navigate, useParams } from "react-router-dom"
import { IssueComment } from "../components/IssueComment"
import { useIssue } from "../hooks"
import { Issue } from "../interfaces/issue"
import LoadingIcon from "../../shared/components/LoadingIcon"

export const IssueView = () => {
  const params = useParams()
  const { id = "0" } = params

  const { issueQuery, commentsQuery } = useIssue(+id)

  // loading icon
  if (issueQuery.isLoading) {
    return <LoadingIcon />
  } else if (!issueQuery.data) {
    return <Navigate to="./issues/list" />
  }

  return (
    <div className="row mb-5">
      <div className="col-12 mb-3">
        <Link to="./issues/list">Go Back</Link>
      </div>

      {/* Primer comentario */}
      <IssueComment issue={issueQuery.data} />
      {commentsQuery.isLoading && <LoadingIcon />}
      {commentsQuery.data?.map((issue: Issue) => (
        <IssueComment key={issue.id} issue={issue} />
      ))}

      {/* Comentario de otros */}
      {/*   <IssueComment body={comment2} />
      <IssueComment body={comment3} />
  */}
    </div>
  )
}
