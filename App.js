import { Text, View, TouchableOpacity, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useRef } from 'react';
import { useFonts } from 'expo-font';
import DoodleJump from './DoodleJump';
import BattlePass from './BattlePass';
import Locker from './Locker';
import { skins, barStyles } from './Skins'
import styles from './styles';

export default function App() {
  const [screen, setScreen] = useState('Home');
  const [skin, setSkin] = useState(skins["burger"])
  const [highScore, setHighScore] = useState(0);
  const [bars, setBars] = useState("white");
  const animationRef = useRef(new Animated.Value(0));

  useFonts({
    'Pixel': require('./assets/DePixelHalbfett.ttf'),
  });

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animationRef.current, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animationRef.current, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const marginBottom = animationRef.current.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  const marginTop = animationRef.current.interpolate({
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

    const getSkin = async () => {
      const key = 'skin';
      
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null && skins[value]) {
          setSkin(skins[value]);
        } else {
          setSkin(skins["burger"])
          await AsyncStorage.setItem(key, 'burger'); // Store as string
        }
      } catch (e) {
        console.error('Failed to fetch the data from storage', e);
      }
    };

    const getBars = async () => {
      const key = 'bars';
      
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          setBars(barStyles['white']);
        } else {
          setBars(barStyles[value])
          await AsyncStorage.setItem(key, 'white'); // Store as string
        }
      } catch (e) {
        console.error('Failed to fetch the data from storage', e);
      }
    };

    getHighScore();
    getSkin();
    getBars();
  }, []);

  useEffect(() => {
    const setHighScoreToStorage = async () => {
      await AsyncStorage.setItem('highscore', highScore.toString());
    };

    setHighScoreToStorage();
  }, [highScore]);

  const renderScreen = () => {
    if (screen === 'BurgerJump') {
      return <DoodleJump setMenuScreen={() => setScreen('Home')} highScore={highScore} setHighScore={setHighScore} skinImage={skin.image} bars={bars} />;
    } else if (screen === 'BattlePass') {
      return <BattlePass setMenuScreen={() => setScreen('Home')} highScore={highScore}/>;
    } else if (screen === 'Locker') {
      return <Locker setMenuScreen={() => setScreen('Home')} highScore={highScore} setSkin={setSkin} skin={skin} bars={bars} />;
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
          <TouchableOpacity style={styles.secondaryButton} onPress={() => setScreen('BattlePass')}>
            <Text style={styles.secondaryButtonText}>BATTLE PASS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => setScreen('Locker')}>
            <Text style={styles.secondaryButtonText}>LOCKER</Text>
          </TouchableOpacity>
          <StatusBar style='dark' /> 
        </View>
      );
    }
  };

  return renderScreen();
}
