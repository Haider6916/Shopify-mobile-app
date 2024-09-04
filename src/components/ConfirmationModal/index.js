import React from 'react';
import {View, Modal, Pressable} from 'react-native';
import {styles} from './styles';
import {Text} from '..';
import {useTheme} from '../../config/theme';
import {useSelector} from 'react-redux';

/**
 * confirmation model component
 * @param param0 props accepted by this component
 * @returns React Component
 */
const ConfirmationModal = props => {
  const {
    visible,
    title,
    primaryText,
    secondaryText,
    primaryAction,
    secondaryAction,
  } = props;
  const colors = useTheme();
  const isDarkMode = useSelector(state => state.user.clientDarkMode);
  return (
    <Modal transparent={true} visible={visible}>
      <View
        style={[styles.centeredView, {backgroundColor: colors.primaryLight}]}
      >
        <View
          style={[styles.modalView, {backgroundColor: colors.backgroundColor}]}
        >
          <View style={[styles.modalText, {borderBottomColor: colors.faint}]}>
            <Text
              bold
              title3
              style={{
                color: isDarkMode ? colors.whiteColor : colors.highemphasis,
              }}
            >
              {title}
            </Text>
          </View>
          <View style={styles.buttonView}>
            <Pressable
              style={[styles.button, {borderRightColor: colors.faint}]}
              onPress={primaryAction}
            >
              <Text
                bold
                body1
                style={{
                  color: isDarkMode ? colors.whiteColor : colors.mediumemphasis,
                }}
              >
                {primaryText}
              </Text>
            </Pressable>
            <Pressable style={[styles.button2]} onPress={secondaryAction}>
              <Text bold body1 iserror>
                {secondaryText}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
