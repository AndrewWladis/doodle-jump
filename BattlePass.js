import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styles from './styles'

export default function BattlePass({ setMenuScreen, highScore }) {
    const levels = [
        { id: 1, title: 'New Noob', highScoreRequired: 0 },
        { id: 2, title: 'Beginner Baker', highScoreRequired: 10 },
        { id: 3, title: 'Advanced Artist', highScoreRequired: 20 },
        { id: 4, title: 'Pro Chef', highScoreRequired: 30 },
        { id: 5, title: 'Master Chef', highScoreRequired: 45 },
        { id: 6, title: 'The Basher', highScoreRequired: 50 },
        { id: 7, title: 'The "Rick" Friend', highScoreRequired: 55 },
        { id: 8, title: 'Hacker', highScoreRequired: 60 },
        { id: 9, title: 'Herobrine', highScoreRequired: 65 },
        { id: 10, title: 'Dr. Micheal Morbius', highScoreRequired: 70 },
        { id: 11, title: 'World Class Chef', highScoreRequired: 100 },
    ]

    const returnLoadingBar = (highScoreRequired) => {
        let percentage = (highScore / highScoreRequired) * 100;

        if (percentage > 100) {
            percentage = 100;
        }

        return (
            <View style={styles.loadingBarContainer}>
                <View style={[styles.loadingBar, { width: `${percentage}%` }]}></View>
            </View>
        )
    }

  return (
    <View style={[styles.doodleJumpScreen, styles.battlePassScreen]}>
      <Text style={[styles.battlePassTitle, { fontFamily: 'Pixel' }]}>Battle Pass</Text>
      <Text style={styles.battlePassSeason}>Season 1</Text>
      <Text style={styles.battlePassSubtitle}>Level up by upping your high score!</Text>
        <FlatList
        data={levels}
        style={styles.battlePassList}
        renderItem={({ item }) => (
            <View style={styles.battlePassItem} key={item.id}>
                <Text style={styles.battlePassItemTitle}>Level {item.id}: {item.title} </Text>
                {returnLoadingBar(item.highScoreRequired, item.id)}
            </View>
        )}
      />
        <TouchableOpacity style={styles.startButton} onPress={() => setMenuScreen()}>
            <Text style={styles.startButtonText}>BACK TO MENU</Text>
        </TouchableOpacity>
    </View>
  )
}