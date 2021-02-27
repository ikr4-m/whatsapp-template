import {CommandBuilder} from "./Utils/CommandBuilder"

export default class State {
  public command = new Map<string, CommandBuilder>()
  public alias = new Map<string, string>()
  public help = new Map<string, string[]>()
  public cooldown = new Map<string, any>()

  public prefix = "."
}

