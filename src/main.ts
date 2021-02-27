import { WAConnection } from '@adiwajshing/baileys'
import * as FS from 'fs'

const client = new WAConnection()

async function connectToWhatsApp () {
  // Handling event pre-connect
  FS.readdirSync('./build/src/Events/PreConnect').forEach(async (evt) => {
    // Skip if .map
    if (evt.split('.').pop() === 'map')
      return

    // Import function
    const evtFnc = await import(`./Events/PreConnect/${evt}`)
    evtFnc.default(client)
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
    evtFnc.default(client)
  })
}

connectToWhatsApp()
  .catch(err => {
    throw new Error(err)
  })

