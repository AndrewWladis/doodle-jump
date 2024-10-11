import { Text, View, TouchableOpacity, Animated } from 'react-native';
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

  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const marginBottom = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });


  const marginTop = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
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
          <Animated.Text 
            style={[
              styles.homeScreenTitle, 
              { fontFamily: 'Pixel', marginBottom, marginTop }
            ]}
          >
            {`Get\nHigh`}
          </Animated.Text>
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