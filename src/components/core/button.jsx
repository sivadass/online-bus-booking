import classNames from "classnames";

const Button = ({
  children,
  variant = "primary",
  block = false,
  className = "",
  onClick,
}) => {
  const baseStyle = "font-bold py-2 px-4 rounded";
  const primaryStyle = "bg-slate-400 hover:bg-slate-600 text-white";
  const secondaryStyle =
    "bg-transparent hover:bg-slate-500 text-gray-600 border border-slate-500 hover:border-transparent hover:text-white";
  const ghostStyle = "bg-transparent hover:bg-slate-300 text-gray-600";
  const blockStyle = "w-full";
  return (
    <button
      className={classNames(
        {
          [baseStyle]: true,
          [primaryStyle]: variant === "primary",
          [secondaryStyle]: variant === "secondary",
          [ghostStyle]: variant === "ghost",
          [blockStyle]: block,
        },
        className
      )}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      {children}
    </button>
  );
};

export default Button;
