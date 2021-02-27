import { WAConnection } from '@adiwajshing/baileys'
import * as FS from 'fs'
import State from '../../State'

export default function (client: WAConnection, _state: State): void {
  if (FS.existsSync('./authentication.json')) {
    client.loadAuthInfo('./authentication.json')
  }
}

