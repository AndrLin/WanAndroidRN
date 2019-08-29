import React from 'react';
import axios from 'axios';
import IconFont from '../assets/iconfont/Icon';
import {View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import colors from '../assets/colors';

export default class TiXiScreen extends React.Component {

    constructor(props) {
      super(props)
    
      this.state = {
         data : [],
      };

      this.getData = this.getData.bind(this);
    };

    componentDidMount() {
        this.getData();
    }

    getData() {
        axios.get('https://www.wanandroid.com/tree/json')
        .then(res => {
            this.setState({
                data: res.data.data
            })
        })
    }
    

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={{borderBottomColor: colors.bgGray, borderBottomWidth: 1, justifyContent: 'space-between', flexDirection: 'row', alignContent: 'center'}}>
                    <Text style={{fontSize: 20, margin: 10}}>知识体系</Text>
                    <IconFont name={'search'} size={15} color={'#000'} style={{alignSelf: 'center', padding: 10}}/>
                </View>
                <View style={{flex: 1}}>
                <ScrollView style={{flex: 1}}>
                    {
                        this.state.data.map((item) => {
                            return (
                                <View style={{paddingLeft: 10, paddingRight: 10, paddingBottom: 10}} key={item.id + ""}>
                                    <Text style={{marginTop: 10}}>{item.name}</Text>
                                    <View style={{flexWrap: 'wrap', flexDirection: 'row', paddingLeft: 10}}>
                                        {
                                            item.children.map((child) => {
                                                return (
                                                    <TouchableOpacity key={child.id + ''} 
                                                    onPress={() => {
                                                        this.props.navigation.navigate('ArticleList', {cid: child.id, title: child.name})
                                                    }}>
                                                    <Text style={styles.tagBg}>{child.name}</Text>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    tagBg: {
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