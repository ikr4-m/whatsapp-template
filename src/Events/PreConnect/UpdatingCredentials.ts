import { WAConnection } from '@adiwajshing/baileys'
import * as FS from 'fs'
import State from '../../State'

export default function (client: WAConnection, _state: State): void {
  client.on('credentials-updated', () => {
    console.log("Credentials updated!")
    const authinfo = client.base64EncodedAuthInfo()
    FS.writeFileSync('./authentication.json', JSON.stringify(authinfo, null, '\t'))
  })
}

