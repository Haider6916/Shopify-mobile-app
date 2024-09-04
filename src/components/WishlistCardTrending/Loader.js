import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

/**
 * loader for card component for home popular
 * @returns React Element
 */
const CardTrendingLoader = ({}) => {
  return (
    <>
      <SkeletonPlaceholder
        backgroundColor={'rgba(241, 241, 241, 1)'}
        highlightColor={'#F8F8F8'}
      >
        <SkeletonPlaceholder.Item
          height={280}
          width={'100%'}
          borderRadius={4}
        />
        <SkeletonPlaceholder.Item
          marginTop={6}
          width={'100%'}
          height={40}
          borderRadius={4}
        ></SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </>
  );
};

export default CardTrendingLoader;
