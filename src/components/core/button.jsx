import classNames from "classnames";
const Button = ({ children, variant = "primary" }) => {
  return (
    <button
      className={classNames({
        primary: variant === "primary",
      })}
    >
      {children}
    </button>
  );
};

export default Button;
