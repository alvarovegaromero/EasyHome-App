import { StyleSheet } from 'react-native';

const stylesLoginScreen = StyleSheet.create({
    containerInitialImage: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    },
    logo: {
        width: 250,
        height: 250,
    },

    containerLoginInputs: {
        backgroundColor: 'yellow',
        marginLeft: 40,
        marginRight: 40,
        flex: 0.2,
        //justifyContent: 'center',
        //alignItems: 'center',
    },
    containerInputUsername: {
        //backgroundColor: 'blue',
        marginBottom: 20,
    },
    containerInputPassword: {
        //backgroundColor: 'green',
        marginBottom: 30,
    },
    inputUsername: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
    },
    inputPassword: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
    },

    containerOtherInfo: {
        flex: 0.6,
        backgroundColor: 'green',
    },
});

export default stylesLoginScreen;
