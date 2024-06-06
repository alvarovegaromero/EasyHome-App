import {Text, View} from 'react-native';
import useEstablishChoresController from './hooks/useEstablishChoresController';

const ChoresHomeScreen: React.FunctionComponent = () => {
  const {} = useEstablishChoresController();

  return (
    <View>
      <Text>Establish Chores Screen</Text>
    </View>
  );
};

export default ChoresHomeScreen;
