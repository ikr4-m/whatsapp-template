import { WAConnection, proto } from '@adiwajshing/baileys'
import { CommandBuilder } from '../../Utils/CommandBuilder'
import State from '../../State'
import { Send } from '../../Utils/Generator'
import * as Moment from 'moment'

export default class Info extends CommandBuilder {
  constructor() {
    super({
      name: 'info',
      description: 'Get some information about this bot'
    })
  }

  public async run(client: WAConnection, context: proto.WebMessageInfo, state: State): Promise<any> {
    const now = Moment()
    const uptime = Moment(state.uptime)
    const second = now.diff(uptime, 's') % 60
    const minute = now.diff(uptime, 'm') % 60
    const hour = now.diff(uptime, 'h') % 24
    const day = now.diff(uptime, 'd')

    Send.messageReply(
      client,
      context,
      [
        `Uptime: ${day} days, ${hour} hours, ${minute} minutes, ${second} seconds`,
        `NodeJS Version: ${process.version}`,
        `Command Loaded: ${state.command.size} commands`,
        '',
        '_Powered by Munn_'
      ].join('\n'),
      true
    )
  }
}

