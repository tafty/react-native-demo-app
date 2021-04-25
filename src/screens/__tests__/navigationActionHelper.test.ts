import * as componentIds from '../../componentIds'
import * as screens from '../screens'

import { Layout, Navigation } from 'react-native-navigation'

import NavigationActionHelper from '../navigationActionHelper'

class FakePromise {
  static createFakePromise() {
    return new FakePromise()
  }

  then(method: Function) {
    method()
  }
}

describe('Navigation Options', () => {
  let navigationActionId: string

  beforeEach(() => {
    NavigationActionHelper.reset()
    Navigation.showOverlay = (layout: Layout<any>) => {
      if (layout === undefined) {
        throw new Error('Cannot display overlay without a layout')
      }

      expect(layout.component!.id).toEqual(
        componentIds.NAVIGATION_ACTION_OVERLAY,
      )
      expect(layout.component!.name).toEqual(screens.NAVIGATION_ACTION_OVERLAY)
      expect(layout.component!.passProps.navigationActionId).toEqual(
        navigationActionId,
      )
      return FakePromise.createFakePromise() as Promise<any>
    }
    Navigation.dismissOverlay = jest.fn()
  })

  it('should reset all navigation events', () => {
    let called = 0
    const method = () => {
      called++
    }

    navigationActionId = 'event_id_1'
    NavigationActionHelper.start(navigationActionId, method)
    navigationActionId = 'event_id_2'
    NavigationActionHelper.start(navigationActionId, method)

    expect(called).toEqual(2)

    NavigationActionHelper.reset()
    // All events have been reset so the method will be called again

    navigationActionId = 'event_id_1'
    NavigationActionHelper.start(navigationActionId, method)
    navigationActionId = 'event_id_2'
    NavigationActionHelper.start(navigationActionId, method)

    expect(called).toEqual(4)

    navigationActionId = 'event_id_1'
    NavigationActionHelper.complete(navigationActionId)
    navigationActionId = 'event_id_2'
    NavigationActionHelper.complete(navigationActionId)
  })

  it('should call the supplied method if this event id has not already been called', () => {
    let called = false
    const method = () => {
      called = true
    }

    navigationActionId = 'event_id_1'
    NavigationActionHelper.start(navigationActionId, method)
    NavigationActionHelper.complete(navigationActionId)

    expect(called).toBeTruthy()
  })

  it('should only call the supplied method the first time this event id is called', () => {
    let called = 0
    const method = () => {
      called++
    }

    navigationActionId = 'event_id_1'
    NavigationActionHelper.start(navigationActionId, method)
    NavigationActionHelper.start(navigationActionId, method)
    NavigationActionHelper.complete(navigationActionId)

    expect(called).toEqual(1)
  })

  it('should call the supplied method again if the navigation for the event id has completed', () => {
    let called = 0
    const method = () => {
      called++
    }

    navigationActionId = 'event_id_1'
    NavigationActionHelper.start(navigationActionId, method)
    NavigationActionHelper.complete(navigationActionId)
    NavigationActionHelper.start(navigationActionId, method)
    NavigationActionHelper.complete(navigationActionId)

    expect(called).toEqual(2)
  })

  it('should perform the required navigation and complete the navigation for the event id', async done => {
    let called = 0
    const method = () => {
      called++
    }

    let receivedComponentId: string
    let receivedLayout: any

    Navigation.push = (componentId, layout) => {
      receivedComponentId = componentId
      receivedLayout = layout
      return new Promise(resolve => {
        expect(called).toEqual(1)
        expect(receivedComponentId).toEqual('component_id')
        expect(receivedLayout).toEqual({ component: { name: 'screen_id' } })
        resolve()
        expect(called).toEqual(1)
        done()
      })
    }

    navigationActionId = 'event_id_1'
    NavigationActionHelper.start(navigationActionId, method)
    NavigationActionHelper.navigate(
      navigationActionId,
      'component_id',
      'screen_id',
    )
  })

  it('should perform the required navigation with the supplied options and complete the navigation for the event id', async done => {
    let called = 0
    const method = () => {
      called++
    }

    let receivedComponentId: string
    let receivedLayout: any

    Navigation.push = (componentId, layout) => {
      receivedComponentId = componentId
      receivedLayout = layout
      return new Promise(resolve => {
        expect(called).toEqual(1)
        expect(receivedComponentId).toEqual('component_id')
        expect(receivedLayout).toEqual({
          component: {
            name: 'screen_id',
            options: { title: { text: 'title' } },
          },
        })
        resolve()
        expect(called).toEqual(1)
        done()
      })
    }

    navigationActionId = 'event_id_1'
    NavigationActionHelper.start(navigationActionId, method)
    NavigationActionHelper.navigate(
      navigationActionId,
      'component_id',
      'screen_id',
      {
        title: { text: 'title' },
      },
    )
  })

  it('should perform the required navigation with the supplied passProps and complete the navigation for the event id', async done => {
    let called = 0
    const method = () => {
      called++
    }

    let receivedComponentId: string
    let receivedLayout: any

    Navigation.push = (componentId, layout) => {
      receivedComponentId = componentId
      receivedLayout = layout
      return new Promise(resolve => {
        expect(called).toEqual(1)
        expect(receivedComponentId).toEqual('component_id')
        expect(receivedLayout).toEqual({
          component: { name: 'screen_id', passProps: { isNew: true } },
        })
        resolve()
        expect(called).toEqual(1)
        done()
      })
    }

    navigationActionId = 'event_id_1'
    NavigationActionHelper.start(navigationActionId, method)
    NavigationActionHelper.navigate(
      navigationActionId,
      'component_id',
      'screen_id',
      undefined,
      {
        isNew: true,
      },
    )
  })

  it('should perform the required navigation with the supplied component id and complete the navigation for the event id', async done => {
    let called = 0
    const method = () => {
      called++
    }

    let receivedComponentId: string
    let receivedLayout: any

    Navigation.push = (componentId, layout) => {
      receivedComponentId = componentId
      receivedLayout = layout
      return new Promise(resolve => {
        expect(called).toEqual(1)
        expect(receivedComponentId).toEqual('component_id')
        expect(receivedLayout).toEqual({
          component: { name: 'screen_id', id: 'id' },
        })
        resolve()
        expect(called).toEqual(1)
        done()
      })
    }

    navigationActionId = 'event_id_1'
    NavigationActionHelper.start(navigationActionId, method)
    NavigationActionHelper.navigate(
      navigationActionId,
      'component_id',
      'screen_id',
      undefined,
      undefined,
      'id',
    )
  })

  it('should perform the required navigation with the supplied options, passProps and component id and complete the navigation for the event id', async done => {
    let called = 0
    const method = () => {
      called++
    }

    let receivedComponentId: string
    let receivedLayout: any

    Navigation.push = (componentId: string, layout: any) => {
      receivedComponentId = componentId
      receivedLayout = layout
      return new Promise(resolve => {
        expect(called).toEqual(1)
        expect(receivedComponentId).toEqual('component_id')
        expect(receivedLayout).toEqual({
          component: {
            name: 'screen_id',
            id: 'id',
            options: { title: { text: 'title' } },
            passProps: { isNew: true },
          },
        })
        resolve()
        expect(called).toEqual(1)
        done()
      })
    }

    navigationActionId = 'event_id_1'
    NavigationActionHelper.start(navigationActionId, method)
    NavigationActionHelper.navigate(
      navigationActionId,
      'component_id',
      'screen_id',
      { title: { text: 'title' } },
      { isNew: true },
      'id',
    )
  })
})
