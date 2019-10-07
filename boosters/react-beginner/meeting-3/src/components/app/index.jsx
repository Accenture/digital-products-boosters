import React from "react";
import Messages from "../messages";
import ProgressBars from "../progress-bars";
import RepositoryPicker from "../repository-picker";

const App = () => (
  <div>
    <RepositoryPicker />
    <ProgressBars />
    <Messages />
  </div>
);

export default App;
