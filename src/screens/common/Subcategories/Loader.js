import React from 'react';
import {View} from 'react-native';
import {Placeholder, PlaceholderLine, Fade} from 'rn-placeholder';
import {useTheme} from '../../../config/theme';
import styles from './styles';

/**
 * loader for products
 * @param {*} param0  props as parameter
 * @returns React Element
 */
const ProductsLoader = ({isSearch = false}) => {
  const colors = useTheme();
  return (
    <>
      <Placeholder Animation={Fade}>
        {isSearch && (
          <>
            <PlaceholderLine
              style={[
                styles.placeHolderLine1,
                {backgroundColor: colors.backgroundColor},
              ]}
            />
            <View style={styles.firstLoaderView}>
              <PlaceholderLine
                style={[
                  styles.placeHolderLine1,
                  {backgroundColor: colors.backgroundColor},
                ]}
              />
            </View>
          </>
        )}
        <View style={styles.secondLoaderView}>
          <View>
            <PlaceholderLine
              style={[
                styles.placeHolderLine2,
                {backgroundColor: colors.backgroundColor},
              ]}
            />
            <PlaceholderLine
              style={[
                styles.placeHolderLine3,
                {backgroundColor: colors.backgroundColor},
              ]}
            />
          </View>
          <View>
            <PlaceholderLine
              style={[
                styles.placeHolderLine2,
                {backgroundColor: colors.backgroundColor},
              ]}
            />
            <PlaceholderLine
              style={[
                styles.placeHolderLine3,
                {backgroundColor: colors.backgroundColor},
              ]}
            />
          </View>
        </View>

        <View style={styles.secondLoaderView}>
          <View>
            <PlaceholderLine
              style={[
                styles.placeHolderLine2,
                {backgroundColor: colors.backgroundColor},
              ]}
            />
            <PlaceholderLine
              style={[
                styles.placeHolderLine3,
                {backgroundColor: colors.backgroundColor},
              ]}
            />
          </View>
          <View>
            <PlaceholderLine
              style={[
                styles.placeHolderLine2,
                {backgroundColor: colors.backgroundColor},
              ]}
            />
            <PlaceholderLine
              style={[
                styles.placeHolderLine3,
                {backgroundColor: colors.backgroundColor},
              ]}
            />
          </View>
        </View>
      </Placeholder>
    </>
  );
};
export default ProductsLoader;
