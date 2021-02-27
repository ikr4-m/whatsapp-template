import { WAConnection, proto } from '@adiwajshing/baileys'
import { CommandBuilder } from '../../Utils/CommandBuilder'
import State from '../../State'
import { Send } from '../../Utils/Generator'

export default class Sticker extends CommandBuilder {
  constructor() {
    super({
      name: 'sticker',
      description: 'Generate sticker from image and GIF'
    })
  }

  public async run(client: WAConnection, context: proto.WebMessageInfo, _state: State): Promise<any> {
    const ifSendPicture = !(!context.message.imageMessage)

    if (!ifSendPicture) {
      await Send.messageReply(client, context, "Please using this command while inserting a picture.")
      return
    }

    if (ifSendPicture) {
      const image = await client.downloadMediaMessage(context)
      await Send.stickerReply(client, context, image, true)
    }
  }
}

