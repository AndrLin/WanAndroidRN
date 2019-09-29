import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import ProjectScreen from './src/screens/ProjectScreen';
import TiXiScreen from './src/screens/TiXiScreen';
import UserScreen from './src/screens/UserScreen';
import WebScreen from './src/screens/WebScreen';
import ArticleListScreen from './src/screens/ArticleListScreen';
import LoginScreen from './src/screens/LoginScreen';
import CollectListScreen from './src/screens/CollectListScreen';

import IconFont from './src/assets/iconfont/Icon';
import colors from './src/assets/colors';

const MainTabNavigator = createBottomTabNavigator({
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
});

const RootNavigator = createStackNavigator({
  Main: {
    screen: MainTabNavigator,
    navigationOptions: {
      header: null,
      headerBackTitle: null
    }
  },
  Web: {
    screen: WebScreen,
  },
  ArticleList: {
    screen: ArticleListScreen,
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      title: '登录',
    }
  },
  CollectList: {
    screen: CollectListScreen,
    navigationOptions: {
      title: '我的收藏',
    }
  }
}, {
  defaultNavigationOptions: {
    headerTintColor: '#000',
    headerBackTitle: null
  }
});


export default createAppContainer(RootNavigator);
