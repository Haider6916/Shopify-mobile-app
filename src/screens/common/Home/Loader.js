import React from 'react';
import {View} from 'react-native';
import {Placeholder, PlaceholderLine, Fade} from 'rn-placeholder';
import styles from './styles';
import {useTheme} from '../../../config/theme';

/**
 * loader for polpular products home
 * @param {*} param0  props as parameter
 * @returns React Element
 */
const HomeLoader = ({}) => {
  const colors = useTheme();
  return (
    <>
      <Placeholder Animation={Fade}>
        <View style={styles.firstLoaderView}>
          <PlaceholderLine
            style={[
              styles.placeHolderLine1,
              {backgroundColor: colors.backgroundColor},
            ]}
          />
          <PlaceholderLine
            style={[
              styles.placeHolderLine2,
              {backgroundColor: colors.backgroundColor},
            ]}
          />
        </View>
        <View style={styles.secondLoaderView}>
          <View>
            <PlaceholderLine
              style={[
                styles.placeHolderLine3,
                {backgroundColor: colors.backgroundColor},
              ]}
            />
            <PlaceholderLine
              style={[
                styles.placeHolderLine4,
                {backgroundColor: colors.backgroundColor},
              ]}
            />
          </View>
          <View>
            <PlaceholderLine
              style={[
                styles.placeHolderLine3,
                {backgroundColor: colors.backgroundColor},
              ]}
            />
            <PlaceholderLine
              style={[
                styles.placeHolderLine4,
                {backgroundColor: colors.backgroundColor},
              ]}
            />
          </View>
        </View>
      </Placeholder>
    </>
  );
};
export default HomeLoader;
