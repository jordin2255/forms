import { useState } from "react";
import Input from "./Input";
import { isEmail,isNotEmpty,hasMinLength } from "../util/validation";

export default function Login() {
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });
  const [didEdit, setDidEdit] = useState({ email: false, password: false });
  const emailIsInvalid = didEdit.email && !isEmail(enteredValues.email) && !isNotEmpty(enteredValues.email);
  const passwordIsInvalid=didEdit.password && hasMinLength(enteredValues.password,6);
  function handleSubmit(event) {
    event.preventDefault();
    if(emailIsInvalid){
      return;
     }
    console.log(enteredValues);
  }

  function handleInputChange(identifier, value) {
    setEnteredValues((prev) => ({
      ...prev,
      [identifier]: value,
    }));
    setDidEdit(prev=>({...prev,[identifier]:false}));
  }
  function handleInputBlur(identifier) {
    setDidEdit((prev) => ({ ...prev, [identifier]: true }));
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input label={'Email'} id={'email'} type={'email'} name={'email'}
        
            onBlur={() => handleInputBlur("email")}
            onChange={(event) => handleInputChange("email", event.target.value)}
            value={enteredValues.email}
            error={emailIsInvalid && 'please enter a valid email'}
          />
        
        <Input label={'Password'} id={'password'} type={'password'} name={'password'}
        
        onBlur={() => handleInputBlur("password")}
        onChange={(event) => handleInputChange("password", event.target.value)}
        value={enteredValues.password}
        error={passwordIsInvalid && 'please enter a valid password'}
      />
        
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
