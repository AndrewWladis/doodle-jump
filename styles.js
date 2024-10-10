import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  doodleJumpBar: {
    width: 70,
    height: 10,
    backgroundColor: 'white',
    position: 'absolute',
    borderRadius: 5,
    marginHorizontal: 5
  },
  doodleJumpGame: {
    flex: 1,
  },
  doodleJumpHeader: {
    height: '12%',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  doodleJumpPlayer: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    borderRadius: 5
  },
  doodleJumpScore: {
    fontSize: 30,
    fontWeight: '700',
    color: '#f0f0f0'
  },
  doodleJumpScreen: {
    flex: 1,
    backgroundColor: '#76caf5'
  },
});

export default styles;