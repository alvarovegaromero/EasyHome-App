import {useNavigation} from '@react-navigation/native';
import {GroupContext} from '../../../../../contexts/GroupContext';
import {useContext, useEffect} from 'react';

const useChoresHomeScreen = () => {
  const navigation = useNavigation();

  const {groupId, isOwner} = useContext(GroupContext);

  useEffect(() => {
    console.log(groupId); //avoid warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigateGroupHome = () => {
    navigation.navigate('GroupHomeScreen' as never);
  };

  return {isOwner, navigateGroupHome};
};

export default useChoresHomeScreen;
