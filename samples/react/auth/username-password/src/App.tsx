import "./App.css";
import "@aws-amplify/ui-react/styles.css";

import AppContainer from "./components/AppContainer/AppContainer";
import StateManagement from "./components/StateManagement/StateManagement";
import ErrorReporting from "./components/ErrorReporting/ErrorReporting";

function App() {
  return (
    <div className="App">
      <div className="app-container">
        <AppContainer />
      </div>

      <div className="debugging-container">
        <StateManagement />
        <ErrorReporting />
      </div>
    </div>
  );
}

export default App;
