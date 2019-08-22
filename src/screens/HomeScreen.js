import React from 'react';
import {View, Dimensions, SafeAreaView, Animated} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation';
import SearchBar from '../components/SearchBar';
import TabNewsScreen from './home/TabNewsScreen';
import TabProjectScreen from './home/TabProjectScreen';
import TabOfficialAccountScreen from './home/TabOfficialAccountScreen';
import colors from '../assets/colors';
import {withCollapsibleForTab} from 'react-navigation-collapsible';

const screenWidth = Dimensions.get('window').width;
const indicatorWidth = screenWidth / 6;
const indicatorMargin = indicatorWidth / 2;

const TopTabNavigator = createMaterialTopTabNavigator(
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

const SearchHeader = ({navigation, collapsible}) => {
  const {translateY, translateOpacity, translateProgress} = collapsible;
  return (
    <Animated.View style={{
      // transform: [{scale: translateOpacity}]
      opacity: translateOpacity
    }}>
      <SearchBar/>
    </Animated.View>
  );
};

const collapsibleParams = {
  collapsibleComponent: SearchHeader,
  collapsibleBackgroundStyle: {
    height: 50,
    backgroundColor: '#FFF',
    disableFadeoutInnerComponent: true,
  },
};

const CollapsibleForTab = withCollapsibleForTab(TopTabNavigator, collapsibleParams);

export default class HomeScreen extends React.Component {
  static router = TopTabNavigator.router;
  render() {
    return (
      <SafeAreaView style={{ flex: 1}}>
        <CollapsibleForTab {...this.props}/>
        {/* <View style={{ flex: 1, flexDirection: 'column' }}>
          <SearchBar/>
          <TopTabNavigator navigation={this.props.navigation}/>
        </View> */}
      </SafeAreaView>
    );
  }
}