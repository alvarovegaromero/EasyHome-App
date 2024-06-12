import React from 'react';
import {Text, View} from 'react-native';
import stylesHeader from './stylesHeader';
import {Icon} from '@rneui/themed';
import useHeaderController from './hooks/useHeaderController';

interface HeaderProps {
  secctionText: string;
}

const Header: React.FunctionComponent<HeaderProps> = ({secctionText}) => {
  const {navigateBack} = useHeaderController();

  return (
    <View style={stylesHeader.containerHeader}>
      <Icon
        name="keyboard-backspace"
        type="material-community"
        size={35}
        color="white"
        style={stylesHeader.iconArrowBack}
        onPress={navigateBack}
      />
      <Text style={stylesHeader.styleTextHeader}>{secctionText}</Text>
    </View>
  );
};

export default Header;
