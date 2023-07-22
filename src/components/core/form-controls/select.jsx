import Select, { components } from "react-select";
import classNames from "classnames";
import { useField, useFormikContext } from "formik";

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <span className="material-symbols-outlined">expand_more</span>
    </components.DropdownIndicator>
  );
};

const ClearIndicator = (props) => {
  return (
    <components.ClearIndicator {...props}>
      <span className="material-symbols-outlined">close</span>
    </components.ClearIndicator>
  );
};

const MultiValueRemove = (props) => {
  return (
    <components.MultiValueRemove {...props}>
      <span className="material-symbols-outlined">close</span>
    </components.MultiValueRemove>
  );
};

const controlStyles = {
  base: "border rounded-lg bg-white hover:cursor-pointer",
  focus: "border-primary-600 ring-1 ring-primary-500",
  nonFocus: "border-gray-300 hover:border-gray-400",
};
const placeholderStyles = "text-gray-400 pl-1 py-0.5";
const selectInputStyles = "pl-1 py-0.5";
const valueContainerStyles = "p-1 gap-1";
const singleValueStyles = "leading-7 ml-1";
const multiValueStyles =
  "bg-gray-100 rounded items-center py-0.5 pl-2 pr-1 gap-1.5";
const multiValueLabelStyles = "leading-6 py-0.5";
const multiValueRemoveStyles =
  "border border-gray-200 bg-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-md";
const indicatorsContainerStyles = "p-1 gap-1";
const clearIndicatorStyles =
  "text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800";
const indicatorSeparatorStyles = "bg-gray-0";
const dropdownIndicatorStyles =
  "p-1 hover:bg-gray-100 text-gray-500 rounded-md hover:text-black";
const menuStyles = "p-1 mt-2 border border-gray-200 bg-white rounded-lg";
const groupHeadingStyles = "ml-3 mt-2 mb-1 text-gray-500 text-sm";
const optionStyles = {
  base: "hover:cursor-pointer px-3 py-2 rounded",
  focus: "bg-gray-100 active:bg-gray-200",
  selected: "after:content-['✔'] after:ml-2 after:text-green-500 text-gray-500",
};
const noOptionsMessageStyles =
  "text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm";

const ReactSelect = (props) => {
  const { name, label, ...restProps } = props;
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();
  //flatten the options so that it will be easier to find the value
  const flattenedOptions = props.options?.flatMap((o) => {
    const isNotGrouped = "value" in o;
    if (isNotGrouped) {
      return o;
    } else {
      return o.options;
    }
  });

  //get the value using flattenedOptions and field.value
  const value = flattenedOptions?.filter((o) => {
    const isArrayValue = Array.isArray(field.value);

    if (isArrayValue) {
      const values = field.value;
      return values.includes(o.value);
    } else {
      return field.value === o.value;
    }
  });
  return (
    <div>
      <label>{label}</label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        unstyled
        styles={{
          input: (base) => ({
            ...base,
            "input:focus": {
              boxShadow: "none",
            },
          }),
          // On mobile, the label will truncate automatically, so we want to
          // override that behaviour.
          multiValueLabel: (base) => ({
            ...base,
            whiteSpace: "normal",
            overflow: "visible",
          }),
          control: (base) => ({
            ...base,
            transition: "none",
          }),
        }}
        components={{ DropdownIndicator, ClearIndicator, MultiValueRemove }}
        classNames={{
          control: ({ isFocused }) =>
            classNames({
              [controlStyles.focus]: isFocused,
              [controlStyles.nonFocus]: !isFocused,
              [controlStyles.base]: true,
            }),
          placeholder: () => placeholderStyles,
          input: () => selectInputStyles,
          valueContainer: () => valueContainerStyles,
          singleValue: () => singleValueStyles,
          multiValue: () => multiValueStyles,
          multiValueLabel: () => multiValueLabelStyles,
          multiValueRemove: () => multiValueRemoveStyles,
          indicatorsContainer: () => indicatorsContainerStyles,
          clearIndicator: () => clearIndicatorStyles,
          indicatorSeparator: () => indicatorSeparatorStyles,
          dropdownIndicator: () => dropdownIndicatorStyles,
          menu: () => menuStyles,
          groupHeading: () => groupHeadingStyles,
          option: ({ isFocused, isSelected }) =>
            classNames({
              [optionStyles.base]: true,
              [optionStyles.focus]: isFocused,
              [optionStyles.selected]: isSelected,
            }),
          noOptionsMessage: () => noOptionsMessageStyles,
        }}
        value={value}
        onChange={(val) => {
          //here I used explicit typing but there maybe a better way to type the value.
          const _val = val;
          const isArray = Array.isArray(_val);
          if (isArray) {
            const values = _val.map((o) => o.value);
            setFieldValue(name, values);
          } else {
            setFieldValue(name, _val.value);
          }
        }}
        {...props}
      />
    </div>
  );
};

export default ReactSelect;
