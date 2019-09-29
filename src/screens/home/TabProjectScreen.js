import React from 'react';
import {FlatList, Animated, DeviceEventEmitter} from 'react-native';
import ProjectItem from '../../components/ProjectItem';
import axios from '../../common/NetUtil';
import {withCollapsibleForTabChild} from 'react-navigation-collapsible';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class TabProjectScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       data: [],
       page: 0,
       isRefresh: false,
       isNoMore: false
    };
    this.getList = this.getList.bind(this);
  }

  componentDidMount() {
    this.getList();
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


  getList() {
    axios.get(`https://wanandroid.com/article/listproject/${this.state.page}/json`)
      .then(res => {
        const {over, datas} = res.data.data;
        this.setState((state) => ({
          data: state.page == 0 ? datas : state.data.concat(datas),
          isRefresh: false,
          isNoMore: over
        }));
      });
  }

  _onRefresh = () => {
    this.setState({
      page: 0,
      isRefresh: true
    }, () => {
      this.getList();
    });
  };

  _loadMore = () => {
    if (!this.state.isNoMore) {
      this.setState((state) => ({
        page: state.page + 1
      }), () => {
        this.getList();
      });
    }
  };

  _renderItem = ({item}) => (
    <ProjectItem 
      data={item} 
      onPressItem={() => {this.props.navigation.navigate('Web', {title: item.title, url: item.link, id: item.id, collect: item.collect})}}/>
  );

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
        onScroll={onScroll}
        _mustAddThis={animatedY}/>
    );
  }
}

export default withCollapsibleForTabChild(TabProjectScreen);