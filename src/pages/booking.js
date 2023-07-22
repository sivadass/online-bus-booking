import { useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import Button from "../components/core/button";
import Typography from "../components/core/typography";
import {
  CommonDispatchContext,
  CommonStateContext,
  setCurrentSchedule,
  setSelectedSeats,
} from "../contexts/common";
import InputField from "../components/core/form-controls/input-field";
import SelectField from "../components/core/form-controls/select-field";
import useLocalStorage from "../hooks/use-localstorage";
import { AuthStateContext } from "../contexts/auth";
import { formatAmount } from "../utils/common";

const genderOptions = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Transgender",
    value: "transgender",
  },
];

const bookingSchema = Yup.object().shape({
  passengers: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().min(4, "too short").required("Required"),
        age: Yup.string()
          .min(1, "Toddler?")
          .max(2, "Too old?")
          .required("Required"),
      })
    )
    .required("Must have passengers")
    .min(1, "Minimum of 1 passenger"),
});

const BookingForm = ({ initialValues, onSubmit, price }) => {
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={bookingSchema}
        onSubmit={async (values) => {
          onSubmit(values);
        }}
      >
        {({ values, handleSubmit }) => (
          <Form>
            <FieldArray name="passengers">
              {({}) => (
                <div>
                  {values?.passengers?.length > 0 &&
                    values?.passengers?.map((passenger, index) => (
                      <div className="flex items-center gap-5 mb-5" key={index}>
                        <div className="flex-1">
                          <Typography>
                            Seat Number: <strong>{passenger.id}</strong>
                          </Typography>
                        </div>
                        <div className="flex-1">
                          <InputField
                            name={`passengers.${index}.name`}
                            placeholder={`Enter passenger ${
                              index + 1
                            } fullname`}
                            type="text"
                          />
                        </div>
                        <div className="flex-1">
                          <InputField
                            name={`passengers.${index}.age`}
                            placeholder={`Enter passenger ${index + 1} age`}
                            type="text"
                          />
                        </div>
                        <div className="flex-1">
                          <SelectField
                            name={`passengers.${index}.gender`}
                            placeholder={`Select passenger ${index + 1} gender`}
                            options={genderOptions}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </FieldArray>
            <Button variant="cta" block onClick={() => handleSubmit()}>
              Pay {formatAmount(values?.passengers?.length * price)} & Confirm
              Booking
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const BookingPage = () => {
  const { selectedSchedule, selectedSeats } = useContext(CommonStateContext);
  const { user } = useContext(AuthStateContext);
  const dispatch = useContext(CommonDispatchContext);
  const [_, setPersistedBookings] = useLocalStorage("bookings", []);
  const navigate = useNavigate();

  const bookingValues = useMemo(() => {
    if (selectedSeats?.length === 0) {
      return {
        passengers: [],
      };
    }
    const passengers = selectedSeats?.map((s) => {
      return {
        id: s,
        name: "",
        age: "",
        gender: "",
      };
    });
    return {
      passengers,
    };
  }, [selectedSeats, selectedSchedule]);

  const handleBooking = (values) => {
    const bookingData = {
      user,
      scheduleId: selectedSchedule.id,
      seats: selectedSeats,
      passengers: values.passengers,
    };
    setPersistedBookings(bookingData);
    setCurrentSchedule(dispatch, null);
    setSelectedSeats(dispatch, []);
    navigate("/booking-result");
  };

  useEffect(() => {
    if (selectedSeats?.length === 0) {
      navigate("/");
    }
  }, [selectedSeats]);

  return (
    <div className="container m-auto min-h-[calc(100vh-136px)] flex items-center">
      <div className="bg-slate-50 p-10 rounded-lg flex-1 m-auto">
        <Typography variant="h1" className="mb-10 text-center">
          Passenger Details
        </Typography>
        <BookingForm
          initialValues={bookingValues}
          onSubmit={(values) => handleBooking(values)}
          price={selectedSchedule?.pricing}
        />
      </div>
    </div>
  );
};

export default BookingPage;
