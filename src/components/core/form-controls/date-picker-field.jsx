import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { useField, useFormikContext } from "formik";
import Typography from "../typography";
import "react-day-picker/dist/style.css";

const DatePickerField = ({ label, name, placeholder, ...props }) => {
  const ref = useRef(null);
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const [selected, setSelected] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const isError = meta.touched && meta.error;

  const handleOnClick = () => {
    setIsOpen(true);
  };

  const handleDaySelect = (date) => {
    if (date) {
      console.log(typeof date);
      setSelected(date);
      const val = format(date, "dd-MM-y");
      setFieldValue(name, val);
      setIsOpen(false);
    } else {
      setFieldValue(name, "");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    const [date, month, year] = field.value?.split("-");
    const defaultDate = new Date(year, month - 1, date);
    setSelected(defaultDate);
  }, []);

  return (
    <div className="relative">
      <label htmlFor={field.name}>{label}</label>

      <input
        type="text"
        onClick={() => handleOnClick()}
        onChange={() => {}}
        className="border border-gray-300 hover:border-gray-400 rounded-lg bg-white hover:cursor-pointer h-10 px-2 block w-full"
        value={field.value}
        placeholder={placeholder}
        disabled={isOpen}
      />
      {isOpen && (
        <div
          ref={ref}
          className="absolute bg-slate-50 p-3 rounded drop-shadow-md"
        >
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleDaySelect}
          />
        </div>
      )}
      {isError ? (
        <Typography margin={[8, 0, 0, 0]}>{meta.error}</Typography>
      ) : null}
    </div>
  );
};

export default DatePickerField;
