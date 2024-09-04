import React from 'react';
import {View} from 'react-native';
import {Placeholder, PlaceholderLine, Fade} from 'rn-placeholder';
import {useTheme} from '../../../config/theme';

/**
 * loader for wishlist screen
 * @param {*} param0  props as parameter
 * @returns React Element
 */
const WishlistLoader = ({}) => {
  const colors = useTheme();
  return (
    <>
      <Placeholder Animation={Fade}>
        <View style={{paddingHorizontal: 16, paddingVertical: 13}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <PlaceholderLine
              style={{
                height: 270,
                width: '48%',
                marginBottom: 24,
                backgroundColor: colors.backgroundColor,
              }}
            />
            <PlaceholderLine
              style={{
                height: 270,
                width: '48%',
                marginBottom: 24,
                backgroundColor: colors.backgroundColor,
              }}
            />
          </View>
        </View>
      </Placeholder>
    </>
  );
};
export default WishlistLoader;
