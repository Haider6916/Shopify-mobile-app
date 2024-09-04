import {View} from 'react-native';
import React from 'react';
import {Text} from '..';
import styles from './styles';
import {Address} from '../../assets';
import { useSelector } from 'react-redux';
import { useTheme } from '../../config/theme';

const NoAddress = ({isSearch = true, searchedItem, searchFrom}) => {

  const colors = useTheme();

  const isDarkMode = useSelector(state => state.user.clientDarkMode);


  return (
    <View style={styles.main}>
      <View style={styles.emoji}>
        <Address />
      </View>

      <View style={styles.details}>
        <Text
          bold
          title3
          textAlign="center"
          style={{
            color: isDarkMode ? colors.highemphasis : colors.mediumemphasis,
          }}
        >{`No address yet.`}</Text>
        <Text
          regular
          body1
          lowemphasis
          textAlign="center"
        >{`Add it now, or simply add it when you order your first item!`}</Text>
      </View>
    </View>
  );
};

export default NoAddress;
