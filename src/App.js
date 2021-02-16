import "./App.css";
import React from "react";
import InputField from "./Components/InputField";

function App() {
  const [values, setValues] = React.useState({});

  //Form Validation
  const inputRefs = React.useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);

  const handleInputChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    let isValid = true;
    for (let i = 0; i < inputRefs.current.length; i++) {
      if (inputRefs.current[i].current === null) {
        continue;
      }
      const valid = inputRefs.current[i].current.validate();
      if (!valid) {
        isValid = false;
      }
    }

    if (!isValid) {
      return;
    }
    console.log(values);
  };

  return (
    <div className="App">
      <form onSubmit={submitForm} noValidate>
        <InputField
          ref={inputRefs.current[0]}
          label="Username "
          name="username"
          onChange={handleInputChange}
          validation={"required|userpattern"}
          className="form-control"
        />
        <InputField
          ref={inputRefs.current[1]}
          label="Email "
          name="email"
          type="email"
          validation="required|emailpattern"
          onChange={handleInputChange}
          className="form-control"
        />

        <InputField
          ref={inputRefs.current[2]}
          label="Phone number"
          name="phone"
          onChange={handleInputChange}
          className="form-control"
          validation={"onlynumber"}
          // validation={"required|userpattern"}
        />

        <InputField
          ref={inputRefs.current[3]}
          label="First name"
          name="fName"
          onChange={handleInputChange}
          className="form-control"
          validation={"required|userpattern"}
        />

        <InputField
          ref={inputRefs.current[4]}
          label="Last name"
          name="lName"
          onChange={handleInputChange}
          className="form-control"
          validation={"required|userpattern"}
        />

        <InputField
          ref={inputRefs.current[5]}
          name="password"
          type="password"
          label="Password"
          validation="required|min:6"
          onChange={handleInputChange}
          className="form-control"
        />

        <InputField
          ref={inputRefs.current[6]}
          label="Confirm Password"
          name="conf_password"
          type="password"
          validation="passwordmatch"
          onChange={handleInputChange}
          className="form-control"
          password={values.password}
        />

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
