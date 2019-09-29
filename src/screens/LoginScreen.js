import React from 'react';
import {SafeAreaView, View, Text, TextInput, Button, DeviceEventEmitter} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-root-toast';
import Axios from 'axios';

export default class LoginScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <Button onPress={() => navigation.navigate('Register')} title="注册"/>
            )
        }
    };

    state = {
        userName: "",
        password: ""
    }

    _doLogin = () => {
        if (this.state.userName.length == 0) {
            Toast.show('请填写用户名', {position: Toast.positions.CENTER});
            return;
        }
        if (this.state.password.length == 0) {
            Toast.show('请填写密码', {position: Toast.positions.CENTER});
            return;
        }

        Axios.post(`https://www.wanandroid.com/user/login?username=${this.state.userName}&password=${this.state.password}`)
            .then(res => {
                if (res.data.errorCode == -1) {
                    Toast.show(res.data.errorMsg, {position: Toast.positions.CENTER});
                } else {
                    let cookie = res.headers['set-cookie'][0];
                    console.log(`cookie:${cookie}`)
                    AsyncStorage.multiSet([['userInfo', JSON.stringify(res.data.data)], ['cookie', cookie]], () => {
                        Toast.show('登录成功');
                        DeviceEventEmitter.emit('isLogin', true);
                        this.props.navigation.popToTop();
                    });
                }
            })
            .catch(error => {
                Toast.show(error);
            }

            )
    };

    render() {
        return (
            <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{borderBottomColor: '#ccc', borderBottomWidth: 1, flexDirection: 'row', marginLeft: 50, marginRight: 50, marginBottom: 20, padding: 10}}>
                    <Text>用户名：</Text>
                    <TextInput  
                        onChangeText={(text) => {
                          this.setState({
                            userName: text
                          });
                        }} 
                        style={{flex: 1}} clearButtonMode="while-editing"></TextInput>
                </View>
                <View style={{borderBottomColor: '#ccc', borderBottomWidth: 1, flexDirection: 'row', marginLeft: 50, marginRight: 50, marginBottom: 20, padding: 10}}>
                    <Text>密    码：</Text>
                    <TextInput 
                        onChangeText={(text) => {
                          this.setState({
                            password: text
                          });
                        }} 
                        style={{flex: 1}} 
                        clearButtonMode="while-editing" secureTextEntry={true}></TextInput>
                </View>

                <Button title="登录" onPress={this._doLogin}></Button>
            </SafeAreaView>
        );
    }
}
