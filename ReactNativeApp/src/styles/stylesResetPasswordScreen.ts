import { StyleSheet } from 'react-native';
import generalStyles from './styles';

const stylesLoginScreen = StyleSheet.create({
    containerInitialImage: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 250,
        height: 254, //as image is not a perfect square, height is not equal to width
    },

    textHeaderResetPassword: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20,
    },

    containerInputs: {
        ...generalStyles.defaultLateralMargins,
        flex: 0.3,
    },
    containerInputEmail: {
        marginBottom: 20,
    },


    containerOtherInfo: {
        ...generalStyles.defaultLateralMargins,
        flex: 0.4,
    },

    containerRegister: {
        alignItems: 'center',
        marginBottom: 20,
    },

    containerLogin: {
        alignItems: 'center',
        marginBottom: 20,
    },

    containerRegisterAndResetPassword: {
        flex: 0.3,
    },
});

export default stylesLoginScreen;
