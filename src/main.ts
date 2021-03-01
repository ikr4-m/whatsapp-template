import { WAConnection } from '@adiwajshing/baileys'
import State from './State'
import ResolvingCommand from './Utils/ResolvingCommand'
import * as FS from 'fs'
import 'dotenv/config'

const client = new WAConnection()
const state = new State()

// Import all the command before client committing connect
ResolvingCommand(state)

async function connectToWhatsApp () {
  // Handling event pre-connect
  FS.readdirSync('./build/src/Events/PreConnect').forEach(async (evt) => {
    // Skip if .map
    if (evt.split('.').pop() === 'map') return

    // Import function
    const evtFnc = await import(`./Events/PreConnect/${evt}`)
    evtFnc.default(client, state)
  })  

  // Awaiting connect flag
  await client.connect()
  console.log(`[BOT] Connected to ${client.user.jid}!`)

  // Handling event post-connect
  FS.readdirSync('./build/src/Events/PostConnect').forEach(async (evt) => {
    // Skip if .map
    if (evt.split('.').pop() === 'map') return

    // Import function
    const evtFnc = await import(`./Events/PostConnect/${evt}`)
    evtFnc.default(client, state)
  })
}

connectToWhatsApp()
  .catch(err => {
    console.log(err)
  })

