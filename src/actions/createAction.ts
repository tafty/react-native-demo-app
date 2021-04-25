import { Action } from './index'

type NarrowAction<T, N> = T extends { type: N } ? T : never

export interface ICreateAction {
  <K extends Action['type']>(
    type: K,
    args: Omit<NarrowAction<Action, K>, 'type'>,
  ): NarrowAction<Action, K>
}

export function createAction<K extends Action['type']>(
  type: K,
  args: Omit<NarrowAction<Action, K>, 'type'>,
): NarrowAction<Action, K> {
  return {
    type,
    ...args,
  } as NarrowAction<Action, K>
}
