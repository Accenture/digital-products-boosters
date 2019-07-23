import React from "react";
import "./App.css";

const baseUrl = "https://accenture.github.io/digital-products-boosters/";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Digital Product Boosters</h1>
        <a href={`${baseUrl}/slides/react-beginner/meeting-1`}>
          Beginner React - Meeting 1
        </a>
        <a href={`${baseUrl}/slides/react-beginner/meeting-2`}>
          Beginner React - Meeting 2
        </a>
        <a href={`${baseUrl}/slides/react-beginner/meeting-3`}>
          Beginner React - Meeting 3
        </a>
        <a href={`${baseUrl}/slides/react-beginner/meeting-4`}>
          Beginner React - Meeting 4
        </a>
        <a href="https://github.com/Accenture/digital-products-boosters">
          Github
        </a>
      </header>
    </div>
  );
}

export default App;
