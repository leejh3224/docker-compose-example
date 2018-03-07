import axios from 'axios'

// code copied from https://coligo.io/nodejs-api-redis-cache/
export const getUserRepositories = user => {
  const endpoint = `https://api.github.com/users/${user}/repos?per_page=100`
  return axios.get(endpoint)
}

export const computeTotalStars = repositories => {
  return repositories.data.reduce((zero, current) => {
    return zero + current.stargazers_count
  }, 0)
}
