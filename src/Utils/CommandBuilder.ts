import { WAConnection, WAChatUpdate } from '@adiwajshing/baileys'
import State from '../State'

export abstract class CommandBuilder {
  public options: any
  constructor (options: any) {
    this.options = options
  }

  public async run(_client: WAConnection, _context: WAChatUpdate, _state: State): Promise<any> {
    throw new Error("Not implemented")
  }
}

