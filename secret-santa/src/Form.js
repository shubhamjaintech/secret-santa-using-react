import React from "react";

let Form = ({onSubmitHandler}) => {
    let nameField, emailField;
    let onFormSubmit = (e) => {
      e.preventDefault();
      onSubmitHandler(nameField.value, emailField.value);
      nameField.value = "";
      emailField.value = "";
   
      nameField.focus();
    }
   
    return (
      <form onSubmit={onFormSubmit}>
        <input type="text" placeholder="Name" ref={(node) => nameField = node} />
        <input type="text" placeholder="Email" ref={(node) => emailField = node} />
        <input type="submit" value="Add" />
      </form>
    )
  }

  export default Form;