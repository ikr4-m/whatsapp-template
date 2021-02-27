import { WAConnection } from '@adiwajshing/baileys'
import State from '../../State'

export default function (client: WAConnection, _state: State): void {
  client.on('chat-update', chat => {
    if (!chat.messages && !chat.count) return

    const message = chat.messages.first
    // Check if class message is available
    if (!message.message) return
    if (!message.message.conversation) return
    console.log(message)
  })
}

