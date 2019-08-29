import React from 'react';
import axios from 'axios';
import {View, Text, ScrollView, SafeAreaView, TouchableOpacity, FlatList} from 'react-native';
import ProjectItem from '../components/ProjectItem';
import colors from '../assets/colors';
import IconFont from '../assets/iconfont/Icon';

export default class ProjectScreen extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
      tree: [],
      data: [],
      page: 1,
      isRefresh: false,
      isNoMore: false,
      selectTypeId: 0
    };
    this.getTree = this.getTree.bind(this);
    this.getList = this.getList.bind(this);
    this.changeType = this.changeType.bind(this);
  };
  
  componentDidMount() {
    this.getTree();
  }

  getTree() {
    axios.get('https://www.wanandroid.com/project/tree/json')
      .then(res => {
        this.setState({
          tree: res.data.data,
          selectTypeId: res.data.data[0].id
        }, () => {
          this.getList()
        })
      })
  }

  getList() {
    axios.get(`https://www.wanandroid.com/project/list/${this.state.page}/json?cid=${this.state.selectTypeId}`)
      .then(res => {
        const {over, datas} = res.data.data;
        this.setState((state) => ({
          data: state.page == 1 ? datas : state.data.concat(datas),
          isRefresh: false,
          isNoMore: over
        }));
      });
  }

  changeType(item) {
    this.setState({
      data: [],
      page: 1,
      isRefresh: false,
      isNoMore: false,
      selectTypeId: item.id
    }, () => {
      this.getList()
    })
  }

  _onRefresh = () => {
    this.setState({
      page: 1,
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
      onPressItem={() => {this.props.navigation.navigate('Web', {title: item.title, url: item.link})}}/>
  );


  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{borderBottomColor: colors.bgGray, borderBottomWidth: 1, justifyContent: 'space-between', flexDirection: 'row', alignContent: 'center'}}>
            <Text style={{fontSize: 20, margin: 10}}>项目分类</Text>
            <IconFont name={'search'} size={15} color={'#000'} style={{alignSelf: 'center', padding: 10}}/>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{width: 100, backgroundColor: colors.bgGray}}>
            <ScrollView>
              {
                this.state.tree.map(item => {
                  return (
                    <TouchableOpacity onPress={() => this.changeType(item)} key={item.id + ''} >
                      <View style={{backgroundColor: this.state.selectTypeId == item.id ? colors.bgNormal : colors.bgGray, height: 50, padding: 5, justifyContent: 'center'}}>
                        <Text style={{alignSelf: 'center'}}>{item.name}</Text>
                      </View>
                    </TouchableOpacity>
                  )
                })
              }
            </ScrollView>
          </View>
          
          <FlatList
            style={{flex: 1}}
            data={this.state.data}
            renderItem={this._renderItem}
            keyExtractor={item => item.id + ''}
            refreshing={this.state.isRefresh}
            onRefresh={this._onRefresh}
            onEndReachedThreshold={0.5}
            onEndReached={this._loadMore}/>
        </View>
      </SafeAreaView>
    );
  }
}