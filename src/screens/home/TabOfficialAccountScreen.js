import React from 'react';
import axios from 'axios';
import {View, Text, StyleSheet, TouchableOpacity, Animated, FlatList, ScrollView} from 'react-native';
import colors from '../../assets/colors';
import NewsItem from '../../components/NewsItem';
import {withCollapsibleForTabChild} from 'react-navigation-collapsible';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class TabOfficialAccountScreen extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
       accounts: [],
       currentAccoutId: 0,
       page: 1,
       isRefresh: false,
       isNoMoreData: false,
       data: [],
    };

    this.flatList = React.createRef();

    this.getAccounts = this.getAccounts.bind(this);
    this.changeAccount = this.changeAccount.bind(this);
    this.getList = this.getList.bind(this);
  };

  componentDidMount() {
    this.getAccounts();
  }
  
  getAccounts() {
    axios.get('https://wanandroid.com/wxarticle/chapters/json')
      .then(res => {
        const {data} = res.data;
        this.setState({
          accounts: data,
          currentAccoutId: data[0].id
        }, () => {
          this.getList();
        });
      });
  }

  getList() {
    axios.get(`https://wanandroid.com/wxarticle/list/${this.state.currentAccoutId}/${this.state.page}/json`)
      .then(res => {
        const {over, datas} = res.data.data;
        this.setState((state) => ({
          data: state.page == 1 ? datas : state.data.concat(datas),
          isRefresh: false,
          isNoMoreData: over
        }));
      });
  }
  
  changeAccount(item) {
    this.setState({
      currentAccoutId: item.id,
      page: 1
    }, () => {
      this.getList();
      this.flatList.current.getNode().scrollToIndex({viewPosition: 0, index: 0});
    })
  }

  _onRefresh = () => {
    this.setState({
      page: 1,
      isRefresh: true
    }, () => {
      this.getList();
    });
  }

  _loadMore = () => {
    this.setState((state) => ({
      page: state.page + 1
    }), () => {
      this.getList();
    });
  }

  _renderItem = ({item}) => (
    <NewsItem 
      data={item}
      showTag={false}
      onPressItem={() => {this.props.navigation.navigate('Web', {title: item.title, url: item.link})}}/>
  );

  render() {
    const {animatedY, onScroll} = this.props.collapsible;
    return (
      <View style={{ flex: 1}}>
            <View style={{height: 45}}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{height: 45, borderBottomColor: colors.bgGray, borderBottomWidth: 1, paddingLeft: 10}}>
              {
                  this.state.accounts.map((item) => {
                    return (
                      <TouchableOpacity key={item.id + ''}
                      onPress={() => {
                        this.changeAccount(item)
                      }}>
                        <Text style={this.state.currentAccoutId == item.id? styles.current_account : styles.normal_account}>{item.name}</Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </ScrollView>
            </View>

            <AnimatedFlatList
              ref={this.flatList}
              style={{flex: 1}}
              data={this.state.data}
              renderItem={this._renderItem}
              keyExtractor={item => item.id + ''}
              refreshing={this.state.isRefresh}
              onRefresh={this._onRefresh}
              onEndReachedThreshold={0.5}
              onEndReached={this._loadMore}
              onScroll={onScroll}
              _mustAddThis={animatedY}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  current_account: {
    backgroundColor: colors.tagBgSelected,
    borderRadius: 12,
    color: '#FFF',
    paddingLeft: 15,
    paddingTop: 5,
    paddingRight: 15,
    paddingBottom: 5,
    marginRight: 10, 
    marginTop: 10
  },
  normal_account: {
    backgroundColor: colors.tagBgNormal,
    borderRadius: 12,
    color: colors.inactiveTintColor,
    paddingLeft: 15,
    paddingTop: 5,
    paddingRight: 15,
    paddingBottom: 5,
    marginRight: 10, 
    marginTop: 10
  }
});

export default withCollapsibleForTabChild(TabOfficialAccountScreen);