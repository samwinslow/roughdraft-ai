import { HostedModel } from '@runwayml/hosted-models'
import axios from 'axios'
import * as secrets from './secrets.json'
import { Auth, Storage } from 'aws-amplify'

const model = new HostedModel({
  url: secrets.RUNWAY_URL,
  token: secrets.RUNWAY_TOKEN
})
const server = axios.create()
server.defaults.baseURL = secrets.LAMBDA_SERVER_URL
server.defaults.timeout = 0

class Api {
  queryModel = async (prompt, max_characters, seed) => {
    // Queries the Runway model and returns full generated text.
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
  getDocumentList = async () => {
    // Returns list of document keys and metadata from the API.
  }
  getDocument = async (key) => {
    // Gets document content for specified key.
  }
  createDocument = async (key, content) => {
    // Creates document for specified key with content.
  }
  updateDocument = async (key, content) => {
    // Set content of document with specified key.
  }
  deleteDocument = async (key) => {
    // Delete document with specified key.
  }
}

export default Api