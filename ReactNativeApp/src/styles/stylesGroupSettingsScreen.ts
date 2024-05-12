import { StyleSheet } from 'react-native';
import generalStyles from './styles';


const stylesGroupSettingsScreen = StyleSheet.create({
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
    listElement: {
        padding: 5,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    crownIconListElement: {
        height: 25,
        width: 25,
    },
    crossIconList: {
        height: 20,
        width: 20,
        marginLeft: 10,
        marginTop: 2,
    },
    textList: {
        fontSize: 20,
        marginRight: 10,
    },
    containerRow: {
        flexDirection: 'row',
    },
});

export default stylesGroupSettingsScreen;
