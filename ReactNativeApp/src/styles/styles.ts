import { StyleSheet } from 'react-native';

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
        fontSize: 24,
        fontWeight: 'bold',
    },
    defaultContainerHeader: {
        marginTop: 20,
        marginBottom: 20,
    },
    defaultContainerScreen: {
        marginLeft: 15,
        marginRight: 15,
    },
});

export default generalStyles;