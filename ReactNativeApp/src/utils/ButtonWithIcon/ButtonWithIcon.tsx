import React from 'react';
import useButtonWithIconController from './hooks/useButtonWithIconController';
import {Text, TouchableOpacity} from 'react-native';

interface ButtonWithIcon {
  title: string;
  onPress: () => void;
  accessibilityLabel: string;
  testID: string;
}

const ButtonWithIcon: React.FunctionComponent<ButtonWithIcon> = ({
  title,
  onPress,
  accessibilityLabel,
  testID,
}) => {
  const {} = useButtonWithIconController();

  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      style={{backgroundColor: 'blue'}}>
      <Text> {title} </Text>
    </TouchableOpacity>
  );
};

export default ButtonWithIcon;
