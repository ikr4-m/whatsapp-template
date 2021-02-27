import { WAConnection } from '@adiwajshing/baileys'
import State from '../../State'

export default function (client: WAConnection, state: State): void {
  client.on('chat-update', chat => {
    if (!chat.messages && !chat.count) return

    const message = chat.messages.first
    // Check if class message is available
    if (message.key.fromMe) return
    if (!message.message) return
    if (!message.message.conversation && !message.message.imageMessage && !message.message.extendedTextMessage) return
    //console.log(message)

    // Because some command came from any type of text in Whatsapp.
    // Get a plain text from chat
    let plainTxt = ''
    if (message.message.conversation) plainTxt = message.message.conversation
    if (message.message.imageMessage) plainTxt = message.message.imageMessage.caption
    if (message.message.extendedTextMessage) plainTxt = message.message.extendedTextMessage.text
    //console.log(`Plain Text: ${plainTxt}`)

    const splitted = plainTxt.split(' ')
    // Check if this is a real command
    if (!plainTxt.startsWith(state.prefix)) return

    // Get command
    const _cmd = splitted[0].slice(state.prefix.length)
    const command = state.alias.has(_cmd)
      ? state.command.get(state.alias.get(_cmd))
      : state.command.get(_cmd)

    if (typeof command !== 'undefined') {
      // Modify conversation
      message.message.conversation = splitted.slice(1).join(' ')

      try {
        command.run(client, message, state)
      } catch (err) {
        console.log(err)
      } finally {
        console.log(`[BOT::COMMAND] ${message.key.remoteJid} executing ${_cmd} command.`)
      }
    }
  })
}

