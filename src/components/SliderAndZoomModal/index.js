import React from 'react';
import {View, Modal, Pressable, Dimensions} from 'react-native';
import {styles} from './styles';
import {useTheme} from '../../config/theme';
import {Icon, Icons} from '..';
import ImageViewer from 'react-native-image-zoom-viewer';
import {useSelector} from 'react-redux';

const {height, width} = Dimensions.get('screen');

/**
 * model component for slider and zoom
 * @param param0 props accepted by this component
 * @returns React Component
 */
const SliderAndZoomModal = ({visible, images, primaryAction}) => {
  const colors = useTheme();
  const isDarkMode = useSelector(state => state.user.clientDarkMode);

  /** header component */
  const headerView = () => {
    return (
      <View
        style={[styles.headerIcons, {backgroundColor: colors.ButtonBackground}]}
      >
        <Pressable onPress={primaryAction}>
          <Icon
            name={Icons.CROSS}
            color={isDarkMode ? colors.blackColor : colors.lowemphasis}
            size={18}
          />
        </Pressable>
      </View>
    );
  };

  return (
    <Modal transparent={true} visible={visible}>
      <View
        style={[
          styles.centeredView,
          {
            backgroundColor: isDarkMode
              ? colors.backgroundColor
              : colors.highemphasis,
          },
        ]}
      >
        <View style={[styles.modalView]}>
          <View style={{height: height / 1.6, justifyContent: 'center'}}>
            {/* {images && (
              <Carousel
                autoplay
                autoplayTimeout={5000}
                loop
                index={0}
                pageSize={width}
              >
                {images.map((item, index) => {
                  return (
                    <View key={index.toString()}>
                      <Image
                        resizeMode={'stretch'}
                        style={{width: width, height: height / 1.6}}
                        source={{uri: item.url}}
                      />
                    </View>
                  );
                })}
              </Carousel>
            )} */}
            <ImageViewer
              imageUrls={images}
              renderIndicator={() => <></>}
              maxOverflow={0}
              saveToLocalByLongPress={false}
              renderFooter={(currentIndex, allSize) => (
                <View
                  style={{
                    width: width,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  {images.map((item, index) => {
                    return (
                      <View
                        key={index.toString()}
                        style={{
                          height: 12,
                          width: 12,
                          borderRadius: 6,
                          backgroundColor:
                            currentIndex === index
                              ? colors.mediumemphasis
                              : colors.whiteColor,
                          marginRight: 5,
                          borderWidth: 1,
                          borderColor:
                            currentIndex !== index
                              ? colors.bordercolor
                              : colors.primaryDark,
                          bottom: 17,
                        }}
                      />
                    );
                  })}
                </View>
              )}
            />
          </View>
        </View>
      </View>
      {headerView()}
    </Modal>
  );
};

export default SliderAndZoomModal;
