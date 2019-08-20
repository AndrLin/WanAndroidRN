import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import ProjectScreen from './src/screens/ProjectScreen';
import TiXiScreen from './src/screens/TiXiScreen';
import UserScreen from './src/screens/UserScreen';

import IconFont from './src/assets/iconfont/Icon';
import colors from './src/assets/colors';

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: '首页',
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        return <IconFont name={'home'} size={25} color={tintColor}/>;
      }
    }
  },
  TiXi: {
    screen: TiXiScreen,
    navigationOptions: {
      tabBarLabel: '体系',
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        return <IconFont name={'tixi'} size={25} color={tintColor}/>;
      }
    }
  },
  Project: {
    screen: ProjectScreen,
    navigationOptions: {
      tabBarLabel: '项目',
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        return <IconFont name={'project'} size={25} color={tintColor}/>;
      }
    }
  },
  Person: {
    screen: UserScreen,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        return <IconFont name={'person'} size={25} color={tintColor}/>;
      }
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: colors.activeTintColor,
    inactiveTintColor: colors.inactiveTintColor,
    showIcon: true
  }
})

export default createAppContainer(TabNavigator);
