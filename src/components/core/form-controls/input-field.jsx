import { useField } from "formik";
import Typography from "../typography";

const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const isError = meta.touched && meta.error;
  return (
    <div className="mb-3">
      <label htmlFor={field.name}>{label}</label>
      <input
        className="border border-gray-300 hover:border-gray-400 rounded-lg bg-white hover:cursor-pointer h-10 px-2 block w-full"
        {...field}
        {...props}
      />
      {isError ? (
        <Typography margin={[8, 0, 0, 0]}>{meta.error}</Typography>
      ) : null}
    </div>
  );
};

export default InputField;
