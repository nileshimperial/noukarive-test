import React, {useEffect, useState} from 'react';
import {TextInput, Keyboard} from 'react-native';
import {color, t} from 'react-native-tailwindcss';

export const TextField = (props) => {
  const {
    showEyeIcon,
    value,
    multiline,
    placeholder,
    onChangeText = () => {},
    style,
    placeholderTextColor = color.white,
    alignment = t.alignCenter,
    fieldRelations = {},
    keyboardType = 'default',
    field = '',
    contextMenuHidden = false,
    maxLength = 200,
    getRef = () => {},
    allRefs = {},
    disabled = false,
    onFocus = () => {},
  } = props;
  const [textValue, setTextValue] = useState(value);

  const fieldRelationLength = Object.keys(fieldRelations).length;
  const getKeyboardType = () => {
    switch (field) {
      case 'email':
        return 'email-address';
      default:
        return keyboardType;
    }
  };

  useEffect(() => {
    setTextValue(value);
  }, [value]);

  return (
    <TextInput
      multiline={multiline}
      placeholder={placeholder}
      onChange={event => {
        const {text} = event.nativeEvent;
        setTextValue(text);
        onChangeText(text);
      }}
      ref={ref => getRef(ref)}
      blurOnSubmit={!fieldRelationLength > 0}
      secureTextEntry={showEyeIcon && hideText}
      style={[styles.textInputStyle, style, disabled ? t.bgGray400 : t.bgWhite]}
      value={textValue}
      textAlignVertical={alignment.textAlignVertical}
      placeholderTextColor={placeholderTextColor}
      returnKeyType={fieldRelationLength > 0 ? 'next' : 'done'}
      onSubmitEditing={() => {
        console.log()
        if (fieldRelationLength > 0)
          if (fieldRelations[field] !== 'done')
            allRefs &&
              allRefs[fieldRelations[field]] &&
              allRefs[fieldRelations[field]].focus();
          else {
            Keyboard.dismiss();
          }
      }}
      onFocus={onFocus}
      autoCapitalize="none"
      keyboardType={getKeyboardType()}
      contextMenuHidden={contextMenuHidden}
      maxLength={maxLength}
      editable={!disabled}
    />
  );
};

const styles = {
  textInputStyle: [
    t.borderGray300,
    t.borderDir,
    t.borderSolid,
    t.roundedDirLg,
    t.pL4,
    t.wFull,
    t.textBlack,
    t.bgWhite,
    t.alignCenter,
    t.justifyCenter,
    t.mY3,
  ],
};
