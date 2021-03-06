import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import { Avatar, Input, Button } from 'react-native-elements';
import Icons from 'react-native-vector-icons/FontAwesome5';
import BGChange from '../../Helpers/Image/bgchange.png';
import key from '../../Helpers/Image/key.png';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { changePassword } from '../../Redux/actions/userDataAction';
import * as Yup from 'yup';
import CustomInputText from '../../Components/CustomInputText';
import CustomAlert from '../../Components/CustomAlert';
import Loader from '../../Components/Loader';

function ChangePassword(props) {
  const [hidePassword, setHidePassword] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();
  const FormChangePass = useFormik({
    initialValues: { old_password: '', new_password: '', confirm_password: '' },
    validationSchema: Yup.object({
      old_password: Yup.string().required('Passowrd is Required'),
      new_password: Yup.string().required('New Password is Required'),
      confirm_password: Yup.string().required('Confirm Password is Required'),
    }),
    onSubmit: async (values, form) => {
      setLoading(true);
      try {
        const response = await dispatch(changePassword(values));
        console.log('response', response.data);
        if (response && response.data.success) {
          CustomAlert(response.data.success, response.data.msg);
        } else {
          CustomAlert(response.data.success, response.data.msg);
        }
      } catch (err) {
        if (!(err.message === 'Network Error')) {
          if (err.response) {
            CustomAlert(err.response.data.success, err.response.data.msg);
          }
        }
        console.log('error', err);
      }
      setLoading(false);
    },
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
      {loading && <Loader loading={loading} setLoading={setLoading} />}
      <View style={style.container1}>
        <ImageBackground
          source={BGChange}
          style={{ width: '100%', height: '100%' }}
        >
          <TouchableOpacity
            style={{ width: 50, marginTop: 25 }}
            onPress={() => props.navigation.goBack()}
          >
            <Icons name="chevron-left" size={20} style={style.backIcon} />
          </TouchableOpacity>
        </ImageBackground>
        <View style={style.line} />
      </View>

      <View style={{ flex: 5 }}>
        <View>
          <Avatar
            rounded
            source={key}
            size={80}
            title=""
            containerStyle={style.avatar}
          />
          <ScrollView>
            <CustomInputText
              form={FormChangePass}
              name="old_password"
              placeholder="Old Password"
              secureTextEntry={hidePassword ? true : false}
              inputContainerStyle={{ ...style.input }}
              inputStyle={style.inputText}
              rightIcon={
                <TouchableOpacity
                  onPress={() => setHidePassword(!hidePassword)}
                >
                  <Icons
                    name={hidePassword ? 'eye-slash' : 'eye'}
                    size={15}
                    color="grey"
                  />
                </TouchableOpacity>
              }
            />
            <CustomInputText
              placeholder="New Password"
              form={FormChangePass}
              name="new_password"
              secureTextEntry={hidePassword ? true : false}
              inputContainerStyle={{ ...style.input }}
              inputStyle={style.inputText}
              rightIcon={
                <TouchableOpacity
                  onPress={() => setHidePassword(!hidePassword)}
                >
                  <Icons
                    name={hidePassword ? 'eye-slash' : 'eye'}
                    size={15}
                    color="grey"
                  />
                </TouchableOpacity>
              }
            />
            <CustomInputText
              placeholder="Confirm Password"
              form={FormChangePass}
              name="confirm_password"
              secureTextEntry={hidePassword ? true : false}
              inputContainerStyle={{ ...style.input }}
              inputStyle={style.inputText}
              rightIcon={
                <TouchableOpacity
                  onPress={() => setHidePassword(!hidePassword)}
                >
                  <Icons
                    name={hidePassword ? 'eye-slash' : 'eye'}
                    size={15}
                    color="grey"
                  />
                </TouchableOpacity>
              }
            />
            <View style={style.changeContainer}>
              <Button
                title="Reset Password"
                buttonStyle={style.changebtn}
                onPress={FormChangePass.handleSubmit}
                disabled={!FormChangePass.isValid}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container1: {
    flex: 2,
    flexDirection: 'row',
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111111',
    marginTop: -23,
    marginLeft: 80,
    marginBottom: 20,
  },
  backIcon: {
    color: '#2c2c2c',
    marginLeft: 15,
    width: 20,
  },
  line: {
    marginTop: 20,
    marginLeft: -200,
    marginRight: 50,
    borderBottomColor: '#e1e1e1',
    borderBottomWidth: 0,
    width: '87%',
    alignSelf: 'center',
  },
  avatar: {
    alignSelf: 'center',
    marginRight: 20,
    marginTop: -37,
    marginBottom: 20,
    borderWidth: 5,
    borderColor: '#f6f6f8',
    elevation: 4,
    backgroundColor: 'white',
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomWidth: 0,
    width: '80%',
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#eaeaea',
    paddingRight: 20,
  },
  inputText: {
    fontSize: 13,
    marginLeft: 20,
    color: '#525252',
  },
  changebtn: {
    marginTop: -10,
    marginBottom: 60,
    width: '75%',
    borderRadius: 10,
    backgroundColor: '#53C9BE',
    elevation: 4,
    alignSelf: 'center',
  },
  changeContainer: {
    marginTop: 30,
  },
});

export default ChangePassword;
