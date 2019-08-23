import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';

export default class ProjectItem extends React.Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        onPressItem: PropTypes.func
    }

    render() {
        return (
            <TouchableOpacity onPress={() => {
                this.props.onPressItem && this.props.onPressItem();
            }}
            activeOpacity={0.5}>
                <View style={styles.item}>
                    <View style={{flexDirection: 'column', flex: 1, marginRight: 10, justifyContent: 'space-between'}}>
                        <Text style={styles.txt_title} ellipsizeMode="tail" numberOfLines={3}>{this.props.data.title}</Text>
                        <Text style={styles.txt_des} ellipsizeMode="tail" numberOfLines={3}>{this.props.data.desc}</Text>
                        <View style={styles.tag_wrap}>
                            <Text style={styles.tag_category}>{this.props.data.chapterName}</Text>
                        </View>
                        <View style={styles.footer_wrap}>
                            <Text style={styles.txt_author}>by {this.props.data.author}</Text>
                            <Text style={styles.txt_time}>{this.props.data.niceDate}</Text>
                        </View>
                    </View>
                    <Image source={{uri: this.props.data.envelopePic}} style={styles.img}/>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'column',
        paddingStart: 15,
        paddingEnd: 15,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: '#e1e1e1',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tag_wrap: {
        flexDirection: 'row'
    },
    tag_category: {
        borderColor: 'green',
        borderWidth: 0.5,
        color: 'green',
        padding: 3,
        fontSize: 10
    },
    txt_title: {
        fontSize: 14,
        lineHeight: 20,
    },
    txt_des: {
        fontSize: 12,
        lineHeight: 16,
        color: '#757575',
    },
    img: {
        width: 90,
        height: 160,
        backgroundColor: '#ccc',
    },
    footer_wrap: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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