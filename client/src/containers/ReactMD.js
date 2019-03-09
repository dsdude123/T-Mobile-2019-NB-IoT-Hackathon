import React from 'react'

import { NavigationDrawer, FontIcon, ListItem, Subheader, Divider } from 'react-md'

export default class ReactMD extends React.Component {
  navItems = [
    <ListItem
      key='health'
      primaryText='Overall Health'
      secondaryText='18 / 20 Devices OK'
      rightIcon={<FontIcon>timeline</FontIcon>}
    />,
    <ListItem
      key='last_ouatage'
      primaryText='Last Outage'
      secondaryText='04/09 at 10:10AM PST'
      rightIcon={<FontIcon>av_timer</FontIcon>}
    />,
    <Divider/>,
    <Subheader>Developer Resources</Subheader>,
    <a
      key='source'
      target='_blank'
      rel='noopener noreferrer'
      href='https://github.com/dsdude123/T-Mobile-2019-NB-IoT-Hackathon/'
    >
      <ListItem
        primaryText='Source Code'
        secondaryText='On GitHub'
        rightIcon={<FontIcon>code</FontIcon>}
        />
    </a>,
    <a
      key='docs'
      target='_blank'
      rel='noopener noreferrer'
      href='https://github.com/dsdude123/T-Mobile-2019-NB-IoT-Hackathon/blob/cra-v2/API.md'
    >
      <ListItem
        primaryText='IoT Device API'
        secondaryText='Official Docs'
        rightIcon={<FontIcon>link</FontIcon>}
      />
    </a>
  ]
  render () {
    return (
      <NavigationDrawer
        contentId='app'
        toolbarTitle='T-Mobile IOT Hack'
        drawerTitle='Status Report'
        mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
        tabletDrawerType={NavigationDrawer.DrawerTypes.FLOATING}
        desktopDrawerType={NavigationDrawer.DrawerTypes.FLOATING}
        desktopMinWidth={400}
        navItems={this.navItems}
      >
        {this.props.children}
      </NavigationDrawer>
    )
  }
}
