import { HostedModel } from '@runwayml/hosted-models'
import axios from 'axios'
import RUNWAY_KEYS from './secrets.json'

console.log(RUNWAY_KEYS)
const model = new HostedModel({
  url: RUNWAY_KEYS.url,
  token: RUNWAY_KEYS.token
})
const server = axios.create()
server.defaults.baseURL = "https://w8ylvqkryk.execute-api.us-east-1.amazonaws.com/dev/"
server.defaults.timeout = 0

class Api {
  constructor() {
    console.log(RUNWAY_KEYS)
  }
  queryModel = async (prompt, max_characters) => {
    return model.query({
      prompt,
      max_characters
    })
  }
}

export default Api