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
  __printAuth = async () => {
    const accessToken = (await Auth.currentSession()).getIdToken().jwtToken
    console.log(accessToken)
  }
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
  getDocuments = async () => {
    // Returns list of document keys and metadata from the API.
    const accessToken = (await Auth.currentSession()).getIdToken().jwtToken
    const { data } = await server.get('/docs', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    return data
  }
  getDocument = async (noteId) => {
    // Gets document content for specified key.
    const accessToken = (await Auth.currentSession()).getIdToken().jwtToken
    const { data } = await server.get('/doc/' + noteId, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    return data
  }
  createDocument = async (title, content) => {
    // Creates document for specified key with content.
    const accessToken = (await Auth.currentSession()).getIdToken().jwtToken
    const { data } = await server.post('/doc', {
      title,  
      content
      }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    return data
  }
  updateDocument = async (noteId, title, content) => {
    // Set content of document with specified key.
    const accessToken = (await Auth.currentSession()).getIdToken().jwtToken
    const { data } = await server.put('/doc/' + noteId, {
        title,
        content
      }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    return data
  }
  deleteDocument = async (noteId) => {
    // Delete document with specified key.
    const accessToken = (await Auth.currentSession()).getIdToken().jwtToken
    const { data } = await server.delete('/doc/' + noteId, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    return data
  }
}

export default Api