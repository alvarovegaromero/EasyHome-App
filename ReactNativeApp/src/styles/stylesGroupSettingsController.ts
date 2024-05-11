import { StyleSheet } from 'react-native';
import generalStyles from './styles';


const stylesGroupSettingsController = StyleSheet.create({
    containerUsersPart: {
        ...generalStyles.defaultContainerHeader,
    },
    containerUsers: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,        
        height: 300,
        paddingTop: 12,
    },
    containerButtons: {
    },
    containerButton: {
        ...generalStyles.defaultContainerButton,
        marginTop: 5,
        marginBottom: 10,
    },
    listButton: {
        padding: 2,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        height: 40,
    },
    contentListButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ownerCrownIconList: {
        height: 25,
        width: 25,
    },
    crossIconList: {
        height: 20,
        width: 20,
    },
    textList: {
        fontSize: 20,
        marginRight: 10,
    },
});

export default stylesGroupSettingsController;
