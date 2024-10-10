import { StatusBar } from 'expo-status-bar';
import { Text, View, FlatList } from 'react-native';
import DoodleJump from './DoodleJump';
import { useFonts } from 'expo-font';
import styles from './styles';

export default function App() {

  useFonts({
    'Pixel': require('./assets/DePixelHalbfett.ttf'),
  });

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
              title: 'Doodle Jump',
              description: 'Swipe to move from left to right, bounce on obstacles, and avoid falling below.',
              color: '#52c0f7'
            },
            { 
              key: '2', 
              title: 'Snake',
              description: 'Swipe to move the snake and eat food, but don\'t hit the walls or the snake\'s own body.',
              color: '#f576ca'
            },
            { 
              key: '3', 
              title: 'Tetris',
              description: 'Swipe to move the blocks and rotate them, but don\'t let them stack too high.',
              color: '#ca76f5'
            }
          ]}
          renderItem={({ item }) => (
            <View style={[styles.gameItem, { backgroundColor: item.color }]}>
              <Text style={[styles.gameTitle, { fontFamily: 'Pixel' }]}>{item.title}</Text>
              <Text style={styles.gameDescription}>{item.description}</Text>
            </View>
          )}
          contentContainerStyle={styles.gameList}
        />

      <StatusBar style='light' /> 
    </View>
  );
}