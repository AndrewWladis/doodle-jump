import { View, Animated, Text, Dimensions } from 'react-native';
import styles from './styles'
import { PanGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';
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
    const translateX = useRef(new Animated.Value(0)).current;
    const [isMovingRight, setIsMovingRight] = useState(false);
    const moveIntervalRef = useRef(null);

    function startMovingRight() {
        if (!isMovingRight) {
            setIsMovingRight(true);
            let steps = 0;
            const totalSteps = 40; // 10 steps over 250ms
            const stepDistance = 100; // Total distance to move

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
        const totalSteps = 40; // 10 steps over 250ms
        const stepDistance = -100; // Total distance to move, negative for left

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
        setPlayerJumpCounter(prevCount => prevCount + 16);
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
                if (playerJumpCounter < 20) {
                    jump();
                }
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
    </PanGestureHandler>
        </GestureHandlerRootView>
    )
}
