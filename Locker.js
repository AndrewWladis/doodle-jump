import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles'
import { skins } from './Skins';

export default function LockerRoom({ setMenuScreen, highScore, setSkin, skin, bars, locker, setLocker }) {

  return (
    <View style={[styles.doodleJumpScreen, styles.battlePassScreen]}>
        <View style={styles.lockerPanel}>
            <View style={styles.lockerCurrent}>
                {skin.image}
                <View style={[styles.doodleJumpDisplayBar, bars.style]}></View>
            </View>
        </View>
        <TouchableOpacity style={styles.startButton} onPress={() => setMenuScreen()}>
            <Text style={styles.startButtonText}>BACK TO MENU</Text>
        </TouchableOpacity>
    </View>
  )
}
