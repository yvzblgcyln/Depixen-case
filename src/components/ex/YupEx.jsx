import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const YupSchema = Yup.object().shape({
  first_name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
  last_name: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  email: Yup.string()
    .required("Requireddd")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email"),
});

export default function YupEx() {
  return (
    <div>
      <h1>Yup</h1>
      <Formik
        validationSchema={YupSchema}
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="f-col">
            <label htmlFor="first_name">First Name</label>
            {errors.first_name && touched.first_name && <span>{errors.first_name}</span>}
            <Field name="first_name" className={errors.first_name && "error"} placeholder="First Name" />

            <label htmlFor="last_name">Last Name</label>
            {errors.last_name && touched.last_name && <span>{errors.last_name}</span>}
            <Field name="last_name" className={errors.last_name && "error"} placeholder="Last Name" />

            <label htmlFor="email">Email</label>
            {errors.email && touched.email && <span>{errors.email}</span>}
            <Field name="email" type="email" className={errors.email && "error"} />

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
