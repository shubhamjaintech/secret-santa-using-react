import React from "react";
let List = props => {
  var items = props.items;
  return (
    <ul>
      {items.map(function({ name, email }, i) {
        return <li key={email}>{name}</li>;
      })}
    </ul>
  );
};

export default List;
