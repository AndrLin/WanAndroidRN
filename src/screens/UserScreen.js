import React from 'react';
import {Button, 
  View, Text, 
  SafeAreaView, 
  Image, 
  TouchableOpacity, 
  DeviceEventEmitter, 
  StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import colors from '../assets/colors';
import Axios from 'axios';
import Toast from 'react-native-root-toast';

export default class UserScreen extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
       isLogin: false,
       userInfo: null
    }

    this._renderUserName = this._renderUserName.bind(this);
  }
  

  componentDidMount() {
    AsyncStorage.getItem('userInfo')
        .then(result => {
          if (result) {
            this.setState({
              isLogin: true,
              userInfo: JSON.parse(result)
            })
          }
        })
    this.loginListener = DeviceEventEmitter.addListener('isLogin', data => {
      if (data) {
        AsyncStorage.getItem('userInfo')
        .then(result => {
          this.setState({
            isLogin: true,
            userInfo: JSON.parse(result)
          })
        })
      } else {
        this.setState({
          isLogin: false,
          userInfo: null
        })
      }
      
    })
  }

  componentWillUnmount() {
    this.loginListener.remove();
  }

  _renderUserName() {
    if (this.state.isLogin) {
      return (<Text>{this.state.userInfo.nickname}</Text>);
    } else {
      return (<Text>登录/注册</Text>);
    }
  }

  _toCollectList = () => {
    if (this.state.isLogin) {
      this.props.navigation.navigate('CollectList')
    } else {
      this.props.navigation.navigate('Login')
    }
  }

  _onAboutClick = () => {

  }

  _onHeaderClick = () => {
    if (!this.state.isLogin) this.props.navigation.navigate('Login')
  }

  _loginOut = () => {
    AsyncStorage.getItem('cookie')
    .then(result => {
      return Axios.get('https://www.wanandroid.com/user/logout/json',{
        headers: ['cookie', result]
      })
    })
    .then(res => {
      if (res.data.errorCode == 0) {
        AsyncStorage.clear()
        .then(error => {
          if (error) {
            Toast.show('退出失败')
          } else {
            Toast.show('退出成功')
            this.setState({
              isLogin: false,
              userInfo: null
            })
          }
        })
      }
    })
    
  }

  render() {
      return (
        <SafeAreaView style={{flex: 1}}>
          <TouchableOpacity onPress={this._onHeaderClick}>
          <View style={{justifyContent: 'center', alignItems: 'center', height: 300,
            borderBottomColor: colors.line, borderBottomWidth: 1}}>
            <Image source={require('../assets/img/default_logo.png')} 
              style={{width: 100, height: 100, borderColor: "#ccc", borderRadius: 50, borderWidth: 0.5, marginBottom: 10}}/>
            {this._renderUserName()}
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={this._toCollectList}>
            <View style={styles.item}>
              <Text>我的收藏</Text>
              <Image source={require('../assets/img/ic_arrow_right_gary.png')} style={{width: 15, height: 15}}></Image>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={this._onAboutClick}>
            <View style={styles.item}>
              <Text>关于</Text>
              <Image source={require('../assets/img/ic_arrow_right_gary.png')} style={{width: 15, height: 15}}></Image>
            </View>
          </TouchableOpacity>
          {
            this.state.isLogin && <View style={{marginTop: 50}}><Button onPress={this._loginOut} title="退出登录"/></View>
          }
        </SafeAreaView>
      );
    }
  }

  const styles = StyleSheet.create({
    item: {
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      height: 45,
      borderBottomColor: colors.line, borderBottomWidth: 1, 
      paddingLeft: 15, paddingRight: 15
    }
  });