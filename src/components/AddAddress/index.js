import React from 'react';
import {ActivityIndicator, Pressable, View} from 'react-native';
import Text from '../Text';
import {useTheme} from '../../config/theme';
import {Plus} from '../../assets';
import styles from './styles';

/**
 * card component for Add Address Component
 * @param {*} param0  props as parameter
 * @returns React Element
 */
const AddAddress = ({onPress, loading}) => {
  const colors = useTheme();

  return (
    <View style={[styles.mainView, {backgroundColor: colors.lightGray}]}>
      {loading ? (
        <>
          <ActivityIndicator size="large" color={colors.primaryLight} />
        </>
      ) : (
        <>
          <Pressable
            onPress={onPress}
            style={[styles.innerView, {backgroundColor: colors.statusBarGray}]}
          >
            <Plus />
          </Pressable>
          <Text overline bold lowemphasis>{`ADD NEW ADDRESS`}</Text>
        </>
      )}
    </View>
  );
};

export default AddAddress;
