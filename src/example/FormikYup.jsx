import {ScrollView, StyleSheet, Text, View, Alert} from 'react-native';
import {Formik} from 'formik';
import {Input, Button, Toggle} from '@ui-kitten/components';
import * as Yup from 'yup';

const FormikYup = () => {
  const registerSchema = Yup.object().shape({
    name: Yup.string().required('Required Field'),
    surname: Yup.string().required('Required Field'),
    email: Yup.string()
      .required('Required Field')
      .email('Please enter a valid email address.!!'),
    phone: Yup.string()
      .required('Required Field')
      .min(11, 'Please enter at least 11 digits.!!')
      .max(13, 'Please enter a maximum 13 digits.!!'),
    password: Yup.string()
      .required('Zorunlu Alan')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,50}$/,
        'The conditions are not met.!!!!',
      ),
    passwordConfirm: Yup.string()
      .required('Required Field')
      .oneOf([Yup.ref('password')], 'Passwords do not match'),
    agrementConfirm: Yup.bool()
      .required('Required Field')
      .oneOf([true], 'You need to accept the terms and conditions.'),
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          padding: 20,
          backgroundColor: 'blue',
          minHeight: 90,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
          CREATE ACCOUNT
        </Text>
      </View>

      <View style={{flex: 1, padding: 10}}>
        <ScrollView>
          <Formik
            initialValues={{
              email: '',
              name: '',
              surname: '',
              phone: '',
              passwword: '',
              passwordConfirm: '',
              agrementConfirm: false,
            }}
            validationSchema={registerSchema}
            onSubmit={values =>
              Alert.alert('Form Değerleri', JSON.stringify(values, null, 2))
            }>
            {({handleChange, handleSubmit, values, setFieldValue, errors}) => (
              <View>
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.name}
                  label={'Name'}
                  placeholder="Enter your name..."
                  onChangeText={handleChange('name')}
                  status={errors.name ? 'danger' : 'basic'}
                  caption={errors.name}
                />
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.surname}
                  label={'Surname'}
                  placeholder="Enter your surname..."
                  onChangeText={handleChange('surname')}
                  status={errors.surname ? 'danger' : 'basic'}
                  caption={errors.surname}
                />
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.email}
                  label={'E-mail'}
                  placeholder="Enter your e-mail address..."
                  onChangeText={handleChange('email')}
                  status={errors.email ? 'danger' : 'basic'}
                  caption={errors.email}
                />

                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.phone}
                  label={'Phone'}
                  placeholder="Enter your phone number..."
                  onChangeText={handleChange('phone')}
                  status={errors.phone ? 'danger' : 'basic'}
                  caption={errors.phone}
                />

                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.passwword}
                  label={'Password'}
                  placeholder="Enter your password number..."
                  onChangeText={handleChange('password')}
                  status={errors.password ? 'danger' : 'basic'}
                  caption={errors.password}
                />
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.passwwordConfirm}
                  label={'Password-Confirm'}
                  placeholder="Re-enter your password..."
                  onChangeText={handleChange('passwordConfirm')}
                  status={errors.passwordConfirm ? 'danger' : 'basic'}
                  caption={errors.passwordConfirm}
                />

                <View>
                  <Toggle
                    checked={values.agrementConfirm}
                    onChange={value => setFieldValue('agrementConfirm', value)}>
                    I accept the User Agreement and Privacy Policy.
                  </Toggle>
                  {errors.agrementConfirm && (
                    <Text style={{color: 'red'}}>{errors.agrementConfirm}</Text>
                  )}
                </View>

                <Button
                  style={styles.button}
                  appearance="outline"
                  onPress={handleSubmit}
                  status="primary">
                  SAVE
                </Button>
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    </View>
  );
};

export default FormikYup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    margin: 2,
  },
  controlContainer: {
    borderRadius: 4,
    margin: 2,
    padding: 6,
    justifyContent: 'center',
    backgroundColor: '#3366FF',
  },
});
