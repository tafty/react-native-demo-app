import localisation from '../localisation'
import { createAction } from '../../actions/createAction'

describe('Localisation reducer', () => {
  it('should return the default state', () => {
    const initialState = {
      locale: 'en-GB',
    }

    const state = localisation()

    expect(state).toEqual(initialState)
  })

  it('should return the state unchanged if action type is unrecognised', () => {
    const initialState = {
      locale: 'en-GB',
    }

    const action = createAction('DatabaseClosing', {})
    const state = localisation(initialState, action)

    expect(state).toEqual(initialState)
  })

  describe('when localisation change occurs', () => {
    it('new state locale should be the supplied locale', () => {
      const updatedState = {
        locale: 'en-GB',
      }

      const action = createAction('LocalisationChanged', { locale: 'fr-fr' })
      const state = localisation(updatedState, action)

      expect(state.locale).toEqual(action.locale)
    })
  })
})
