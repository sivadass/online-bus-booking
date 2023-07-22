import { useEffect, useState, useContext, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { getJSON } from "../utils/axios";
import Typography from "../components/core/typography";
import Button from "../components/core/button";
import {
  CommonDispatchContext,
  CommonStateContext,
  getLocations,
  setCurrentSchedule,
} from "../contexts/common";
import Loader from "../components/loader";
import SeatSelector from "../components/seat-selector";
import { formatAmount } from "../utils/common";
import SelectField from "../components/core/form-controls/select-field";
import { sortOptions } from "../constants/common";

const sortSchema = Yup.object().shape({
  sortBy: Yup.string().required("Required"),
});

const SortForm = ({ onSort }) => {
  return (
    <Formik
      initialValues={{
        sortBy: "",
      }}
      validationSchema={sortSchema}
      onSubmit={async (values) => onSort(values)}
    >
      {({ handleSubmit }) => {
        return (
          <Form className="flex gap-3">
            <SelectField
              name="sortBy"
              placeholder="Sort by"
              options={sortOptions}
              className="!mb-0"
            />
            <Button
              type="submit"
              onClick={handleSubmit}
              variant="secondary"
              className="flex-1"
            >
              Sort Buses
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

const SchedulesItem = ({ schedule }) => {
  const { selectedSchedule } = useContext(CommonStateContext);
  const dispatch = useContext(CommonDispatchContext);
  const isSelected = schedule?.id === selectedSchedule?.id;

  const baseClass =
    "bg-slate-100 hover:bg-amber-100 hover:cursor-pointer rounded-lg mb-5";

  const handleSelectSchedule = (scheduleData) => {
    setCurrentSchedule(dispatch, scheduleData);
  };
  return (
    <div
      className={classNames(baseClass, {
        "bg-amber-200": isSelected,
      })}
    >
      <div
        className="flex items-center p-5"
        onClick={() => handleSelectSchedule(schedule)}
      >
        <div className="w-2/5">
          <Typography variant="h3">{schedule.busName}</Typography>
          <Typography className="font-bold text-slate-600">
            {`${schedule.busRating}/5`}
          </Typography>
        </div>

        <div className="w-1/5">
          <Typography className="text-slate-400">Arrival</Typography>
          <Typography>{schedule.arrival}</Typography>
        </div>

        <div className="w-1/5">
          <Typography className="text-slate-400">Departure</Typography>
          <Typography>{schedule.departure}</Typography>
        </div>

        <Typography
          variant="h2"
          className="font-bold text-2xl ml-auto w-1/5 text-right"
        >
          {formatAmount(schedule.pricing)}
        </Typography>
      </div>
      {isSelected && (
        <div className="p-5 rounded-b-lg">
          <SeatSelector />
        </div>
      )}
    </div>
  );
};

const SchedulesPage = () => {
  const { locations } = useContext(CommonStateContext);
  const dispatch = useContext(CommonDispatchContext);
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const date = searchParams.get("date");
  const fromLocationName =
    locations?.find((f) => f.value === Number(from))?.label || "";
  const toLocationName =
    locations?.find((f) => f.value === Number(to))?.label || "";

  const sortedSchedules = useMemo(() => {
    let sortedData = [...schedules];
    if (sortBy === "price-asc") {
      sortedData = sortedData.sort((a, b) => (a.pricing > b.pricing ? 1 : -1));
    }
    if (sortBy === "price-dsc") {
      sortedData = sortedData.sort((a, b) => (a.pricing < b.pricing ? 1 : -1));
    }
    if (sortBy === "rating-asc") {
      sortedData = sortedData.sort((a, b) =>
        a.busRating > b.busRating ? 1 : -1
      );
    }
    if (sortBy === "rating-dsc") {
      sortedData = sortedData.sort((a, b) =>
        a.busRating < b.busRating ? 1 : -1
      );
    }
    return sortedData;
  }, [schedules, sortBy]);

  const handleModify = () => {
    navigate("/");
  };

  const handleSort = (sortData) => {
    if (sortData?.sortBy) {
      setSortBy(sortData.sortBy);
    }
  };

  useEffect(() => {
    if (from && to && date) {
      setIsLoading(true);
      const url = `/api/schedules?from=${from}&to=${to}&date=${date}`;
      getJSON(url)
        .then((response) => {
          const schedulesData = response?.data?.schedules;
          setSchedules(schedulesData);
        })
        .catch((error) => {
          console.log("error", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [from, to, date]);

  useEffect(() => {
    if (!locations) {
      getLocations(dispatch);
    }
  }, [locations, dispatch]);

  return (
    <div className="container m-auto">
      <div className="flex items-center gap-3 mb-3 py-3 px-5 bg-slate-300 rounded-lg text-black-400">
        <Typography variant="h3">{fromLocationName}</Typography>
        <span className="material-symbols-outlined">arrow_forward</span>
        <Typography variant="h3">{toLocationName}</Typography>
        <Typography>on</Typography>
        <Typography variant="h3">{date}</Typography>
        <Button
          variant="secondary"
          onClick={() => handleModify()}
          className="ml-auto"
        >
          Modify
        </Button>
      </div>

      <div>
        {isLoading && <Loader label="Fetching buses, please wait..!" />}

        {!isLoading && schedules?.length > 0 && (
          <div className="py-5">
            <div className="flex items-center justify-between mb-5">
              <Typography variant="h3" className="mb-0">
                Available Buses ({schedules?.length})
              </Typography>
              <SortForm onSort={(values) => handleSort(values)} />
            </div>
            {sortedSchedules?.map((scheduleData) => {
              return (
                <SchedulesItem key={scheduleData?.id} schedule={scheduleData} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedulesPage;
