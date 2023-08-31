import * as React from "react"
import { IssueList } from "../components/IssueList"
import { LabelPicker } from "../components/LabelPicker"
import { useIssues, useIssuesInfinite } from "../hooks"
import LoadingIcon from "../../shared/components/LoadingIcon"
import { State } from "../interfaces"

export const ListViewInfinite = () => {
  const [selectedLabels, setSelectedLabels] = React.useState<string[]>([])
  const [state, setState] = React.useState<State>()
  const { issuesQuery } = useIssuesInfinite({
    state,
    labels: selectedLabels,
  })

  const onLabelChanged = (labelName: string) => {
    /*
    If the label is already selected, remove it from the array of selected labels.
    */
    selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName])
  }

  return (
    <div className="row mt-5">
      <div className="col-8">
        {issuesQuery.data?.pages[0].length === 0 && ( // check if the first page is empty, otherwise we'll get a loading icon
          <div className="alert alert-warning" role="alert">
            ⚠️ No issues found based on your search criteria.
          </div>
        )}
        {issuesQuery.isLoading ? (
          <LoadingIcon />
        ) : (
          <IssueList
            issues={issuesQuery.data?.pages.flat() || []}
            state={state}
            onStateChange={(newState) => setState(newState)}
          />
        )}

        <button
          disabled={!issuesQuery.hasNextPage || issuesQuery.isFetchingNextPage}
          onClick={() => issuesQuery.fetchNextPage()}
          className="btn btn-outline-primary mt-2"
        >
          {issuesQuery.isFetchingNextPage ? (
            <span
              className="spinner-border spinner-border-sm text-warning"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            "Load more"
          )}
        </button>
      </div>

      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onChange={(labelName) => onLabelChanged(labelName)}
        />
      </div>
    </div>
  )
}

/*
Test commit

*/
