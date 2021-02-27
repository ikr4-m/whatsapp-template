export const ValidateChannel = {
  isPrivateChannel: (id: string): boolean => {
    return id.split('@').pop() === 's.whatsapp.net'
  },
  isGroup: (id: string): boolean => {
    return id.split('@').pop() === 'g.us'
  }
}

