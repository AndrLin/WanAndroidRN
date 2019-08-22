import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default class NewsItem extends React.Component {
    render() {
        return (
            <TouchableOpacity onPress={() => {
                this.props.onPressItem && this.props.onPressItem();
            }}
            activeOpacity={0.5}>
            <View style={styles.item}>
                <View style={styles.tag_wrap}>
                    <Text style={[styles.tag_top, {display: this.props.data.type == 1 ? 'flex' : 'none'}]}>置顶</Text>
                    <Text style={[styles.tag_new, {display: this.props.data.fresh ? 'flex' : 'none'}]}>最新</Text>
                    <Text style={styles.tag_category}>{this.props.data.superChapterName}</Text>
                </View>
                <Text style={styles.txt_title}>{this.props.data.title}</Text>
                <View style={styles.footer_wrap}>
                    <Text style={styles.txt_author}>by {this.props.data.author}</Text>
                    <Text style={styles.txt_time}>{this.props.data.niceDate}</Text>
                </View>
            </View>
            </TouchableOpacity>
        );
    }
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'column',
        paddingStart: 15,
        paddingEnd: 15,
        paddingTop: 10,
        borderBottomColor: '#e1e1e1',
        borderBottomWidth: 1
    },
    tag_wrap: {
        flexDirection: 'row'
    },
    tag_top: {
        marginEnd: 10,
        borderColor: 'red',
        borderWidth: 0.5,
        color: 'red',
        padding: 3,
        fontSize: 10
    },
    tag_new: {
        marginEnd: 10,
        borderColor: 'blue',
        borderWidth: 0.5,
        color: 'blue',
        padding: 3,
        fontSize: 10
    },
    tag_category: {
        marginEnd: 10,
        borderColor: 'green',
        borderWidth: 0.5,
        color: 'green',
        padding: 3,
        fontSize: 10
    },
    txt_title: {
        fontSize: 14,
        lineHeight: 20,
        marginTop: 10,
        marginBottom: 10
    },
    footer_wrap: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    txt_author: {
        color: '#757575',
        fontSize: 10
    },
    txt_time: {
        color: '#757575',
        fontSize: 10
    }
});