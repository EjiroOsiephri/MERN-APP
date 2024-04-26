import React from "react";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../util/validators";

import "./NewPlace.css";

const NewPlace = () => {
  return (
    <>
      <form className="place-form">
        <Input
          label={"Title"}
          placeholder={"Enter a title"}
          type="text"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Enter a value"
        />
      </form>
    </>
  );
};

export default NewPlace;
