import React, {useRef} from 'react';
import {View} from 'react-native';
import Video from 'react-native-video';
import styles from './styles';
import {Text} from '..';

const VideoBanner = props => {
  const {uri, text, textColor, overlayColor} = props;
  const videoPlayer = useRef(null);

  return (
    <View>
      <Video
        repeat={true}
        paused={false}
        muted={true}
        resizeMode="contain"
        ref={videoPlayer}
        load={true}
        source={{
          uri: uri,
        }}
        style={[styles.mediaPlayer]}
      />
      <View
        style={[
          styles.txtFirstView,
          overlayColor && {
            backgroundColor: overlayColor,
            opacity: 0.5,
            borderRadius: 5,
          },
        ]}
      ></View>
      <View style={[styles.txtFirstView]}>
        <Text style={[styles.txt, {color: textColor}]} bold title4>
          {text}
        </Text>
      </View>
    </View>
  );
};

export default VideoBanner;
