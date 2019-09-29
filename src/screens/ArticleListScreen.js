import React from 'react';
import axios from '../common/NetUtil';
import {SafeAreaView, FlatList, DeviceEventEmitter} from 'react-native';
import NewsItem from '../components/NewsItem';

export default class ArticleListScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.state.params.title
        };
    };

    constructor(props) {
        super(props)
      
        let id = this.props.navigation.state.params.cid;

        this.state = {
           page: 0,
           isRefresh: false,
           isNoMoreData: false,
           data: [],
           cid: id
        };
        this.getList = this.getList.bind(this);
    };

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
        axios.get(`https://www.wanandroid.com/article/list/${this.state.page}/json?cid=${this.state.cid}`)
        .then(res => {
            const {over, datas} = res.data.data;
            this.setState((state) => ({
                data: state.page == 0 ? datas : state.data.concat(datas),
                isRefresh: false,
                isNoMoreData: over
            }));
        })
    }

    _onRefresh = () => {
        this.setState({
          page: 0,
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
        onPressItem={() => {this.props.navigation.navigate('Web', {title: item.title, url: item.link, id: item.id, collect: item.collect})}}/>
    );

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <FlatList
                    style={{flex: 1}}
                    data={this.state.data}
                    renderItem={this._renderItem}
                    keyExtractor={item => item.id + ''}
                    refreshing={this.state.isRefresh}
                    onRefresh={this._onRefresh}
                    onEndReachedThreshold={0.5}
                    onEndReached={this._loadMore}/>
            </SafeAreaView>
        );
    }
}