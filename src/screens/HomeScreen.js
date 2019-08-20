import React from 'react';
import {View, Text, Dimensions, SafeAreaView} from 'react-native';
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation';
import SearchBar from '../components/SearchBar';
import TabNewsScreen from './home/TabNewsScreen';
import TabProjectScreen from './home/TabProjectScreen';
import TabOfficialAccountScreen from './home/TabOfficialAccountScreen';
import colors from '../assets/colors';

const screenWidth = Dimensions.get('window').width;
const indicatorWidth = screenWidth / 6;
const indicatorMargin = indicatorWidth / 2;

const topTabNavigator = createMaterialTopTabNavigator(
  {
    News: {
      screen: TabNewsScreen,
      navigationOptions: {
        tabBarLabel: '最新'
      }
    },
    Project: {
      screen: TabProjectScreen,
      navigationOptions: {
        tabBarLabel: '项目'
      }
    },
    OfficialAccount: {
      screen: TabOfficialAccountScreen,
      navigationOptions: {
        tabBarLabel: '公众号'
      }
    }
  },
  {
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: colors.activeTintColor,
      inactiveTintColor: colors.inactiveTintColor,
      indicatorStyle: {
        backgroundColor: colors.primaryColor,
        borderRadius: 5,
        width: indicatorWidth,
        marginStart: indicatorMargin,
        marginEnd: indicatorMargin
      },
      style: {
        backgroundColor: '#FFF'
      }
    }
  }
);

export default class HomeScreen extends React.Component {
  render() {
    let Tab = createAppContainer(topTabNavigator);
    return (
      
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <SafeAreaView><SearchBar/></SafeAreaView>
          <Tab/>
        </View>
    );
  }
}