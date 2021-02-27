import { WAConnection } from '@adiwajshing/baileys'
import * as FS from 'fs'

export default function (client: WAConnection): void {
  if (FS.existsSync('./authentication.json')) {
    client.loadAuthInfo('./authentication.json')
  }
}

