import {MessageType, proto, WAConnection} from "@adiwajshing/baileys";

export function getNumberID(phoneNumber: string): string {
  return `${phoneNumber}@s.whatsapp.net`
}

export function getGroupID(client: WAConnection, context: proto.WebMessageInfo): string {
  return `${client.user.jid.split('@')[0]}-${context.key.remoteJid.split('@')[0].split('-')[1]}@g.us`
}

export const Send = {
  message: async (client: WAConnection, context: proto.WebMessageInfo, message: string, read?: boolean): Promise<void> => {
    read = read || false
    await client.sendMessage(context.key.remoteJid, message, MessageType.text)
    if (read) {
      await client.chatRead(context.key.remoteJid, 'read')
    }
  },
  messageReply: async (client: WAConnection, context: proto.WebMessageInfo, message: string, read?: boolean): Promise<void> => {
    read = read || false
    await client.sendMessage(context.key.remoteJid, message, MessageType.text, {
      quoted: context
    })
    if (read) {
      await client.chatRead(context.key.remoteJid, 'read')
    }
  }
}

