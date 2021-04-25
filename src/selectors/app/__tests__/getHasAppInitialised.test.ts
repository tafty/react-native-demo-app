import { getHasAppInitialised } from '../getHasAppInitialised'
import state from '../../__tests__/data/testApplicationState'

describe('getHasAppInitialised selector', () => {
  it('should return whether the app has initialised', () => {
    expect(getHasAppInitialised(state)).toBeTruthy()
  })
})
