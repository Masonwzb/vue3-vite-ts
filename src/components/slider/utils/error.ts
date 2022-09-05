class AvatarPersonaError extends Error {
  constructor(m: string) {
    super(m)
    this.name = 'AvatarPersonaError'
  }
}

export function throwError(scope: string, m: string): never {
  throw new AvatarPersonaError(`[${scope}] ${m}`)
}
