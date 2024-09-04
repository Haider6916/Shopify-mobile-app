import React from 'react';
import {View} from 'react-native';
import {Placeholder, PlaceholderLine, Fade} from 'rn-placeholder';
import {useTheme} from '../../../config/theme';

/**
 * loader for address book
 * @param {*} param0  props as parameter
 * @returns React Element
 */
const AddressLoader = ({}) => {
  const colors = useTheme();
  return (
    <>
      <Placeholder Animation={Fade}>
        <View style={{paddingHorizontal: 16}}>
          <PlaceholderLine
            style={{
              height: 183,
              width: '100%',
              marginBottom: 24,
              backgroundColor: colors.backgroundColor,
            }}
          />
          <PlaceholderLine
            style={{
              height: 183,
              width: '100%',
              marginBottom: 24,
              backgroundColor: colors.backgroundColor,
            }}
          />
          <PlaceholderLine
            style={{
              height: 183,
              width: '100%',
              marginBottom: 24,
              backgroundColor: colors.backgroundColor,
            }}
          />
        </View>
      </Placeholder>
    </>
  );
};
export default AddressLoader;
