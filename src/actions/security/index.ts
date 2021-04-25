export * from './ILoginFailed'
export * from './ILoginStarted'
export * from './ILoginSucceeded'
export * from './ILogOutCompleted'
export * from './ILogOutStarted'
export * from './IRequireLogin'
export * from './ISecuritySessionExpired'
export * from './ISecuritySessionLoadCompleted'

export * from './securityActionType'

import { ILoginFailed } from './ILoginFailed'
import { ILoginStarted } from './ILoginStarted'
import { ILoginSucceeded } from './ILoginSucceeded'
import { ILogOutCompleted } from './ILogOutCompleted'
import { ILogOutStarted } from './ILogOutStarted'
import { IRequireLogin } from './IRequireLogin'
import { ISecuritySessionExpired } from './ISecuritySessionExpired'
import { ISecuritySessionLoadCompleted } from './ISecuritySessionLoadCompleted'

export type Action =
  | ILoginFailed
  | ILoginStarted
  | ILoginSucceeded
  | ILogOutCompleted
  | ILogOutStarted
  | IRequireLogin
  | ISecuritySessionExpired
  | ISecuritySessionLoadCompleted
