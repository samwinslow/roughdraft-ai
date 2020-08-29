import { HostedModel } from '@runwayml/hosted-models'
import axios from 'axios'
import * as secrets from './secrets.json'

const model = new HostedModel({
  url: secrets.RUNWAY_URL,
  token: secrets.RUNWAY_TOKEN
})
const server = axios.create()
server.defaults.baseURL = "https://w8ylvqkryk.execute-api.us-east-1.amazonaws.com/dev/"
server.defaults.timeout = 0

class Api {
  queryModel = async (prompt, max_characters) => {
    return model.query({
      prompt,
      max_characters
    })
  }
}

export default Api