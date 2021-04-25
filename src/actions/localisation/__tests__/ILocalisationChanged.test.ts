import { LocalisationActionType } from '../localisationActionType'
import { createAction } from '../../createAction'

describe('ILocalisationChanged', () => {
  it('should return a Localisation Changed action', () => {
    const type: LocalisationActionType = 'LocalisationChanged'
    const locale = 'fr-fr'
    const expected = {
      type,
      locale,
    }
    const action = createAction(type, { locale })
    expect(action).toEqual(expected)
  })
})
