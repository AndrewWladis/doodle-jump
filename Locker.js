import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles'
import { skins, barStyles } from './Skins';

export default function LockerRoom({ setMenuScreen, highScore, setSkin, skin, bars, setBars }) {

  return (
    <View style={[styles.doodleJumpScreen, styles.battlePassScreen]}>
        <View style={styles.lockerPanel}>
            <View style={styles.lockerCurrent}>
                {skin.image}
                <View style={[styles.doodleJumpDisplayBar, bars.style]}></View>
            </View>
            <Text style={styles.lockerTitle}>TAP TO CHANGE YOUR AESTHETICS</Text>
            <View style={styles.lockerLists}>
                <FlatList
                    data={Object.values(skins)}
                    style={styles.lockerList}
                    renderItem={({ item }) => (
                    <TouchableOpacity style={styles.lockerItem} onPress={() => setSkin(item)}>
                        {item.image}
                    </TouchableOpacity>
                )}
                />
                <FlatList
                data={Object.values(barStyles)}
                style={styles.lockerList}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.lockerItem} onPress={() => setBars(item)}>
                        <View style={[styles.doodleJumpDisplayBar, item.style]}></View>
                    </TouchableOpacity>
                )}
            />
            </View>
        </View>
        <TouchableOpacity style={styles.startButton} onPress={() => setMenuScreen()}>
            <Text style={styles.startButtonText}>BACK TO MENU</Text>
        </TouchableOpacity>
    </View>
  )
}
