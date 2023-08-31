import React from "react"
import { Issue, State } from "../interfaces"
import { gitHubApi } from "../../api/gitHubApi"
import { useQuery } from "@tanstack/react-query"
import { sleep } from "../../helpers/sleep"

interface Props {
  state?: State
  labels: string[]
  page?: number
}

const getIssues = async ({
  state,
  labels,
  page = 1,
}: Props): Promise<Issue[]> => {
  await sleep(2)

  const params = new URLSearchParams()

  if (state) params.append("state", state)
  if (labels.length > 0) {
    const labelsString = labels.join(",")
    params.append("labels", labelsString)
  }

  params.append("page", page.toString())
  params.append("per_page", "5")

  const { data } = await gitHubApi.get<Issue[]>("/issues", { params })
  return data
}

export const useIssues = ({ state, labels }: Props) => {
  const [page, setPage] = React.useState(1)

  React.useEffect(() => {
    if (issuesQuery.data?.length === 0) {
      // display a message: "No issues found, based on your search criteria"
      setPage(1)
    }
  }, [state, labels])

  const issuesQuery = useQuery(["issues", { state, labels, page }], () =>
    getIssues({ labels, state, page })
  )

  const nextPage = () => {
    if (issuesQuery.data?.length === 0) return

    setPage((prev) => prev + 1)
  }

  const prevPage = () => {
    if (page > 1) setPage((prev) => prev - 1)
  }

  return {
    // Properties
    issuesQuery,
    // getter
    page: issuesQuery.isFetching ? "loading..." : page,

    // methods
    nextPage,
    prevPage,
  }
}
