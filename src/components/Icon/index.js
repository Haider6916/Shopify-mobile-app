import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import styles from './styles';

const Index = ({
  style = {},
  enableRTL = false,
  name,
  type = 'FontAwesome',
  ...rest
}) => {
  const layoutStyle = enableRTL ? styles.styleRTL : {};
  if (type === 'FontAwesome') {
    return (
      <Icon
        name={name}
        style={StyleSheet.flatten([style, layoutStyle])}
        {...rest}
      />
    );
  } else if (type === 'MaterialCommunity') {
    return (
      <MaterialIcon
        name={name}
        style={StyleSheet.flatten([style, layoutStyle])}
        {...rest}
      />
    );
  } else if (type === 'MaterialCommunityIcons') {
    return (
      <MaterialCommunityIcons
        name={name}
        style={StyleSheet.flatten([style, layoutStyle])}
        {...rest}
      />
    );
  } else if (type === 'Entypo') {
    return (
      <Entypo
        name={name}
        style={StyleSheet.flatten([style, layoutStyle])}
        {...rest}
      />
    );
  } else if (type === 'Octicons') {
    return (
      <Octicons
        name={name}
        style={StyleSheet.flatten([style, layoutStyle])}
        {...rest}
      />
    );
  } else {
    return (
      <AntDesign
        name={name}
        style={StyleSheet.flatten([style, layoutStyle])}
        {...rest}
      />
    );
  }
};

export default Index;
