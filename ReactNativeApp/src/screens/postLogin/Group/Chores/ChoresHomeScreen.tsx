import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import useChoresHomeController from './hooks/useChoresHomeController';
import {Icon} from '@rneui/themed';
import generalStyles from '../../../../styles/styles';
import stylesChoresHomeScreen from '../../../../styles/stylesChoresHomeScreen';
import GroupFooter from '../../../../utils/GroupFooter/GroupFooter';
import Header from '../../../../utils/Header/Header';

const ChoresHomeScreen: React.FunctionComponent = () => {
  const {
    isOwner,
    isActivated,
    navigateEstablishChores,
    navigateViewTodaysChores,
    navigateStats,
  } = useChoresHomeController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <Header secctionText="Chores Home" />
        <View style={generalStyles.defaultContainerScreen}>
          <View style={stylesChoresHomeScreen.containerIcons}>
            {isOwner && (
              <View>
                <Icon
                  name="pencil"
                  reverse
                  reverseColor="white"
                  type="material-community"
                  color="#2196F3"
                  accessibilityLabel="Add and Edit task"
                  onPress={navigateEstablishChores}
                  size={50}
                />
              </View>
            )}

            {!isActivated && (
              <View>
                <Text style={stylesChoresHomeScreen.styleTextNoActivated}>
                  The owner must start the process first!
                </Text>
              </View>
            )}

            <View>
              <Icon
                name="calendar-today"
                reverse
                reverseColor="white"
                type="material-community"
                color="#2196F3"
                accessibilityLabel="See today's tasks"
                onPress={navigateViewTodaysChores}
                size={50}
                disabled={!isActivated}
              />
              <Icon
                name="chart-box"
                reverse
                reverseColor="white"
                type="material-community"
                color="#2196F3"
                accessibilityLabel="See stats"
                onPress={navigateStats}
                size={50}
                disabled={!isActivated}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <GroupFooter activeSection="Chores" />
    </SafeAreaView>
  );
};

export default ChoresHomeScreen;
