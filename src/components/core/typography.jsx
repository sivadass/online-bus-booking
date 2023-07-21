import classNames from "classnames";

const Typography = ({ children, variant }) => {
  return (
    <p
      className={classNames({
        primary: variant === "primary",
      })}
    >
      {children}
    </p>
  );
};

export default Typography;
