/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import LoginPage from './LoginPage';

function App(): React.JSX.Element {

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <LoginPage/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
