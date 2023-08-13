import axios from "axios"

const REACT_APP_GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN
export const gitHubApi = axios.create({
  baseURL: "https://api.github.com/repos/facebook/react",
  headers: {
    Authorization: `Bearer ${REACT_APP_GITHUB_TOKEN}`,
  },
})
