import { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getJSON } from "../utils/axios";
import Typography from "../components/core/typography";
import Button from "../components/core/button";
import {
  CommonDispatchContext,
  CommonStateContext,
  getLocations,
} from "../contexts/common";
import Loader from "../components/loader";

const SchedulesPage = () => {
  const { locations } = useContext(CommonStateContext);
  const dispatch = useContext(CommonDispatchContext);
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const date = searchParams.get("date");

  const fromLocationName =
    locations?.find((f) => f.value === Number(from))?.label || "";
  const toLocationName =
    locations?.find((f) => f.value === Number(to))?.label || "";

  const handleModify = () => {
    navigate("/");
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
  }, [locations]);
  return (
    <div className="container m-auto ">
      <div className="flex items-center gap-3 px-5 py-3 mb-5 bg-slate-300 rounded-lg text-black-400">
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
        {schedules?.map((schedule) => {
          return (
            <div>
              <pre>{JSON.stringify(schedule, null, 2)}</pre>
            </div>
          );
        })}
      </div>
      <h1>Available Schedules</h1>
    </div>
  );
};

export default SchedulesPage;
