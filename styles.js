import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  battlePassItem: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0', 
    marginVertical: 10
  },
  battlePassItemTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#f0f0f0',
    marginVertical: 5,
    textAlign: 'center'
  },
  battlePassList: {
    width: '80%',
    maxHeight: '60%',
    alignSelf: 'center'
  },
  battlePassScreen: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  battlePassSeason: {
    fontSize: 22,
    fontWeight: '700',
    color: '#f0f0f0'
  },
  battlePassSubtitle: {
    fontSize: 18,
    color: '#f0f0f0',
    marginVertical: 5,
    fontWeight: '600'
  },
  battlePassTitle: {
    fontSize: 25,
    fontWeight: '700',
    color: '#f0f0f0',
    marginTop: 15
  },
  battlePassUnlockableItems: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 10 
  },
  battlePassUnlockableItemsTitle: {
    color: 'white',
    fontWeight: '700',
    marginBottom: 10,
    fontSize: 15
  },
  doodleJumpBar: {
    width: 80,
    height: 10,
    position: 'absolute',
    borderRadius: 5,
    marginHorizontal: 5
  },
  doodleJumpDisplayBar: {
    width: 80,
    height: 10,
    borderRadius: 5,
    marginTop: 15
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
    marginVertical: 5
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
  homeScreen: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  homeScreenTitle: {
    fontSize: 70,
    fontWeight: '700',
    color: '#f0f0f0',
    textAlign: 'center'
  },
  loadingBar: {
    height: 15,
    backgroundColor: 'white',
    maxWidth: '100%'
  },
  loadingBarContainer: {
    width: '80%',
    alignItems: 'flex-start',
    marginBottom: 10,
    overflow: 'hidden',
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 2
  },
  lockerCurrent: {
    width: '100%',
    borderBottomColor: 'white',
    borderBottomWidth: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    overflow: 'hidden',
    borderRadius: 15,
  },
  lockerPanel: {
    width: '90%',
    height: '75%',
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center'
  },
  newHighScoreText: {
    fontSize: 27,
    color: '#f0f0f0',
    marginVertical: 5,
    fontWeight: '800'
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
  secondaryButton: {
    borderRadius: 15,
    marginVertical: 5,
    borderColor: 'white',
    borderWidth: 3,
    width: '50%',
    alignItems: 'center'
  },
  secondaryButtonText: {
    fontSize: 22,
    fontWeight: '700',
    padding: 7,
    color: 'white',
    textAlign: 'center'
  },
  startButton: {
    borderRadius: 15,
    marginVertical: 20,
    backgroundColor: 'white',
    width: '50%',
    alignItems: 'center'
  },
  startButtonText: {
    fontSize: 22,
    fontWeight: '700',
    padding: 10,
    color: '#76caf5',
    textAlign: 'center'
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
  },
  playerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  }
});

export default styles;
