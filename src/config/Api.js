import { HostedModel } from '@runwayml/hosted-models'
import axios from 'axios'
import * as secrets from './secrets.json'

const model = new HostedModel({
  url: secrets.RUNWAY_URL,
  token: secrets.RUNWAY_TOKEN
})
const server = axios.create()
server.defaults.baseURL = secrets.LAMBDA_SERVER_URL
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