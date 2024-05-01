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
    header: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    containerInputs: {
        marginBottom: 20,
    },
    containerInputName: {
    },
    containerInputDescription: {
    },
    InputDescription: {
        ...generalStyles.defaultInput,
        textAlignVertical: 'top', 
        textAlign: 'left',
    },
    containerInputCurrency: {
    },

});

export default stylesCreateGroupScreen; 