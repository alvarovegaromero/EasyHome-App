import { StyleSheet } from 'react-native';
import generalStyles from './styles';

const stylesLoginScreen = StyleSheet.create({
    containerRegisterInputsAndButton: {
        ...generalStyles.defaultLateralMargins,
        marginTop: 20,
        marginBottom: 100,
    },

    containerRegisterInputs: {
        marginBottom: 20,
    },

    containerOtherInfo: {
        ...generalStyles.defaultLateralMargins,
    },

});

export default stylesLoginScreen;