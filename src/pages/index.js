import { useContext, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { getJSON } from "../utils/axios";
import * as Yup from "yup";
import Button from "../components/core/button";
import DatePickerField from "../components/core/form-controls/date-picker-field";
import SelectField from "../components/core/form-controls/select-field";
import {
  getLocations,
  CommonDispatchContext,
  CommonStateContext,
} from "../contexts/common";

const loginSchema = Yup.object().shape({
  from: Yup.string().required("Required"),
  to: Yup.string().required("Required"),
  date: Yup.string().required("Required"),
});

const Home = () => {
  const { locations } = useContext(CommonStateContext);
  const dispatch = useContext(CommonDispatchContext);
  const navigate = useNavigate();

  const handleSearch = (values) => {
    const { from, to, date } = values;
    navigate({
      pathname: "/schedules",
      search: `?from=${from}&to=${to}&date=${date}`,
    });
  };

  useEffect(() => {
    getLocations(dispatch);
  }, [dispatch]);

  return (
    <div className="py-[64px] bg-slate-200">
      <div className="bg-cover bg-hero-banner min-h-[520px] bg-no-repeat">
        <div className="py-10">
          <Formik
            initialValues={{
              from: "",
              to: "",
              date: "",
            }}
            validationSchema={loginSchema}
            onSubmit={async (values) => handleSearch(values)}
          >
            {({ values }) => {
              const fromOptions = locations?.filter(
                (l) => l.value !== values.to
              );
              const toOptions = locations?.filter(
                (l) => l.value !== values.from
              );
              return (
                <Form className="flex items-start justify-center gap-5">
                  <SelectField
                    name="from"
                    placeholder="Select destination"
                    options={fromOptions}
                    className="w-64"
                  />
                  <SelectField
                    name="to"
                    placeholder="Select destination"
                    options={toOptions}
                    className="w-64"
                  />
                  <DatePickerField name="date" placeholder="Selected date" />
                  <Button type="submit" variant="primary">
                    Search Buses
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Home;
