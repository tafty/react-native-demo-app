import { NetworkConnectionActionType } from '../networkConnectionActionType'
import { createAction } from '../../createAction'

describe('INetworkStatusUpdate', () => {
  it('should return a Network Status Update action', () => {
    const type: NetworkConnectionActionType = 'NetworkStatusUpdate'
    const payload = {
      isConnected: true,
      isInternetReachable: true,
      type: 'wi-fi',
    }
    const expected = {
      type,
      payload,
    }
    const action = createAction(type, { payload })
    expect(action).toEqual(expected)
  })
})
