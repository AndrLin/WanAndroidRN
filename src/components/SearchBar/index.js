import React from 'react';
import IconFont from '../../assets/iconfont/Icon';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../../assets/colors';
export default class SearchBar extends React.Component {

    render() {
        return (
            <View style={styles.search}>
                <View style={styles.searchWrap}>
                    <IconFont name={'search'} size={15} color={'#000'}/>
                    <Text>搜索关键字以空格隔开</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    search: {
        height: 50,
        backgroundColor: '#FFF'
    },
    searchWrap: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.bgGray,
        borderRadius: 180,
        marginStart: 40,
        marginEnd: 40,
        marginTop: 10,
        marginBottom: 10
    }
});