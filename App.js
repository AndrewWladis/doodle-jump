import { Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import DoodleJump from './DoodleJump';
import BattlePass from './BattlePass';
import styles from './styles';

export default function App() {
  const [screen, setScreen] = useState('Home');
  const [highScore, setHighScore] = useState(0);

  useFonts({
    'Pixel': require('./assets/DePixelHalbfett.ttf'),
  });

  useEffect(() => {
    const getHighScore = async () => {
      const key = 'highscore';
      
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          setHighScore(parseInt(value));
        } else {
          setHighScore(0);
          await AsyncStorage.setItem(key, '0'); // Store as string
        }
      } catch (e) {
        console.error('Failed to fetch the data from storage', e);
      }
    };

    getHighScore();
  }, []);

  useEffect(() => {
    const setHighScoreToStorage = async () => {
      await AsyncStorage.setItem('highscore', highScore.toString());
    };

    setHighScoreToStorage();
  }, [highScore]);

  const renderScreen = () => {
    if (screen === 'BurgerJump') {
      return <DoodleJump setMenuScreen={() => setScreen('Home')} highScore={highScore} setHighScore={setHighScore}/>;
    } else if (screen === 'BattlePass') {
      return <BattlePass setMenuScreen={() => setScreen('Home')} highScore={highScore}/>;
    } else {
      return (
        <View style={[styles.doodleJumpScreen, styles.homeScreen]}>
          <Text style={[styles.homeScreenTitle, { fontFamily: 'Pixel' }]}>Burger Jump</Text>
          <TouchableOpacity style={styles.startButton} onPress={() => setScreen('BurgerJump')}>
            <Text style={styles.startButtonText}>PLAY</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.startButton} onPress={() => setScreen('BattlePass')}>
            <Text style={styles.startButtonText}>BATTLE PASS</Text>
          </TouchableOpacity>
          <StatusBar style='dark' /> 
        </View>
      );
    }
  };

  return renderScreen();
}