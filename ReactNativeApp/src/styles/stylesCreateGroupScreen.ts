import { StyleSheet } from 'react-native';
import generalStyles from './styles';


const stylesCreateGroupScreen = StyleSheet.create({
    containerScreen: {
        marginLeft: 15,
        marginRight: 15,
    },
    containerHeader: {
        marginTop: 20,
        marginBottom: 20,
    },
    containerInputs: {
        marginBottom: 20,
    },
    containerInputName: {
        marginBottom: 10,
    },
    containerInputDescription: {
        marginBottom: 10,
    },
    InputDescription: {
        ...generalStyles.defaultInput,
        textAlignVertical: 'top', 
        textAlign: 'left',
    },
    containerInputCurrency: {
        marginBottom: 10,
    },

});

export default stylesCreateGroupScreen; 