import React from 'react';
import { View, ProgressBarAndroid, ProgressViewIOS, Platform, SafeAreaView, DeviceEventEmitter } from 'react-native';
import { WebView } from 'react-native-webview';
import colors from '../assets/colors';
import { FloatingAction } from "react-native-floating-action";
import AsyncStorage from '@react-native-community/async-storage';
import Axios from '../common/NetUtil';

export default class WebScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.state.params.title
        };
    };

    constructor(props) {
        super(props);
        let showCollect = this.props.navigation.state.params.id != null
        let collect = this.props.navigation.state.params.collect
        this.state = {
            progress: 0,
            isShowCollect: showCollect,
            collectVisible: true,
            isCollect: collect,
            lastScrollY: 0,
            cookie: "",
        };
        this.getProgressBar = this.getProgressBar.bind(this);
    }

    componentDidMount() {
        AsyncStorage.getItem('cookie')
        .then(result => {
            this.setState({
                cookie: result
            });
        })
    }

    getProgressBar() {
        if (Platform.OS === 'android') {
            return <ProgressBarAndroid style={{marginTop: -5}} styleAttr="Horizontal" color={colors.progress} indeterminate={false} progress={this.state.progress} />
        } else {
            return <ProgressViewIOS progressTintColor={colors.progress} trackTintColor="white" progress={this.state.progress} />
        }
    }

    _collectClick = () => {
        if (this.state.cookie != null && this.state.cookie.length > 0) {
            let api = this.state.isCollect ? 'uncollect_originId' : 'collect';
            Axios.post(`https://www.wanandroid.com/lg/${api}/${this.props.navigation.state.params.id}/json`)
                .then(res => {
                    this.setState((state) => ({
                        isCollect: !state.isCollect
                    }), () => {
                        DeviceEventEmitter.emit('collectChange', this.props.navigation.state.params.id);
                    })
                })
        } else {
            this.props.navigation.navigate('Login')
        }
    }

    render () {
        const actions = [
            {
              text: "Accessibility",
              icon: this.state.isCollect ? require("../assets/img/ic_collected.png") : require("../assets/img/ic_collect.png"),
              name: "collect",
              position: 1
            }
          ];
        return (
            <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
                {
                    this.state.progress !== 1 && this.getProgressBar()
                }
                <WebView style={{flex: 1}} 
                    source={{uri: this.props.navigation.state.params.url}} 
                    onLoadProgress={({nativeEvent}) => {
                        this.setState({
                            progress: nativeEvent.progress
                        })
                    }}
                    onScroll={({nativeEvent}) => {
                        console.log(`scrollY:${nativeEvent.contentOffset.y}`)
                        let y = nativeEvent.contentOffset.y < 0 ? 0 : nativeEvent.contentOffset.y;
                        this.setState((state) => ({
                            collectVisible: y <= state.lastScrollY,
                            lastScrollY: y
                          }));
                    }
                    }/>

                <FloatingAction
                    actions={actions}
                    color="#FFF"
                    iconWidth={25}
                    iconHeight={25}
                    visible={this.state.isShowCollect && this.state.collectVisible}
                    overrideWithAction
                    onPressItem={this._collectClick}
                  />
            </View>
            </SafeAreaView>
        )
    }
}
