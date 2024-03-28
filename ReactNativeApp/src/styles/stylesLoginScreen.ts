import { StyleSheet } from 'react-native';

const stylesLoginScreen = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        //height: '40%',
        backgroundColor: 'lightblue', 
    },

    containerInitialImage: {
        flex: 0.5,
    },
    containerLoginInputs: {
        flex: 0.2,
    },
    containerOtherInfo: {
        flex: 0.3,
    },
});

export default stylesLoginScreen;
