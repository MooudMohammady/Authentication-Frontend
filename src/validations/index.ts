import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
  phone_number_or_email: yup.string()
     .required('شماره موبایل یا ایمیل اجباری میباشند')
     .test('phone_number_or_email', 'شماره موبایل یا ایمیل معتبر نیست', (value) => {
        return validateEmail(value) || validatePhone(parseInt(value ?? '0'));
     }),
  // password: yup.string().required()
});

const validateEmail = (email: string | undefined) => {
  return yup.string().email().isValidSync(email)
};

const validatePhone = (phone: number | undefined) => {
  return yup.number().integer().positive().test(
     (phone) => {
       return (phone && phone.toString().length >= 8 && phone.toString().length <= 14) ? true : false;
     }
   ).isValidSync(phone);
};

export const Login_Password_Schema = yup.object().shape({
  password: yup.string().required('وارد کردن رمز عبور اجباری است').min(4)
})