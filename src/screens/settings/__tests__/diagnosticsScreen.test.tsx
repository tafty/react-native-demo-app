import 'react-native'
import React from 'react'
import { render } from 'react-native-testing-library'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import DiagnosticsScreen from '../diagnosticsScreen'

const mockStore = configureStore()

jest.mock('../../../metadata.json', () => {
  return {
    git_commit: 'dd8ad0e',
    build_date: '2020-02-10T17:18:17.375+0000',
  }
})

describe('Diagnostics Screen', () => {
  it('Should render values from state', () => {
    const componentId = 'component1'
    const localApi = 'localhost://uri'
    const remoteApi = 'https://uri'
    const environment = 'test'
    const initialState = {
      configuration: {
        localConfig: {
          api: {
            remoteConfigUri: localApi,
            isStubbed: false,
            isRemoteConfigEnabled: true,
          },
          environment,
        },
        remoteConfig: {
          api: {
            uri: remoteApi,
          },
        },
      },
    }

    const store = mockStore(initialState)

    const { getByTestId, toJSON } = render(
      <Provider store={store}>
        <DiagnosticsScreen
          componentId={componentId}
          apiUri=""
          configApiUri=""
          environment=""
          isApiStubbed={false}
          isRemoteConfigEnabled={false}
          realmPath=""
        />
      </Provider>,
    )

    expect(getByTestId('Configuration API Location-value').props.children).toBe(
      localApi,
    )
    expect(getByTestId('Environment-value').props.children).toBe(environment)
    expect(getByTestId('API End Point-value').props.children).toBe(remoteApi)
    expect(getByTestId('Device Brand-value').props.children).toBe('Apple')
    expect(getByTestId('Device Model-value').props.children).toBe('iPhone 6')
    expect(getByTestId('App Version-value').props.children).toBe('1.0.2')
    expect(getByTestId('Build Number-value').props.children).toBe('10000002')
    expect(getByTestId('Device ID-value').props.children).toBe(
      'this_is_a_unique_device_id',
    )
    expect(getByTestId('Git Hash-value').props.children).toBe('dd8ad0e')
    expect(getByTestId('Build Date-value').props.children).toBe(
      'Mon Feb 10 2020 17:18:17 GMT+0000',
    )

    expect(toJSON()).toMatchSnapshot()
  })

  it('Should inform that stubs are in use', () => {
    const componentId = 'component1'
    const localApi = 'localhost://uri'
    const remoteApi = 'https://uri'
    const environment = 'test'
    const initialState = {
      configuration: {
        localConfig: {
          api: {
            remoteConfigUri: localApi,
            isStubbed: true,
            isRemoteConfigEnabled: false,
          },
          environment,
        },
        remoteConfig: {
          api: {
            uri: remoteApi,
          },
        },
      },
    }

    const store = mockStore(initialState)

    const { getByTestId, toJSON } = render(
      <Provider store={store}>
        <DiagnosticsScreen
          componentId={componentId}
          apiUri=""
          configApiUri=""
          environment=""
          isApiStubbed={false}
          isRemoteConfigEnabled={false}
          realmPath=""
        />
      </Provider>,
    )

    expect(getByTestId('Configuration API Location-value').props.children).toBe(
      'Using internal stub',
    )
    expect(getByTestId('Environment-value').props.children).toBe(environment)
    expect(getByTestId('API End Point-value').props.children).toBe(
      'Using internal stub',
    )
    expect(getByTestId('Device Brand-value').props.children).toBe('Apple')
    expect(getByTestId('Device Model-value').props.children).toBe('iPhone 6')
    expect(getByTestId('App Version-value').props.children).toBe('1.0.2')
    expect(getByTestId('Build Number-value').props.children).toBe('10000002')
    expect(getByTestId('Device ID-value').props.children).toBe(
      'this_is_a_unique_device_id',
    )
    expect(getByTestId('Git Hash-value').props.children).toBe('dd8ad0e')
    expect(getByTestId('Build Date-value').props.children).toBe(
      'Mon Feb 10 2020 17:18:17 GMT+0000',
    )

    expect(toJSON()).toMatchSnapshot()
  })
})
