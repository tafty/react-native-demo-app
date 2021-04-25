import * as R from 'ramda'
import i18n from 'i18n-js'

import type { Action } from '../actions'
import { ILocalisationChanged } from '../actions/localisation/ILocalisationChanged'

export type LocalisationState = {
  locale?: string
}

const initialState = {
  locale: i18n.currentLocale(),
}

const localisation = (
  state: LocalisationState = initialState,
  action?: Action,
): LocalisationState => {
  if (R.isNil(action) || R.isNil(action.type)) {
    return state
  }

  switch (action.type) {
    case 'LocalisationChanged': {
      return localisationChanged(action)
    }
    default: {
      return state
    }
  }
}

const localisationChanged = (
  action: ILocalisationChanged,
): LocalisationState => {
  return {
    locale: action.locale,
  }
}

export default localisation
