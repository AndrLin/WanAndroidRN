import React from 'react';
import {View, Text} from 'react-native';

export default class ProjectScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {/* other code from before here */}
          <Text>Project</Text>
        </View>
      );
    }
}