import React from 'react';
import { View, ProgressBarAndroid, ProgressViewIOS, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import colors from '../assets/colors';

export default class WebScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.state.params.title
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
        };
        this.getProgressBar = this.getProgressBar.bind(this);
    }

    getProgressBar() {
        if (Platform.OS === 'android') {
            return <ProgressBarAndroid style={{marginTop: -5}} styleAttr="Horizontal" color={colors.progress} indeterminate={false} progress={this.state.progress} />
        } else {
            return <ProgressViewIOS progressTintColor={colors.progress} trackTintColor="white" progress={this.state.progress} />
        }
    }
    render () {
        return (
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
                    }}/>
            </View>
        )
    }
}
