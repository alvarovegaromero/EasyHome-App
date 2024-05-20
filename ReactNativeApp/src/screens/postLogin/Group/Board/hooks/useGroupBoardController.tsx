import { useNavigation } from "@react-navigation/native";

const useGroupBoardController = () => {
    const navigation = useNavigation();

    const navigateGroupHome = () => {
        navigation.navigate('GroupHomeScreen' as never);
    }

    return {navigateGroupHome}
};

export default useGroupBoardController;
