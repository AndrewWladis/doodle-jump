import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  arcadeSelectionScreen: {
    flex: 1,
    backgroundColor: '#141414'
  },
  arcadeSelectionScreenHeader: {
    fontSize: 22,
    fontWeight: '700',
    color: '#f0f0f0',
    marginTop: '20%',
    textAlign: 'center'
  },
  doodleJumpBar: {
    width: 80,
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
  gameDescription: {
    fontSize: 20,
    color: '#f0f0f0',
    marginTop: 2
  },
  gameItem: {
    margin: 10,
    width: '95%',
    alignSelf: 'center',
    padding: 15,
    borderRadius: 5
  },
  gameTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#f0f0f0'
  },
});

export default styles;