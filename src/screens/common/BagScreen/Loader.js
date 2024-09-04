import React from 'react';
import {View} from 'react-native';
import {Placeholder, PlaceholderLine, Fade} from 'rn-placeholder';
import {useTheme} from '../../../config/theme';
import styles from './styles';

/**
 * loader for faq screen
 * @param {*} param0  props as parameter
 * @returns React Element
 */
const BagLoader = ({isSearch}) => {
  const colors = useTheme();
  return (
    <>
      <Placeholder Animation={Fade}>
        <View style={{paddingHorizontal: 16, marginVertical: 30}}>
          {isSearch && <PlaceholderLine style={styles.placeHolderLine1} />}
          <PlaceholderLine
            style={{
              height: 100,
              width: '100%',
              marginBottom: 24,
              backgroundColor: colors.backgroundColor,
            }}
          />
          <PlaceholderLine
            style={{
              height: 100,
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
export default BagLoader;
