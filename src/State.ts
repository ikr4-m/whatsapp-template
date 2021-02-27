export default class State {
  public command = new Map<string, any>()
  public alias = new Map<string, any>()
  public help = new Map<string, any>()
  public cooldown = new Map<string, any>()

  public prefix = "."
}

