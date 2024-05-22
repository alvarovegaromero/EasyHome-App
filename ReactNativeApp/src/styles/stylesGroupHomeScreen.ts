import { StyleSheet } from 'react-native';
import generalStyles from './styles';


const stylesGroupSettingsScreen = StyleSheet.create({
    headerText: {
        ...generalStyles.defaultHeader,
        marginTop: 20,
        marginBottom: 20,
    },
    containerButtons: {
        marginTop: 20,
    },
    containerButton: {
        ...generalStyles.defaultContainerButton,
        marginTop: 15,
        marginBottom: 15,
    },
});

export default stylesGroupSettingsScreen;
