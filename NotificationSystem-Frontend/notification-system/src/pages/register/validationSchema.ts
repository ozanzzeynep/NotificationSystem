import * as yup from "yup";

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#$%]).{8,24}$/;
//min 8 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit

export const validationSchema = yup.object().shape({
  nameSurname: yup.string().required("Enter your first name"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(8)
    .matches(passwordRules, {
      message: "Please create a stronger password",
    })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Required"),
});


