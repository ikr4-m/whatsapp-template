import { WAConnection } from '@adiwajshing/baileys'
import * as FS from 'fs'

export default function (client: WAConnection): void {
  client.on('credentials-updated', () => {
    console.log("Credentials updated!")
    const authinfo = client.base64EncodedAuthInfo()
    FS.writeFileSync('./authentication.json', JSON.stringify(authinfo, null, '\t'))
  })
}

