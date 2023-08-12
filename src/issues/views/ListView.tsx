import * as React from "react"
import { IssueList } from "../components/IssueList"
import { LabelPicker } from "../components/LabelPicker"

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = React.useState<string[]>([])

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
        <IssueList />
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
