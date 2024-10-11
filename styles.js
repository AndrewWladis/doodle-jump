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
  finalScoreText: {
    fontSize: 25,
    color: '#f0f0f0',
    marginVertical: 20
  },
  gameButton: {
    backgroundColor: '#141414',
    width: '40%',
    alignSelf: 'center',
    padding: 5,
    borderRadius: 15,
    marginTop: 10,
    borderWidth: 2,
    borderColor: 'white'
  },
  gameButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center'
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
  gameOverOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },
  gameOverText: {
    fontSize: 35,
    fontWeight: '700',
    color: '#f0f0f0'
  },
  gameTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#f0f0f0'
  },
  restartButton: {
    backgroundColor: '#52c0f7',
    borderRadius: 15,
    marginTop: 20
  },
  restartButtonText: {
    fontSize: 30,
    fontWeight: '700',
    padding: 10,
    color: 'white'
  },
  tetrisBoard: {
    aspectRatio: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tetrisCell: {
    width: 27,
    height: 27,
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: '#f0f0f0'
  },
  tetrisRow: {
    flexDirection: 'row'
  },
  tetrisScoreText: {
    fontSize: 27,
    color: '#f0f0f0',
    marginVertical: 20,
    fontWeight: '700'
  },
  tetrisScreen: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default styles;