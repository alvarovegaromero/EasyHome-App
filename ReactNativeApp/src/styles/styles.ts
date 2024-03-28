import { StyleSheet } from 'react-native';

const generalStyles = StyleSheet.create({
    defaultSafeAreaView: {
        flex: 1, // Fill the entire screen vertically
    },
    defaultScrollView: {
        flexGrow: 1, // Allow vertical expansion (for scrolling) if needed
    },
});

export default generalStyles;