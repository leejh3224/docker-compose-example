import express from 'express'
import responseTime from 'response-time'
import { getUserRepositories, computeTotalStars } from './utils'
import db from './db'
import redis from './redis'

const port = process.env.PORT || 3030
const app = express()

db.connect()

app.get('/', (req, res) => {
  res.send(process.env.MESSAGE)
})

// code copied from https://coligo.io/nodejs-api-redis-cache/
app.get('/api/:username', (req, res, next) => {
  const { username } = req.params

  redis.get(username, (err, result) => {
    if (result) {
      res.send({ totalStars: result, source: 'redis cache' })
    } else {
      getUserRepositories(username)
        .then(computeTotalStars)
        .then(totalStars => {
          redis.setex(username, 60, totalStars)

          res.send({ totalStars, source: 'github api' })
        })
        .catch(next)
    }
  })
})

app.use(responseTime())

app.use((err, req, res) => {
  res.status(500).send('something went wrong!')
})

app.listen(port, () => console.log(`connected to port: ${port}`))
