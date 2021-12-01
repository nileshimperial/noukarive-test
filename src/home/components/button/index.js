import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {t} from 'react-native-tailwindcss';

export const Button = (props) => {
  const {
    onPress,
    touchableStyle,
    textStyle,
    text = 'OK',
    disabled = false,
  } = props;

  const [isButtonClicked, toggleButtonClick] = useState(false);
  const isButtonDisabled = isButtonClicked || disabled;
  const opacityStyle = isButtonDisabled ? t.opacity75 : t.opacity100;

  return (
    <Pressable
      disabled={isButtonDisabled}
      android_ripple
      style={[styles.touchableStyle, touchableStyle, opacityStyle]}
      onPress={() => {
        toggleButtonClick(true);
        onPress(() => toggleButtonClick(false));
      }}>
      <View style={styles.defaultTextViewStyle}>
        {!!text && (
          <Text numberOfLines={2} style={[styles.textStyle, textStyle]}>
            {isButtonClicked ? 'Sending Email...' : text}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = {
  touchableStyle: [t.pX12, t.h12, t.bgRed900, t.itemsCenter, t.justifyCenter, t.selfCenter, t.mB5, t.mT4],
  textStyle: [t.textWhite, t.text2xl, t.textCenter, t.fontBold],
  defaultTextViewStyle: [t.flexRow, t.itemsCenter],
};
