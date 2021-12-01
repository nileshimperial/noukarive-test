import React from 'react';
import {View, Text} from 'react-native';
import {color, t} from 'react-native-tailwindcss';
import {Button} from './components/button';
import {TextField} from './components/text-field';
import {sendEmailApi} from './service';

const fields = {
  whom: {
    placeHolder: 'To Whom',
    disable: text => !text,
  },
  subject: {
    placeHolder: 'Enter Subject',
    disable: text => !text,
  },
  message: {
    placeHolder: 'Enter Message',
    height: t.h40,
    textAlignVertical: t.alignTop,
    paddingTop: t.pT2,
    disable: text => text.length < 3,
    multiline: true
  },
};

const fieldRelations = {
  whom: "subject",
  subject: "message",
  message: "done"
}

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      whom: '',
      subject: '',
      apiMessage: '',
      isSending: false,
      message: '',
    };
  }

  validateButton = () => {
    const fieldKeys = Object.keys(fields);
    let isDisabled = false;

    fieldKeys.forEach(element => {
      if (fields[element].disable(this.state[element])) {
        isDisabled = true;
      }
    });

    return isDisabled;
  };

  allRefs = {};



  render() {
    const {apiMessage, isSending} = this.state;
    const fieldKeys = Object.keys(fields);
    return (
      <View style={styles.styles}>
        <Text style={styles.testEmailTextStyle}>Test Email</Text>
        <Text style={styles.apiMessageTextStyle}>{apiMessage}</Text>
        <View style={styles.textFieldsViewStyle}>
          {fieldKeys.map(fieldKey => {
            const placeHolder = fields[fieldKey].placeHolder;
            const height = fields[fieldKey].height || t.h12;
            const paddingTop = fields[fieldKey].paddingTop || t.pT0;
            const alignment =
              fields[fieldKey].textAlignVertical || t.alignCenter;
            return (
              <TextField
                key={`search_field_${fieldKey}`}
                value={this.state[fieldKey]}
                placeholder={placeHolder}
                placeholderTextColor={color.black}
                onChangeText={text => this.updateState(fieldKey, text)}
                multiline={fields[fieldKey].multiline}
                alignment={alignment}
                style={[paddingTop, height]}
                disabled={isSending}
                allRefs={this.allRefs}
                getRef={(ref) => {
                  this.allRefs[fieldKey] = ref;
                }}
                fieldRelations={fieldRelations}
                field={fieldKey}
              />
            );
          })}
        </View>

        <Button
          onPress={this.sendEmail}
          text="Send"
          disabled={this.validateButton()}
        />
      </View>
    );
  }

  resetState = () => {
    this.setState({
      whom: '',
      subject: '',
      isSending: false,
      message: '',
    });
  };

  sendEmail = callback => {
    this.updateState('isSending', true);
    const {whom, subject, message} = this.state;
    sendEmailApi({
      to: whom,
      subject,
      message,
    })
      .then(response => this.handleSuccess(response, callback))
      .catch(error => this.handleError(error, callback));
  };

  updateState = (key, value) => {
    this.setState({
      [key]: value,
      apiMessage: '',
    });
  };

  handleSuccess = (response, callback) => {
    if (response?.messageId) {
      this.setState(
        {
          apiMessage: 'Email sent successfully',
        },
        () => {
          callback();
          this.resetState();
        },
      );
    }
  };

  handleError = (error, callback) => {
    const {response = {}} = error;
    const {data: {message = ''} = {}} = response;
    this.setState(
      {
        isSending: false,
        apiMessage: message,
      },
      callback,
    );
  };
}

const styles = {
  wrapper: t.flex1,
  testEmailTextStyle: [t.text2xl, t.textCenter, t.mT4, t.textBlack],
  apiMessageTextStyle: [
    t.textBase,
    t.textCenter,
    t.mt2,
    t.textGreen900,
    t.fontBold,
  ],
  textFieldsViewStyle: [t.flex1, t.pX5, t.my6],
};

export default HomeScreen;
