import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

const screenHeight = Dimensions.get('window').height;

const stylesGroupBoardScreen = StyleSheet.create({
  containerButtonAndBoard: {
    margin: 15,
  },

  containerBoardButton: {
    marginTop: 20,
    flexDirection: 'row',
  },

  containerBoard: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
    height: screenHeight * 0.6, //60% of the screen height. Relative to the screen height.
  },
});

export default stylesGroupBoardScreen;
