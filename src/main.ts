import { WAConnection } from '@adiwajshing/baileys'
import * as FS from 'fs'

const client = new WAConnection()

async function connectToWhatsApp () {
  // Load credentials if available
  if (FS.existsSync('./authentication.json')) {
    client.loadAuthInfo('./authentication.json')
  }

  // Save credentials if updated
  client.on('credentials-updated', () => {
    console.log("Credentials updated!")
    const authinfo = client.base64EncodedAuthInfo()
    FS.writeFileSync('./authentication.json', JSON.stringify(authinfo, null, '\t'))
  })

  // Awaiting connect flag
  await client.connect()

  // Handling chat
  client.on('chat-update', (chat) => {
    if (!chat.messages && !chat.count) return
    
    console.log('events::chat_update')
    const message = chat.messages.all()
    console.log(message)
  })
}

connectToWhatsApp()
  .catch(err => {
    throw new Error(err)
  })

