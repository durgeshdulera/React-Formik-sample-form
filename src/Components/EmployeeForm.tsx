import { Formik, Field, Form, ErrorMessage, validateYupSchema } from "formik";
import * as Yup from "yup";
import Select from "react-select";



type colorSelect = {
  color: string;
  value: number;
};

const EmployeeForm: React.FC<{}> = (): JSX.Element => {
  const options = [
  
    { value: "1", label: "ASP.NET CORE" },
    { value: "2", label: "NODE.JS" },
    { value: "3", label: "REACT" },
    { value: "4", label: "ANGULAR" },
    { value: "5", label: "TYPESCRIPT" },
    { value: "6", label: "WEB API" },
  ];

  const multiselectoption = Yup.object({
    value: Yup.string().required("Required"),
    label: Yup.string().required("Required"),
  });



  //Form Fields
  const initialValues = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    color: "",
    colors: [],
    acceptTerms: false,
   
  };

  //Error Function
  const EmployeeFormSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("First name is required."),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Last name is required."),
    email: Yup.string()
      .email("The email field is invalid format.")
      .required("The email is required."),
    color: Yup.number()
      .required("The color is required.")
      .min(1, "The color is required."),
    colors: Yup.array()
      .of(multiselectoption)
      .min(1, "Must have at least one color")
      .max(2, "That is too many colors"),
    acceptTerms: Yup.bool().oneOf(
      [true],
      "Accept Terms & Conditions is required"
    )
  });

  //Formik
  return (
    <div>
      <div className="p-3 mb-2 bg-success text-white  text-center">
        <h5>Employee Form</h5>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={EmployeeFormSchema}
        onSubmit={(values, { setSubmitting }) => {
          const payload = {
            ...values,
            color: values.color,
            colors: values.colors
          };
          console.log(payload);
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
          isSubmitting,
          getFieldProps,
          setFieldValue,
          setFieldTouched,
          
          errors,
          touched,
        }) => (
          <Form>
            <div className="form-group">
              <label
                htmlFor="exampleFormControlInput1"
                style={{ fontWeight: "bolder" }}
              >
                First Name
              </label>
              <Field
                name="firstName"
                className="form-control"
                placeholder="First Name"
              />
              <ErrorMessage name="firstName">
                {(msg) => (
                  <div style={{ color: "red", textAlign: "left" }}>{msg}</div>
                )}
              </ErrorMessage>
            </div>

            <div className="form-group">
              <label
                htmlFor="exampleFormControlSelect1"
                style={{ fontWeight: "bolder" }}
              >
                Last Name
              </label>
              <Field
                name="lastName"
                className="form-control"
                placeholder="Last Name"
              />
              <ErrorMessage name="lastName">
                {(msg) => (
                  <div style={{ color: "red", textAlign: "left" }}>{msg}</div>
                )}
              </ErrorMessage>
            </div>

            <div className="form-group">
              <label
                htmlFor="exampleFormControlSelect2"
                style={{ fontWeight: "bolder" }}
              >
                Email
              </label>
              <Field
                name="email"
                className="form-control"
                placeholder="Email"
              />
              <ErrorMessage name="email">
                {(msg) => (
                  <div style={{ color: "red", textAlign: "left" }}>{msg}</div>
                )}
              </ErrorMessage>
            </div>

            <div className="form-group">
              <label
                htmlFor="exampleFormControlSelect2"
                style={{ fontWeight: "bolder" }}
              >
                color
              </label>

              <select
                name="color"
                value={values.color}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control"
              >
                {options?.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>

              <ErrorMessage name="color">
                {(msg) => (
                  <div style={{ color: "red", textAlign: "left" }}>{msg}</div>
                )}
              </ErrorMessage>
            </div>

            <div className="form-group">
              <label
                htmlFor="exampleFormControlSelect2"
                style={{ fontWeight: "bolder" }}
              >
                Colors
              </label>

              <Field
                options={options}
                component={Select}
                placeholder="Select colors..."
                isMulti={true}
                onBlur={setFieldTouched}
                touched={touched.colors}
                error={errors.colors}
                name="colors"
                id="colors"
                isClearable={true}
                backspaceRemovesValue={true}
                onChange={(val: any) => {
                  setFieldValue("colors", val, true);
                }}
              />

              <ErrorMessage name="colors">
                {(msg) => (
                  <div style={{ color: "red", textAlign: "left" }}>{msg}</div>
                )}
              </ErrorMessage>
            </div>
            
        
            <div className="form-group form-check">
              <Field
                type="checkbox"
                name="acceptTerms"
                className="form-check-input"
              />
              <label htmlFor="acceptTerms" className="form-check-label">
                Accept Terms & Conditions
              </label>
              <ErrorMessage name="acceptTerms">
                {(msg) => (
                  <div style={{ color: "red", textAlign: "left" }}>{msg}</div>
                )}
              </ErrorMessage>
            </div>
            <div className="form-group">
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary btn-md btn-block"
                >
                  Submit
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EmployeeForm;
