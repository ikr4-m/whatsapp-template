import { WAConnection, proto } from '@adiwajshing/baileys'
import { CommandBuilder } from '../../Utils/CommandBuilder'
import { Send, generateFilename, mimetypeToExtension } from '../../Utils/Generator'
import State from '../../State'
import { readFileSync, rmSync } from 'fs'
import { execFile } from 'child_process'

export default class Sticker extends CommandBuilder {
  constructor() {
    super({
      name: 'sticker',
      description: 'Generate sticker from image and GIF'
    })
  }

  public async run(client: WAConnection, context: proto.WebMessageInfo, _state: State): Promise<any> {
    const ifSendPicture = context.message.imageMessage !== null

    if (!ifSendPicture) {
      await Send.messageReply(client, context, "Please using this command while inserting a picture.")
      return
    }

    const location = `./Temp/Stickers/${generateFilename(context, 'sticker')}`
    await client.downloadAndSaveMediaMessage(context, location)
    execFile(
      process.env.CWEBP_LOCATION,
      ['-q', '100', `${location}.${mimetypeToExtension(context.message.imageMessage.mimetype)}`, '-o', `${location}.webp`],
      async err => {
        if (err) {
          console.log(err)
          await Send.message(client, context, 'Error: ' + err.message)
          return
        }

        await Send.stickerReply(client, context, readFileSync(`${location}.webp`))

        // When the sticker is actually downloaded, delete it after 60 seconds
        setTimeout(() => {
          // Delete webp
          rmSync(`${location}.webp`)
          // Delete image
          rmSync(`${location}.${mimetypeToExtension(context.message.imageMessage.mimetype)}`)
        }, 60000);
      }
    )
  }
}

