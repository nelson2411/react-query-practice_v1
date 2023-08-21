import { Label } from "../interfaces/label"
import { gitHubApi } from "../../api/gitHubApi"
import { useQuery } from "@tanstack/react-query"
import { sleep } from "../../helpers/sleep"

const getLabels = async (): Promise<Label[]> => {
  await sleep(2)

  const { data } = await gitHubApi.get<Label[]>("/labels?per_page=100")
  return data
}

export const useLabels = () => {
  const labelsQuery = useQuery(["labels"], getLabels, {
    /* staleTime is a feature of react-query that allows us to set a time in milliseconds 
    for how long we want to keep the data in the cache before we want to refetch it
    */
    staleTime: 1000 * 60 * 60,
    //initialData: [],
    placeholderData: [
      {
        id: 717031390,
        node_id: "MDU6TGFiZWw3MTcwMzEzOTA=",
        url: "https://api.github.com/repos/facebook/react/labels/good%20first%20issue",
        name: "good first issue",
        color: "6ce26a",
        default: true,
      },
      {
        id: 725156255,
        node_id: "MDU6TGFiZWw3MjUxNTYyNTU=",
        url: "https://api.github.com/repos/facebook/react/labels/good%20first%20issue%20(taken)",
        name: "good first issue (taken)",
        color: "b60205",
        default: false,
      },
    ],
  })

  return {
    labelsQuery,
  }
}
