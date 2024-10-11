import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles';

export default function Tetris({ setMenuScreen }) {
  const [score, setScore] = useState(0);
  const [gameBoard, setGameBoard] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const blockTypes = [
    { shape: [[1, 1], [1, 1]], color: 'red' },
    { shape: [[1, 1, 1], [0, 1, 0]], color: 'blue' },
    { shape: [[0, 1, 0], [1, 1, 1]], color: 'green' },
    { shape: [[1, 0, 0], [1, 1, 1]], color: 'yellow' },
    { shape: [[0, 0, 1], [1, 1, 1]], color: 'purple' },
  ]

  function addBlock() {
    const randomIndex = Math.floor(Math.random() * blockTypes.length);
    const newBlock = {
      shape: blockTypes[randomIndex].shape,
      color: blockTypes[randomIndex].color,
    }
  }

  useEffect(() => {
    // Initialize the game board with empty cells
    const initializeBoard = () => {
      const newBoard = Array(20).fill().map(() => Array(10).fill(0));
      setGameBoard(newBoard);
    };

    // Call the initialization function
    initializeBoard();
  }, [])



  return (
    <View style={styles.tetrisScreen}>
        <Text style={[
            styles.tetrisScoreText, 
            { fontFamily: 'Pixel' }]}
        >
            Score: {score}
        </Text>
        <View style={styles.tetrisBoard}>
            {Array(20).fill().map((_, rowIndex) => (
                <View key={`row-${rowIndex}`} style={styles.tetrisRow}>
                    {Array(10).fill().map((_, colIndex) => (
                        <View key={`cell-${rowIndex}-${colIndex}`} style={styles.tetrisCell} />
                    ))}
                </View>
            ))}
        </View>
    </View>
  )
}