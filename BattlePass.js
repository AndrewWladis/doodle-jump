import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import levels from './Levels';
import { skins, barStyles } from './Skins';


export default function BattlePass({ setMenuScreen, highScore, locker, setLocker }) {
    
    const returnLoadingBar = (highScoreRequired, unlockableItems) => {
        let percentage = (highScore / highScoreRequired) * 100;

        if (percentage >= 100 && (!locker.includes(unlockableItems[0]) || !locker.includes(unlockableItems[1]))) {
            return (
                <TouchableOpacity
                style={styles.unlockButton}
                onPress={() => {
                    unlockableItems.forEach(unlockable => {
                        if (unlockable.type === "skin") {
                            setLocker(prevLocker => [...prevLocker, skins[unlockable.name]]);
                        } else if (unlockable.type === "bar") {
                            setLocker(prevLocker => [...prevLocker, barStyles[unlockable.name]]);
                        }
                    });
                }}
            >
                <Text style={styles.unlockButtonText}>Tap to Unlock Items</Text>
            </TouchableOpacity>
            )
        } else if (percentage >= 100 && locker.includes(unlockableItems[0]) && locker.includes(unlockableItems[1])) {
            return (
                <View style={styles.loadingBarContainer}>
                    <View style={[styles.loadingBar, { width: '10%' }]}></View>
                </View>
            )
        } else {
            return (
                <View style={styles.loadingBarContainer}>
                    <View style={[styles.loadingBar, { width: `${percentage}%` }]}></View>
                </View>
            )
        }
        
    }

    const returnImageFromName = (name) => {
        return (
            skins[name].image
        )
    }

    const returnUnlockableItems = (unlockableItems) => {
        return (
            <View style={styles.battlePassUnlockableItems}>
                {unlockableItems.map((item, index) => (
                    item.type === "bar" ? (
                        <View key={index} style={[styles.doodleJumpDisplayBar, barStyles[item.name].style]} />
                    ) : (
                        returnImageFromName(item.name)
                    )
                ))}
            </View>
        )
    }

  return (
    <View style={[styles.doodleJumpScreen, styles.battlePassScreen]}>
      <Text style={[styles.battlePassTitle, { fontFamily: 'Pixel' }]}>Battle Pass</Text>
      <Text style={styles.battlePassSeason}>Season 1: Beginnings</Text>
      <Text style={styles.battlePassSubtitle}>Level up by upping your high score!</Text>
        <FlatList
            data={levels}
            style={styles.battlePassList}
            renderItem={({ item }) => (
                <View style={styles.battlePassItem} key={item.id}>
                    <Text style={styles.battlePassItemTitle}>Level {item.id}: {item.title} </Text>
                    {returnLoadingBar(item.highScoreRequired, item.unlockableItems)}
                    <Text style={styles.battlePassUnlockableItemsTitle}>Unlockable items:</Text>
                    <View style={styles.battlePassUnlockableItems}>
                        {returnUnlockableItems(item.unlockableItems)}
                    </View>
                </View>
            )}
        />
        <TouchableOpacity style={styles.startButton} onPress={() => setMenuScreen()}>
            <Text style={styles.startButtonText}>BACK TO MENU</Text>
        </TouchableOpacity>
    </View>
  )
}
