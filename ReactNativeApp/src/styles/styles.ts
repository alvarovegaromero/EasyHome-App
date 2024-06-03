import {StyleSheet} from 'react-native';

const generalStyles = StyleSheet.create({
  defaultSafeAreaView: {
    flex: 1, // Fill the entire screen vertically
  },
  defaultScrollView: {
    flexGrow: 1, // Allow vertical expansion (for scrolling) if needed
  },

  defaultContainerButton: {
    alignItems: 'center',
  },
  defaultButton: {
    width: 200,
  },
  defaultInput: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },

  defaultLateralMargins: {
    marginLeft: 40,
    marginRight: 40,
  },

  defaultContainerTextAndInput: {
    marginBottom: 10,
  },
  defaultHeader: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  defaultSubHeader: {
    marginBottom: 5,
    marginTop: 5,
    fontSize: 20,
  },
  defaultContainerHeader: {
    marginTop: 20,
    marginBottom: 10,
  },
  defaultContainerScreen: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
  },
  redColor: {
    color: '#FF9999',
  },
});

export default generalStyles;
