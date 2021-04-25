import 'react-native'
import React from 'react'
import { render } from 'react-native-testing-library'

import DiagnosticsRow from '../diagnosticsRow'

describe('DiagnosticsRow', () => {
  it('should render the row', () => {
    const title = 'The title'
    const value = 'The value'

    const { getByTestId, toJSON } = render(
      <DiagnosticsRow title={title} value={value} />,
    )

    expect(getByTestId('The title-title').props.children).toBe(title)
    expect(getByTestId('The title-value').props.children).toBe(value)

    expect(toJSON()).toMatchSnapshot()
  })
})
