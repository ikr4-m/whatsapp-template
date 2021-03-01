import { WAConnection, proto } from '@adiwajshing/baileys'
import { CommandBuilder } from '../../Utils/CommandBuilder'
import State from '../../State'
import { Send } from '../../Utils/Generator'

export default class Help extends CommandBuilder {
  constructor() {
    super({
      name: ['help', '?'],
      description: 'Give you some information about all the command in this bot.'
    })
  }

  public async run(client: WAConnection, context: proto.WebMessageInfo, state: State): Promise<any> {
    const cmdName = context.message.conversation.length > 0
      ? context.message.conversation.split(' ')[0]
      : ''
    let generatedText = ''
    
    // No cmdName
    if (cmdName.length < 1) {
      state.help.forEach((val, key) => {
        key = key.split('_').map(v => `${v[0]}${v.slice(1).toLowerCase()}`).join(' ')
        generatedText += `[${key}]\n${val.join(', ')}\n\n`
      })

      Send.messageReply(
        client,
        context,
        [
          '*List Command*',
          '==================\n',
          generatedText,
          '_Powered by Munn_'
        ].join('\n'),
        true
      )
    }
    // With cmdName
    else {
      const command = state.command.get(cmdName)
      if (!command) {
        await Send.messageReply(client, context, 'Command not found, sorry.', true)
        return
      }

      Send.messageReply(
        client,
        context,
        [
          `Command: ${cmdName}`,
          `Alias: ${typeof command.options.name !== 'string' ? command.options.name.join(', ') : 'No alias'}`,
          `Description: ${command.options.description}`,
          `Cooldown: ${command.options.cooldown} seconds\n`,
          `How to use:\n${state.prefix}${cmdName}${typeof command.options.args === 'undefined' ? '' : command.options.args.join(' ')}`,
          `Example:\n${state.prefix}${cmdName} ${command.options.example || ''}\n`,
          '_Powered by Munn_'
        ].join('\n'),
        true
      )
    }
  }
}

