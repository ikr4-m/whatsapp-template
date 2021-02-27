import { WAConnection } from '@adiwajshing/baileys'
import State from './State'
import * as FS from 'fs'

const client = new WAConnection()
const state = new State()

async function connectToWhatsApp () {
  // Handling event pre-connect
  FS.readdirSync('./build/src/Events/PreConnect').forEach(async (evt) => {
    // Skip if .map
    if (evt.split('.').pop() === 'map')
      return

    // Import function
    const evtFnc = await import(`./Events/PreConnect/${evt}`)
    evtFnc.default(client, state)
  })  

  // Awaiting connect flag
  await client.connect()

  // Handling event post-connect
  FS.readdirSync('./build/src/Events/PostConnect').forEach(async (evt) => {
    // Skip if .map
    if (evt.split('.').pop() === 'map')
      return

    // Import function
    const evtFnc = await import(`./Events/PostConnect/${evt}`)
    evtFnc.default(client, state)
  })
}

connectToWhatsApp()
  .catch(err => {
    throw new Error(err)
  })

