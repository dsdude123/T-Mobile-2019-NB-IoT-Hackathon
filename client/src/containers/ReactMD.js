import React from 'react'

import { NavigationDrawer, FontIcon } from 'react-md'

export default class ReactMD extends React.Component {
  navItems = []
  render () {
    return (
      <NavigationDrawer
          contentId='app'
          toolbarTitle='T-Mobile IOT Hack'
          drawerTitle='Tracker'
          mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
          tabletDrawerType={NavigationDrawer.DrawerTypes.FLOATING}
          desktopDrawerType={NavigationDrawer.DrawerTypes.FLOATING}
          navItems={this.navItems}
        >
          {this.props.children}
        </NavigationDrawer>
    )
  }
}
