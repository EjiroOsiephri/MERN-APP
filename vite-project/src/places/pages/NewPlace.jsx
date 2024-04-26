import { useForm } from "../../shared/hooks/form-hooks";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../util/validators";
import Button from "../../shared/components/FormElements/Button";

import "./NewPlace.css";

const NewPlace = () => {
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };
  return (
    <>
      <form className="place-form" onSubmit={formSubmitHandler}>
        <Input
          label={"Title"}
          placeholder={"Enter a title"}
          type="text"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorText="Enter a value"
        />
        <Input
          element="textarea"
          label={"Description"}
          placeholder={"Enter a Description"}
          type="text"
          validators={[VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
          errorText="Enter a value not less than five(5)"
        />
        <Input
          element="input"
          label={"Address"}
          placeholder={"Enter an address"}
          type="text"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorText="Enter a valid address"
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </>
  );
};

export default NewPlace;
