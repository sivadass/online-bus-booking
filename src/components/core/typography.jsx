import classNames from "classnames";

const Typography = ({ children, variant = "p", className = "" }) => {
  const baseClass = "font-normal leading-normal";
  return (
    <>
      {(() => {
        switch (variant) {
          case "h1": {
            const variantClass = "text-3xl";
            return (
              <h1 className={classNames(baseClass, variantClass, className)}>
                {children}
              </h1>
            );
          }
          case "h2": {
            const variantClass = "text-2xl";
            return (
              <h2 className={classNames(baseClass, variantClass, className)}>
                {children}
              </h2>
            );
          }
          case "h3": {
            const variantClass = "text-lg";
            return (
              <h3 className={classNames(baseClass, variantClass, className)}>
                {children}
              </h3>
            );
          }
          case "p":
          default: {
            const variantClass = "text-base";
            return (
              <p className={classNames(baseClass, variantClass, className)}>
                {children}
              </p>
            );
          }
        }
      })()}
    </>
  );
};

export default Typography;
