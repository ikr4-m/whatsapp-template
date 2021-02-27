import { WAConnection } from '@adiwajshing/baileys'
import State from '../../State'

export default function (client: WAConnection, state: State): void {
  client.on('chat-update', chat => {
    if (!chat.messages && !chat.count) return

    const message = chat.messages.first
    // Check if class message is available
    if (!message.message) return
    if (!message.message.conversation) return

    const plainTxt = message.message.conversation
    // Check if this is a real command
    if (!plainTxt.startsWith(state.prefix)) return

    // Get command
    const _cmd = plainTxt.slice(state.prefix.length)
    const command = state.alias.has(_cmd)
      ? state.command.get(state.alias.get(_cmd))
      : state.command.get(_cmd)
    
    try {
      command.run(client, message, state)
    } catch (err) {
      console.log(err)
    } finally {
      console.log(`[BOT::COMMAND] ${message.key.remoteJid} executing ${_cmd} command.`)
    }
  })
}

