import React, { Component } from "react";
import List from "./List";
import Form from "./Form";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.addParticipant = this.addParticipant.bind(this);
    this.onAssignHandler = this.onAssignHandler.bind(this);
    this.state = {
      participants: [],
      assignments: []
    };
  }
  addParticipant(name, email) {
    this.setState((prevState, props) => {
      return {
        participants: [...prevState.participants, { name, email }],
        assignments: []
      };
    });
  }
  onAssignHandler() {
    this.setState((prevState) => {
      return { assignments: this.assign(prevState.participants) }
    });
  }
  assign(participants) {
  let assignments = [];
  for(var i = 0, remainingParticipants = participants.slice(), len = participants.length; i < len; ++i) {
    remainingParticipants = this.assignRecipient(participants[i], remainingParticipants, assignments);
  }

  if(assignments[len - 1] === undefined) {
    assignments[len - 1] = assignments[len - 2];
    assignments[len - 2] = remainingParticipants.pop();
  }

  return assignments;
}

assignRecipient(curParticipant, remainingParticipants, assignments) {
  let isInRemaining = false;
  for(let i = 0; i < remainingParticipants.length; ++i) {
    if(curParticipant.email === remainingParticipants[i].email) {
      remainingParticipants.splice(i, 1);
      isInRemaining = true;
      break;
    }
  }

  let assignmentIndex = Math.floor(Math.random() * remainingParticipants.length);
  assignments.push(remainingParticipants.splice(assignmentIndex, 1)[0]);

  if(isInRemaining) remainingParticipants.push(curParticipant);

  return remainingParticipants;
}

  render() {
    
    let lists = [<List items={this.state.participants} />];
    
    if (this.state.assignments.length) {
      lists.push(<List items={this.state.assignments} />);
    }
    return (
      <div className="App">
        <Form onSubmitHandler={this.addParticipant} />
        <List items={this.state.participants} />
        {this.state.assignments.length > 0 && (
          <List items={this.state.assignments} />
        )}
        <button onClick={this.onAssignHandler}>Assign</button>
      </div>
    );
  }
}
export default App;
