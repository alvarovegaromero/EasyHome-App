import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import useChoresHomeController from './hooks/useChoresHomeController';
import {Icon} from '@rneui/themed';
import generalStyles from '../../../../styles/styles';

const ChoresHomeScreen: React.FunctionComponent = () => {
  const {
    isOwner,
    isActivated,
    navigateEstablishChores,
    navigateViewTodaysChores,
    navigateStats,
    navigateGroupHome,
  } = useChoresHomeController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <View style={generalStyles.defaultContainerScreen}>
          <View style={generalStyles.defaultContainerHeader}>
            <Text style={generalStyles.defaultHeader}>Chores Home Screen</Text>
          </View>

          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 20,
            }}>
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
                <Text style={{marginBottom: 10, marginTop: 10, fontSize: 20}}>
                  {' '}
                  The owner must start the process first!{' '}
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

            <View>
              <Icon
                name="arrow-left-circle"
                reverse
                reverseColor="white"
                type="material-community"
                color="#2196F3"
                accessibilityLabel="Go back to Group Home Screen"
                onPress={navigateGroupHome}
                size={50}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChoresHomeScreen;
