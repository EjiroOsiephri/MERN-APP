import React, { useContext, useState } from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../util/validators";
import { useForm } from "../../shared/hooks/form-hooks";

import "./Auth.css";
import { AuthContext } from "../../shared/context/Auth-Context";

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const auth = useContext(AuthContext);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        { ...formState.inputs, name: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevValue) => !prevValue);
  };

  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    auth.logIn();
  };

  return (
    <Card className="authentication">
      <h2>LOGIN REQUIRED</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            type="text"
            id="name"
            element="input"
            onInput={inputHandler}
            label="YOUR NAME"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Enter a valid username"
          />
        )}
        <Input
          type="email"
          id="email"
          element="input"
          onInput={inputHandler}
          label="Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Enter a valid email"
        />
        <Input
          type="password"
          element="input"
          id="password"
          onInput={inputHandler}
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Enter a valid password not less than 5"
        />
        <Button type="submit" disabled={!formState.isValid}>
          LOGIN
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
      </Button>
    </Card>
  );
};

export default Auth;
