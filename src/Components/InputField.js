import React, { forwardRef, useImperativeHandle } from "react";

const InputField = forwardRef((props, ref) => {
  //  console.log(props.defaultValue)
  const [value, setValue] = React.useState(props.defaultValue);
  const [error, setError] = React.useState("");
  //   console.log(value);
  const handleChange = (event) => {
    setValue(event.target.value);
    setError("");
    props.onChange(event.target.name, event.target.value);
  };

  const validate = () => {
    //return true if is valid
    //else return false

    if (props.validation) {
      const rules = props.validation.split("|");

      for (let i = 0; i < rules.length; i++) {
        const current = rules[i];

        if (current === "required") {
          if (!value) {
            setError(`${props.label} is required`);
            return false;
          }
        }

        const pair = current.split(":");
        switch (pair[0]) {
          case "min":
            if (value.length < pair[1]) {
              setError(
                `This field must be at least ${pair[1]} characters long`
              );
              return false;
            }
            break;
          case "max":
            if (value.length > pair[1]) {
              setError(
                `This ${value} must be no longer than ${pair[1]} characters long`
              );
              return false;
            }
            break;
          case "emailpattern":
            if (!/\S+@\S+\.\S+/.test(value)) {
              setError(` Invalid  ${props.label} id`);
              return false;
            }
            break;
          case "userpattern":
            if (!/^[0-9a-zA-Z.: @_-]+$/.test(value)) {
              setError(
                `charcters allowed ['A-Z','a-z','0-9', '@', '.', '-', '_', ':' ]`
              );
              return false;
            }
            break;
          case "passwordmatch":
            if (!value) {
              setError(`Password doesn't match `);
              return false;
            } else if (value !== props.password) {
              setError(`Password doesn't match `);
              return false;
            }
            break;
          case "onlynumber":
            if (!/^[0-9]+$/.test(value)) {
              //isNaN(value)
              setError(`Please enter valid ${props.label}`);
              return false;
            }
            break;
          default:
            break;
        }
      }
    }

    return true;
  };

  useImperativeHandle(ref, () => {
    return {
      validate: () => validate(),
    };
  });

  return (
    <div className="input-wrapper">
      {props.label && <label>{props.label} : </label>}
      <input
        className={props.className}
        placeholder={props.placeholder}
        name={props.name}
        onChange={(event) => handleChange(event)}
        type={props.type}
        defaultValue={props.defaultValue ? props.defaultValue : value}
        autoComplete={props.autoComplete}
        disabled={props.disabled}
      />
      {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
    </div>
  );
});

InputField.defaultProps = {
  placeholder: "",
  name: "",
  type: "text",
  defaultValue: "",
  autoComplete: "off",
  validation: "",
  className: "text",
  disabled: false,
};

export default InputField;
