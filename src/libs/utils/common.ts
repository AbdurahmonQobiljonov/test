const PREFIX = '/'

export const getPrefix = (state: string, action: string) => `${state}${PREFIX}${action}`
