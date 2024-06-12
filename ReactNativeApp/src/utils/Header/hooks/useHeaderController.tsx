import {useNavigation} from '@react-navigation/native';

const useHeaderController = () => {
  const navigation = useNavigation();

  const navigateBack = () => {
    navigation.goBack();
  };

  return {navigateBack};
};

export default useHeaderController;
