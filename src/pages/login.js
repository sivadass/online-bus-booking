import { useContext, useEffect } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Button from "../components/core/button";
import InputField from "../components/core/form-controls/input-field";
import Typography from "../components/core/typography";
import { mobilePattern } from "../constants/regex-patterns";
import { AuthDispatchContext, AuthStateContext, login } from "../contexts/auth";

const loginSchema = Yup.object().shape({
  mobile: Yup.string()
    .matches(mobilePattern, "Phone number is not valid")
    .required("Required"),
});

const LoginPage = () => {
  const { isLoggedIn, user } = useContext(AuthStateContext);
  const dispatch = useContext(AuthDispatchContext);
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    login(dispatch, userData);
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="container flex items-center min-h-[calc(100vh-136px)]">
      <div className="flex items-center w-1/2 m-auto bg-slate-100 rounded-3xl flex-wrap">
        <div className="w-1/2 py-10 px-10 bg-slate-300 rounded-l-3xl">
          <img src="/otp.svg" className="opacity-50" />
        </div>
        <div className="w-1/2 p-10">
          <Typography variant="h2" className="mb-8">
            Signin to avail exciting discounts & cashbacks!
          </Typography>
          <Formik
            initialValues={{
              mobile: "",
            }}
            validationSchema={loginSchema}
            onSubmit={async (values) => handleLogin(values)}
          >
            <Form>
              <InputField
                name="mobile"
                type="text"
                placeholder="10 Digit Mobile Number"
              />
              <Button type="submit" variant="primary" block>
                Login
              </Button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
