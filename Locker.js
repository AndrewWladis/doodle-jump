import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles'
import { skins } from './Skins';

export default function Locker({ setMenuScreen, highScore, setSkin, Skin }) {
    const [locker, setLocker] = useState([]);

    useEffect(() => {
        const getLocker = async () => {
          const key = 'locker';
          
          try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
              value.split(',').map((val) => {
                setLocker(prevLocker => [...prevLocker, skins[val]])
              })
            } else {
              setLocker([skins["burger"]])
              await AsyncStorage.setItem(key, 'burger,'); // Store as string
            }
          } catch (e) {
            console.error('Failed to fetch the data from storage', e);
          }
        };
    
        getLocker();
      }, []);

  return (
    <View style={[styles.doodleJumpScreen, styles.battlePassScreen]}>
        <View style={styles.lockerPanel}>
            
        </View>
        <TouchableOpacity style={styles.startButton} onPress={() => setMenuScreen()}>
            <Text style={styles.startButtonText}>BACK TO MENU</Text>
        </TouchableOpacity>
    </View>
  )
}
