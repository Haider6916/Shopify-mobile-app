import React from 'react';
import {Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useTheme } from '../../../config/theme';

const height = Dimensions.get('window').height;

/**
 * loader for product detail
 * @param {*} param0  props as parameter
 * @returns React Element
 */
const ProductDetailLoader = ({}) => {
  const colors = useTheme();
  return (
    <>
      <SkeletonPlaceholder
        backgroundColor={colors.lightGray}
        // highlightColor={'#F8F8F8'}>
        highlightColor={colors.backgroundColor}>
        <SkeletonPlaceholder.Item
          height={height / 1.7}
          width={'100%'}
          borderRadius={4}
        />
        <SkeletonPlaceholder.Item
          marginTop={20}
          width={'100%'}
          height={100}
          borderRadius={4}
        />
        <SkeletonPlaceholder.Item
          marginTop={20}
          width={'100%'}
          height={60}
          borderRadius={4}
        />
        <SkeletonPlaceholder.Item
          marginTop={20}
          width={'100%'}
          height={100}
          borderRadius={4}
        />

        <SkeletonPlaceholder.Item
          marginTop={18}
          width={'100%'}
          height={100}
          borderRadius={4}
        />
      </SkeletonPlaceholder>
    </>
  );
};

export default ProductDetailLoader;
