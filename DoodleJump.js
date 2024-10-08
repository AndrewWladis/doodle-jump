import { View, Animated, Text, Dimensions } from 'react-native';
import styles from './styles'
import { useState, useEffect, useRef } from 'react';

export default function DoodleJump() {
    const [isGameOver, setIsGameOver] = useState(false);
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
    const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
    const [score, setScore] = useState(0);
    const [barPositions, setBarPositions] = useState([[0, (.9 * (screenHeight - 90))], [0, (.7 * (screenHeight - 90))], [0, (.5 * (screenHeight - 90))], [0, (.3 * (screenHeight - 90))], [0, (.1 * (screenHeight - 90))]]);
    const [playerPosition, setPlayerPosition] = useState([(screenWidth / 2) - 25, (.6 * (screenHeight - 90))]);
    const backgroundColor = useRef(new Animated.Value(0)).current;
    const [playerJumpCounter, setPlayerJumpCounter] = useState(0);

    function jump() {
        setPlayerJumpCounter(prevCount => prevCount + 20);
    }

    useEffect(() => {
        setBarPositions(barPositions.map(([x, y]) => [Math.floor(Math.random() * (screenWidth - 110)) + 10, y]));

        // Animation loop that transitions between 0 and 1 for the color
        Animated.loop(
            Animated.sequence([
                Animated.timing(backgroundColor, {
                    toValue: 1, // Transition to full 1 (first color)
                    duration: 40000, // Duration for each transition in milliseconds (5 seconds)
                    useNativeDriver: false, // For color, useNativeDriver must be false
                }),
                Animated.timing(backgroundColor, {
                    toValue: 0, // Back to 0 (second color)
                    duration: 40000, // Another 5 seconds to revert back
                    useNativeDriver: false,
                }),
            ])
        ).start();
    }, []);

    useEffect(() => {
        const onChange = ({ window }) => {
          setScreenWidth(window.width);
        };
    
        const subscription = Dimensions.addEventListener('change', onChange);
    
        return () => subscription?.remove();
    }, []);

    useEffect(() => {
        const onChange = ({ window }) => {
            setScreenHeight(window.height);
        };
    
        const subscription = Dimensions.addEventListener('change', onChange);
    
        return () => subscription?.remove();
    }, []);

    useEffect(() => {
        const gameLoop = setInterval(() => {
            if (!isGameOver) {
                setBarPositions(prevPositions => prevPositions.map(([x, y]) => [x, y + 1]));
                setPlayerJumpCounter(prevCounter => {
                    if (prevCounter > 0) {
                        setPlayerPosition(prevPosition => [prevPosition[0], prevPosition[1] - 8]);
                        return prevCounter - 1;
                    } else {
                        setPlayerPosition(prevPosition => [prevPosition[0], prevPosition[1] + 2]);
                        return prevCounter;
                    }
                });
            }
        }, 30);

        return () => clearInterval(gameLoop);
    }, [isGameOver, playerJumpCounter]);

    useEffect(() => {
        if (playerPosition[1] >= (screenHeight * .88)) {
            setIsGameOver(true);
        }
        // Check for collision with bars
        barPositions.forEach(([barX, barY]) => {
            if (
                playerPosition[0] < barX + 100 &&
                playerPosition[0] + 50 > barX &&
                playerPosition[1] + 50 >= barY &&
                playerPosition[1] + 50 <= barY + 10
            ) {
                jump();
            }
        });
    }, [playerPosition]);

    useEffect(() => {
        if (barPositions[0][1] > (screenHeight * .88)) {
            setScore(score + 1);
            setBarPositions(prevPositions => {
                const newPositions = [...prevPositions];
                newPositions[0] = [Math.floor(Math.random() * (screenWidth - 90)) + 10, 0];
                return newPositions;
            });
        }
        if (barPositions[1][1] > (screenHeight * .88)) {
            setScore(score + 1);
            setBarPositions(prevPositions => {
                const newPositions = [...prevPositions];
                newPositions[1] = [Math.floor(Math.random() * (screenWidth - 90)) + 10, 0];
                return newPositions;
            });
        }
        if (barPositions[2][1] > (screenHeight * .88)) {
            setScore(score + 1);
            setBarPositions(prevPositions => {
                const newPositions = [...prevPositions];
                newPositions[2] = [Math.floor(Math.random() * (screenWidth - 90)) + 10, 0];
                return newPositions;
            });
        }
        if (barPositions[3][1] > (screenHeight * .88)) {
            setScore(score + 1);
            setBarPositions(prevPositions => {
                const newPositions = [...prevPositions];
                newPositions[3] = [Math.floor(Math.random() * (screenWidth - 90)) + 10, 0];
                return newPositions;
            });
        }
    }, [barPositions]);

    // Interpolate backgroundColor from 0 to 1 to colors
    const backgroundColorInterpolation = backgroundColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['#76caf5', '#1a1a1a'],
    });

    return (
        <Animated.View style={[styles.doodleJumpScreen, { backgroundColor: backgroundColorInterpolation }]}>
            <View style={styles.doodleJumpHeader}>
                <Text style={styles.doodleJumpScore}>SCORE: {score}</Text>
            </View>
            <View style={styles.doodleJumpGame}>
                <View style={[styles.doodleJumpPlayer, {
                    marginLeft: playerPosition[0],
                    marginTop: playerPosition[1]
                }]}></View>
                <View style={[styles.doodleJumpBar, {
                    marginLeft: barPositions[0][0],
                    marginTop: barPositions[0][1]
                }]}></View>
                <View style={[styles.doodleJumpBar, {
                    marginLeft: barPositions[1][0],
                    marginTop: barPositions[1][1]
                }]}></View>
                <View style={[styles.doodleJumpBar, {
                    marginLeft: barPositions[2][0],
                    marginTop: barPositions[2][1]
                }]}></View>
                <View style={[styles.doodleJumpBar, {
                    marginLeft: barPositions[3][0],
                    marginTop: barPositions[3][1]
                }]}></View>
                <View style={[styles.doodleJumpBar, {
                    marginLeft: barPositions[4][0],
                    marginTop: barPositions[4][1]
                }]}></View>
            </View>
        </Animated.View>
    )
}
