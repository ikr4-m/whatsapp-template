import { CommandBuilder } from './CommandBuilder';
import State from '../State';
import * as FS from 'fs'

export default function (state: State): void {
  FS.readdirSync('./build/src/Command').forEach(category => {
    const catePath = `./build/src/Command/${category}`
    if (!FS.lstatSync(catePath).isDirectory()) return

    // Reserving Help Key
    const cateKey = category.replace(' ', '_').toUpperCase()
    state.help.set(cateKey, [])

    FS.readdirSync(catePath).forEach(async cmdName => {
      if (cmdName.split('.').pop() !== 'js') return

      const cmd = await import(`../Command/${category}/${cmdName}`)
      const cmdModule = new cmd.default() as CommandBuilder

      // Set state
      const commandName = typeof cmdModule.options.name !== 'string'
        ? cmdModule.options.name[0]
        : cmdModule.options.name
      cmdModule.options.cooldown = cmdModule.options.cooldown || 5
      state.command.set(commandName, cmdModule)

      // Set alias
      if (typeof cmdModule.options.name !== 'string') {
        cmdModule.options.name.forEach(val => {
          state.alias.set(val, commandName)
        })
      }

      // Set help
      state.help.get(cateKey).push(commandName)

      console.log(`[BOT::COMMAND] Caching ${cateKey}:${commandName} command.`)
    })
  })
}

