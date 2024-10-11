import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { useFonts } from 'expo-font';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import DoodleJump from './DoodleJump';
import Tetris from './Tetris';
import styles from './styles';

export default function App() {
  const [screen, setScreen] = useState('Home');

  useFonts({
    'Pixel': require('./assets/DePixelHalbfett.ttf'),
  });

  const renderScreen = () => {
    if (screen === 'BurgerJump') {
      return <DoodleJump setMenuScreen={() => setScreen('Home')}/>;
    } else if (screen === 'Tetris') {
      return <Tetris setMenuScreen={() => setScreen('Home')}/>;
    } else {
      return (
        <View style={styles.arcadeSelectionScreen}>
          <Text style={[
            styles.arcadeSelectionScreenHeader,
            { fontFamily: 'Pixel' }
          ]}>
            TAP A GAME TO PLAY
          </Text>
            <FlatList
              data={[
                { 
                  key: '1', 
                  title: 'Burger Jump',
                  description: 'A Doodle Jump style game. Swipe to move from left to right, bounce on obstacles, and avoid falling below.',
                  color: '#52c0f7'
                }
              ]}
              renderItem={({ item }) => (
                <View style={[styles.gameItem, { backgroundColor: item.color }]}>
                  <Text style={[styles.gameTitle, { fontFamily: 'Pixel' }]}>{item.title}</Text>
                  <Text style={styles.gameDescription}>{item.description}</Text>
                  <TouchableOpacity style={styles.gameButton} onPress={() => setScreen(item.title.split(' ').join(''))}>
                    <Text style={styles.gameButtonText}>PLAY</Text>
                  </TouchableOpacity>
                </View>
              )}
              contentContainerStyle={styles.gameList}
            />
    
          <StatusBar style='light' /> 
        </View>
      );
    }
  };

  return renderScreen();
}