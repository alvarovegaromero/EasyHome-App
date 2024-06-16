import React from 'react';
import useButtonWithIconController from './hooks/useButtonWithIconController';
import {Text, TouchableOpacity} from 'react-native';
import {Icon} from '@rneui/base';
import stylesButtonWithIcon from './stylesButtonWithIcon';

interface ButtonWithIcon {
  title: string;
  onPress: () => void;
  accessibilityLabel: string;
  testID: string;
  name: string;
}

const ButtonWithIcon: React.FunctionComponent<ButtonWithIcon> = ({
  title,
  onPress,
  accessibilityLabel,
  testID,
  name,
}) => {
  const {} = useButtonWithIconController();

  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      style={stylesButtonWithIcon.containerButtonWithIcon}>
      <Text style={stylesButtonWithIcon.textButtonWithIcon}> {title} </Text>
      <Icon name={name} type="material-community" color="white" size={20} />
    </TouchableOpacity>
  );
};

export default ButtonWithIcon;
