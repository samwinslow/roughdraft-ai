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
  queryModel = async (prompt, max_characters, seed) => {
    let result = await model.query({
      prompt,
      max_characters,
      seed
    })
    result = {
      ...result,
      generated_text: result.generated_text.substring(0, result.generated_text.lastIndexOf(' ')) + ' '
    }
    return result
  }
}

export default Api