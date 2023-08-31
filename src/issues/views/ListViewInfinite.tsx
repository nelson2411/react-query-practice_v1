import * as React from "react"
import { IssueList } from "../components/IssueList"
import { LabelPicker } from "../components/LabelPicker"
import { useIssues } from "../hooks"
import LoadingIcon from "../../shared/components/LoadingIcon"
import { State } from "../interfaces"

export const ListViewInfinite = () => {
  const [selectedLabels, setSelectedLabels] = React.useState<string[]>([])
  const [state, setState] = React.useState<State>()
  const { issuesQuery, page, nextPage, prevPage } = useIssues({
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
        {issuesQuery.data?.length === 0 && (
          <div className="alert alert-warning" role="alert">
            ⚠️ No issues found based on your search criteria.
          </div>
        )}
        {issuesQuery.isLoading ? (
          <LoadingIcon />
        ) : (
          <IssueList
            issues={issuesQuery.data || []}
            state={state}
            onStateChange={(newState) => setState(newState)}
          />
        )}

        <button className="btn btn-outline-primary mt-2">Load more...</button>
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
