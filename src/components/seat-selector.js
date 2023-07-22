import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import Typography from "../components/core/typography";
import Button from "../components/core/button";
import {
  CommonDispatchContext,
  CommonStateContext,
  setSelectedSeats as updateSelectedSheets,
} from "../contexts/common";
import useLocalStorage from "../hooks/use-localstorage";

const maxSeats = 32;
const defaultSeatsArr = new Array(maxSeats);

const Seat = ({ data, isSeatSelected, isSeatBooked, onSelect }) => {
  const baseClass =
    "group bg-slate-100 hover:bg-slate-600 border border-slate-400 min-h-[50px] rounded basis-[11.18%] flex items-center justify-center";

  const handleSelect = (seatNo) => {
    if (isSeatBooked) {
      return;
    }
    onSelect(seatNo);
  };

  return (
    <div
      className={classNames(baseClass, {
        "bg-green-400 border-transparent": isSeatSelected,
        "bg-red-400 border-transparent": isSeatBooked,
      })}
      onClick={() => handleSelect(data.seatNo)}
    >
      <Typography variant="h3" className="font-bold group-hover:text-white">
        {data.seatNo}
      </Typography>
    </div>
  );
};

const SeatSelector = () => {
  const dispatch = useContext(CommonDispatchContext);
  const { selectedSchedule } = useContext(CommonStateContext);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();
  const [persistedBookings] = useLocalStorage("bookings", []);

  const seats = [...defaultSeatsArr].map((_, index) => ({
    seatNo: index + 1,
    isSelected: false,
  }));

  const middleIndex = Math.ceil(seats.length / 2);

  const firstHalf = seats.slice().splice(0, middleIndex);
  const secondHalf = seats.slice().splice(-middleIndex);

  const handleSelectSeat = (seatNo) => {
    const seatsClone = [...selectedSeats];
    if (seatsClone.includes(seatNo)) {
      const updatedSeats = seatsClone.filter((f) => f !== seatNo);
      setSelectedSeats(updatedSeats);
    } else {
      setSelectedSeats([...seatsClone, seatNo]);
    }
  };

  const handleSeatConfirmation = () => {
    updateSelectedSheets(dispatch, selectedSeats);
    navigate("/booking");
  };

  return (
    <div className="p-5 rounded-lg bg-slate-100">
      <div className="border-l-8 border-slate-500 pl-5">
        <div className="mb-10">
          <div className="flex flex-row flex-wrap gap-5">
            {firstHalf.map((s) => {
              const isSeatSelected = selectedSeats.includes(s.seatNo);
              const isSeatBooked =
                persistedBookings?.scheduleId === selectedSchedule?.id &&
                persistedBookings?.seats?.includes(s.seatNo);
              return (
                <Seat
                  key={s.seatNo}
                  data={s}
                  isSeatSelected={isSeatSelected}
                  isSeatBooked={isSeatBooked}
                  onSelect={(seatNo) => handleSelectSeat(seatNo)}
                />
              );
            })}
          </div>
        </div>
        <div className="">
          <div className="flex flex-row flex-wrap gap-5">
            {secondHalf.map((s) => {
              const isSeatSelected = selectedSeats.includes(s.seatNo);
              const isSeatBooked =
                persistedBookings?.scheduleId === selectedSchedule?.id &&
                persistedBookings?.seats?.includes(s.seatNo);
              return (
                <Seat
                  key={s.seatNo}
                  data={s}
                  isSeatSelected={isSeatSelected}
                  isSeatBooked={isSeatBooked}
                  onSelect={(seatNo) => handleSelectSeat(seatNo)}
                />
              );
            })}
          </div>
        </div>
      </div>
      {selectedSeats?.length > 0 && (
        <div className="mt-8 flex justify-between items-center">
          <Typography>
            Selected seats:{" "}
            {selectedSeats?.map((s) => (
              <span
                key={s}
                className="py-2 px-3 mr-3 border border-green-600 text-green-600 rounded"
              >
                {s}
              </span>
            ))}
          </Typography>
          <Button
            type="button"
            variant="cta"
            onClick={() => handleSeatConfirmation()}
          >
            PROCEED TO BOOK
          </Button>
        </div>
      )}
    </div>
  );
};

export default SeatSelector;
