import { WAConnection, proto } from '@adiwajshing/baileys'
import { CommandOptions } from '../@Typings/CommandOptions'
import State from '../State'

export abstract class CommandBuilder {
  public options: CommandOptions
  constructor (options: any) {
    this.options = options
  }

  public async run(_client: WAConnection, _context: proto.WebMessageInfo, _state: State): Promise<any> {
    throw new Error("Not implemented")
  }
}

