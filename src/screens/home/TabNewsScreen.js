import React from 'react';
import {View, FlatList, Image, Dimensions, TouchableOpacity, Animated, DeviceEventEmitter} from 'react-native';
import NewsItem from '../../components/NewsItem';
import axios from '../../common/NetUtil';
import Swiper from 'react-native-swiper';
import colors from '../../assets/colors';
import {withCollapsibleForTabChild} from 'react-navigation-collapsible';
import AsyncStorage from '@react-native-community/async-storage';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const screenWidth = Dimensions.get('window').width;

class TabNewsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       data: [],
       banner: [],
       page: 0,
       isRefresh: false,
       isNoMore: false
    };
    this.getBanner = this.getBanner.bind(this);
    this.initData = this.initData.bind(this);
    this.getList = this.getList.bind(this);
  }
  
  componentDidMount() {
    this.getBanner();
    this.initData();
    this.loginListener = DeviceEventEmitter.addListener('isLogin', this._onRefresh);
    this.collectChangeListener = DeviceEventEmitter.addListener('collectChange', this._collectChangeEvent);
  }

  componentWillUnmount() {
    this.loginListener.remove();
    this.collectChangeListener.remove();
  }

  _collectChangeEvent = (id) => {
    const listData = [...this.state.data];
    this.setState({
      data: listData.map((item) => item.id === id ? {...item, collect:  !item.collect} : item),
    })
  }

  getBanner() {
    axios.get('https://www.wanandroid.com/banner/json')
      .then(res => {
        this.setState({
          banner: res.data.data
        });
      });
  }

  getList() {
    this.getNewsList()
      .then(response => {
        const {over, datas} = response.data.data;
        this.setState((state) => ({
          data: state.page == 0 ? datas : state.data.concat(datas),
          isRefresh: false,
          isNoMore: over
        }));
      });
  }

  getNewsList() {
    return axios.get(`https://www.wanandroid.com/article/list/${this.state.page}/json`);
  }

  getTopList() {
    return axios.get('https://www.wanandroid.com/article/top/json');
  }

  initData() {
    axios.all([this.getTopList(), this.getNewsList()])
      .then(axios.spread((top, news) => {
        let topData = top.data.data;
        let newsData = news.data.data.datas;
        this.setState({
          data: topData.concat(newsData),
          isRefresh: false
        });
      }));
  }

  _onRefresh = () => {
    this.setState({
      page: 0,
      isRefresh: true
    }, () => {
      this.initData();
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
      onPressItem={() => {this.props.navigation.navigate('Web', {title: item.title, url: item.link, id: item.id, collect: item.collect})}}/>
  );

  _renderHeader = () => {
    if (this.state.banner.length > 0) {
      return <Swiper style={{
        borderTopColor: colors.line, 
        borderTopWidth: 5}} height={screenWidth / 2} autoplay={true} 
        paginationStyle={{marginBottom: -20}}> 
        {
          this.state.banner.map((item, key) => {
            return (
              <View style={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: '#97CAE5'
              }} 
              key={item.id + ''}>
                <TouchableOpacity 
                  activeOpacity={0.8}
                  onPress={() => {this.props.navigation.navigate('Web', {title: item.title, url: item.url})}}>
                  <Image 
                    style={{width: '100%', height: '100%'}}
                    source={{uri: item.imagePath}}></Image>
                </TouchableOpacity>
              </View>
            
            )
          })
        }
      </Swiper>;
    } else {
      return <View></View>;
    }
  };

  render() {
    const {animatedY, onScroll} = this.props.collapsible;
    return (
      <AnimatedFlatList
        data={this.state.data}
        renderItem={this._renderItem}
        keyExtractor={item => item.id + ''}
        refreshing={this.state.isRefresh}
        onRefresh={this._onRefresh}
        onEndReachedThreshold={0.5}
        onEndReached={this._loadMore}
        ListHeaderComponent={this._renderHeader}
        onScroll={onScroll}
        _mustAddThis={animatedY}/>
    );
  }
}

export default withCollapsibleForTabChild(TabNewsScreen);