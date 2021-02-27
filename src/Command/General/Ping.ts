import { WAConnection, WAChatUpdate, MessageType } from '@adiwajshing/baileys'
import { CommandBuilder } from '../../Utils/CommandBuilder'
import State from '../../State'

export default class Ping extends CommandBuilder {
  constructor() {
    super({
      name: ['ping', 'p'],
      description: 'Ping!'
    })
  }

  public async run(client: WAConnection, context: WAChatUpdate, _state: State): Promise<any> {
    client.sendMessage(context.messages.first.key.id, "Pong", MessageType.text)
  }
}

