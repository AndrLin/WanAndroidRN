import React, { Component } from 'react';
import { View, Text, FlatList, DeviceEventEmitter } from 'react-native';
import Axios from '../common/NetUtil';
import NewsItem from '../components/NewsItem';

export default class CollectListScreen extends Component {
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
    this.collectChangeListener = DeviceEventEmitter.addListener('collectChange', this._onRefresh);
  }

  componentWillUnmount() {
      this.collectChangeListener.remove();
  }

getList() {
    Axios.get(`https://www.wanandroid.com/lg/collect/list/${this.state.page}/json`)
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
    <NewsItem 
    data={item}
    showTag={false}
    onPressItem={() => {this.props.navigation.navigate('Web', {title: item.title, url: item.link, id: item.originId, collect: true})}}/>
);

render() {
    return (
        <FlatList
        data={this.state.data}
        renderItem={this._renderItem}
        keyExtractor={item => item.id + ''}
        refreshing={this.state.isRefresh}
        onRefresh={this._onRefresh}
        onEndReachedThreshold={0.5}
        onEndReached={this._loadMore}/>
    );
}
}
