import { WAConnection, proto, MessageType } from '@adiwajshing/baileys'
import { CommandBuilder } from '../../Utils/CommandBuilder'
import State from '../../State'
import { Send } from '../../Utils/Generator'

export default class Ping extends CommandBuilder {
  constructor() {
    super({
      name: ['ping', 'p'],
      description: 'Ping!'
    })
  }

  public async run(client: WAConnection, context: proto.WebMessageInfo, _state: State): Promise<any> {
    Send.messageReply(client, context, "Pong!", true)
  }
}

