import * as Yup from "yup";

const validationSchema = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(3).required(),
});

export default validationSchema;
