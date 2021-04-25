export interface ISecuritySession {
  securitySessionId: string
  username?: string
  passwordHash?: string
  created: Date
  failedPINAttempts: number
}

export default class SecuritySession implements ISecuritySession {
  static fromRealmObject(realmObject: ISecuritySession): SecuritySession {
    const securitySession = new SecuritySession()
    securitySession.created = realmObject.created
    securitySession.failedPINAttempts = realmObject.failedPINAttempts
    securitySession.passwordHash = realmObject.passwordHash
    securitySession.securitySessionId = realmObject.securitySessionId
    securitySession.username = realmObject.username

    return securitySession
  }

  securitySessionId: string
  username?: string
  passwordHash?: string
  created: Date
  failedPINAttempts: number

  constructor() {
    this.created = new Date()
    this.failedPINAttempts = 0
    this.securitySessionId = ''
  }

  static schema: Realm.ObjectSchema
}

export const schema = {
  name: 'SecuritySession',
  primaryKey: 'securitySessionId',
  properties: {
    securitySessionId: { type: 'string', optional: false },
    username: { type: 'string', optional: true },
    passwordHash: { type: 'string', optional: true },
    created: { type: 'date', optional: false },
    failedPINAttempts: { type: 'int', optional: false, default: 0 },
  },
}

SecuritySession.schema = schema
