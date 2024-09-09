import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import TodoScreen from './src/screen/TodoScreen';

const App: React.FC = (): React.JSX.Element => {
  return (
    <SafeAreaView>
      <View>
       <TodoScreen />
      </View>
      </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({ });