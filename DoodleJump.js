import { View, Animated, Text, Dimensions, Image, TouchableOpacity, Modal } from 'react-native';
import styles from './styles'
import { PanGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useState, useEffect, useRef } from 'react';

export default function DoodleJump({ setMenuScreen }) {
    const [isGameOver, setIsGameOver] = useState(false);
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
    const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
    const [score, setScore] = useState(0);
    const [playerRotation, setPlayerRotation] = useState(0);
    const [barPositions, setBarPositions] = useState([[0, (.9 * (screenHeight - 90))], [0, (.7 * (screenHeight - 90))], [0, (.5 * (screenHeight - 90))], [0, (.3 * (screenHeight - 90))], [0, (.1 * (screenHeight - 90))]]);
    const [playerPosition, setPlayerPosition] = useState([(screenWidth / 2) - 25, (.6 * (screenHeight - 90))]);
    const [playerJumpCounter, setPlayerJumpCounter] = useState(0);
    const [isMovingRight, setIsMovingRight] = useState(false);
    const backgroundColor = useRef(new Animated.Value(0)).current;
    const translateX = useRef(new Animated.Value(0)).current;
    const moveIntervalRef = useRef(null);

    function startMovingRight() {
        if (!isMovingRight) {
            setIsMovingRight(true);
            let steps = 0;
            const totalSteps = 40;
            const stepDistance = (screenWidth / 2); // Total distance to move

            moveIntervalRef.current = setInterval(() => {
                if (steps < totalSteps) {
                    setPlayerPosition(prevPosition => [
                        prevPosition[0] + (stepDistance / totalSteps),
                        prevPosition[1]
                    ]);
                    steps++;
                } else {
                    clearInterval(moveIntervalRef.current);
                    setIsMovingRight(false);
                }
            }, 10); // 25ms * 10 steps = 250ms total
        }
    }

    function startMovingLeft() {
        if (!isMovingRight) {
            setIsMovingRight(true);
            let steps = 0;
            const totalSteps = 40;
            const stepDistance = -(screenWidth / 2); // Total distance to move, negative for left

            moveIntervalRef.current = setInterval(() => {
                if (steps < totalSteps) {
                    setPlayerPosition(prevPosition => [
                        Math.max(0, prevPosition[0] + (stepDistance / totalSteps)),
                        prevPosition[1]
                    ]);
                    steps++;
                } else {
                    clearInterval(moveIntervalRef.current);
                    setIsMovingRight(false);
                }
            }, 10); // 25ms * 10 steps = 250ms total
        }
    }

    const onGestureEvent = Animated.event(
        [{ nativeEvent: { translationX: translateX } }],
        { useNativeDriver: false }
    );
  
    const onHandlerStateChange = ({ nativeEvent }) => {
        if (nativeEvent.state === State.END) {
            // Detect the swipe direction by checking the translationX value
            if (nativeEvent.translationX > 50) {
                startMovingRight();
            } else if (nativeEvent.translationX < -50) {
                startMovingLeft();
            }
  
            // Reset the translationX after the gesture ends
            translateX.setValue(0);
        }
    };

    function jump() {
        if (playerJumpCounter < 20) {
            setPlayerJumpCounter(prevCount => prevCount + 18);
            setPlayerRotation(Math.floor(Math.random() * 45) - 23);
        }
    }

    // Interpolate backgroundColor from 0 to 1 to colors
    const backgroundColorInterpolation = backgroundColor.interpolate({
        inputRange: [0, 1, 2],
        outputRange: ['#76caf5', '#e8852e', '#1a1a1a'],
    });

    useEffect(() => {
        setBarPositions(barPositions.map(([x, y]) => [Math.floor(Math.random() * (screenWidth - 110)) + 10, y]));

        // Animation loop that transitions between 0 and 1 for the color
        Animated.loop(
            Animated.sequence([
                Animated.timing(backgroundColor, {
                    toValue: 0,
                    duration: 10000,
                    useNativeDriver: false,
                }),
                Animated.timing(backgroundColor, {
                    toValue: 1,
                    duration: 10000,
                    useNativeDriver: false,
                }),
                Animated.timing(backgroundColor, {
                    toValue: 2,
                    duration: 10000,
                    useNativeDriver: false,
                }),
                Animated.timing(backgroundColor, {
                    toValue: 0,
                    duration: 10000,
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

    useEffect(() => {
        return () => {
            if (moveIntervalRef.current) {
                clearInterval(moveIntervalRef.current);
            }
        };
    }, []);

    return (
        <>
        <Modal
            transparent={true}
            visible={isGameOver}
            animationType="fade"
        >
            <View style={styles.gameOverOverlay}>
                <Text style={styles.gameOverText}>GAME OVER</Text>
                <Text style={styles.finalScoreText}>FINAL SCORE: {score}</Text>
                <TouchableOpacity
                    style={styles.restartButton}
                    onPress={() => {
                        setIsGameOver(false);
                        setScore(0);
                        setPlayerPosition([screenWidth / 2 - 25, screenHeight * 0.7]);
                        setBarPositions([
                            [Math.floor(Math.random() * (screenWidth - 90)) + 10, screenHeight * 0.8],
                            [Math.floor(Math.random() * (screenWidth - 90)) + 10, screenHeight * 0.6],
                            [Math.floor(Math.random() * (screenWidth - 90)) + 10, screenHeight * 0.4],
                            [Math.floor(Math.random() * (screenWidth - 90)) + 10, screenHeight * 0.2],
                            [Math.floor(Math.random() * (screenWidth - 90)) + 10, 0]
                        ]);
                    }}
                >
                    <Text style={styles.restartButtonText}>RESTART</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={setMenuScreen}
                    style={styles.restartButton}
                >
                    <Text style={styles.restartButtonText}>BACK TO MENU</Text>
                </TouchableOpacity>
            </View>
        </Modal>
        <GestureHandlerRootView>
            <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onHandlerStateChange}
        >
            
            <Animated.View style={[styles.doodleJumpScreen, { backgroundColor: backgroundColorInterpolation }]}>
                <View style={styles.doodleJumpHeader}>
                    <Text style={styles.doodleJumpScore}>SCORE: {score}</Text>
            </View>
            <View style={styles.doodleJumpGame}>
                <View style={[styles.doodleJumpPlayer, {
                    marginLeft: playerPosition[0],
                    marginTop: playerPosition[1],
                    transform: [{ rotate: `${playerRotation}deg` }]
                }]}>
                    <Image source={require('./assets/burger.png')} />
                </View>
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
            </PanGestureHandler>
        </GestureHandlerRootView>
        </>
    );
}
