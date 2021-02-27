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
    if (read) {
      await client.chatRead(context.key.remoteJid, 'read')
    }
    await client.sendMessage(context.key.remoteJid, message, MessageType.extendedText)
  },
  messageReply: async (client: WAConnection, context: proto.WebMessageInfo, message: string, read?: boolean): Promise<void> => {
    read = read || false
    if (read) {
      await client.chatRead(context.key.remoteJid, 'read')
    }
    await client.sendMessage(context.key.remoteJid, message, MessageType.extendedText, {
      quoted: context
    })
  },
  sticker: async (client: WAConnection, context: proto.WebMessageInfo, image: Buffer, read?: boolean): Promise<void> => {
    read = read || false
    if (read) {
      await client.chatRead(context.key.remoteJid, 'read')
    }
    await client.sendMessage(context.key.remoteJid, image, MessageType.sticker)
  },
  stickerReply: async (client: WAConnection, context: proto.WebMessageInfo, image: Buffer, read?: boolean): Promise<void> => {
    read = read || false
    if (read) {
      await client.chatRead(context.key.remoteJid, 'read')
    }
    await client.sendMessage(context.key.remoteJid, image, MessageType.sticker, {
      quoted: context
    })
  }
}

