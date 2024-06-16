import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import useChoresHomeController from './hooks/useChoresHomeController';
import {Icon} from '@rneui/themed';
import generalStyles from '../../../../styles/styles';
import stylesGroupHomeScreen from '../../../../styles/stylesGroupHomeScreen';
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
          <View style={stylesGroupHomeScreen.containerButtons}>
            {isOwner && (
              <View style={stylesGroupHomeScreen.containerButton}>
                <Icon
                  name="pencil"
                  reverse
                  reverseColor="white"
                  type="material-community"
                  color="#2196F3"
                  accessibilityLabel="Add and Edit task"
                  onPress={navigateEstablishChores}
                  size={55}
                />
              </View>
            )}

            {!isActivated && (
              <View>
                <Text style={stylesGroupHomeScreen.styleTextStartProcessError}>
                  The owner must start the process first!
                </Text>
              </View>
            )}

            <View style={stylesGroupHomeScreen.containerButton}>
              <Icon
                name="calendar-today"
                reverse
                reverseColor="white"
                type="material-community"
                color="#2196F3"
                accessibilityLabel="See today's tasks"
                onPress={navigateViewTodaysChores}
                size={55}
                disabled={!isActivated}
              />
            </View>
            <View style={stylesGroupHomeScreen.containerButton}>
              <Icon
                name="chart-box"
                reverse
                reverseColor="white"
                type="material-community"
                color="#2196F3"
                accessibilityLabel="See stats"
                onPress={navigateStats}
                size={55}
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
