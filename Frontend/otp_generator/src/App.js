import "./App.css";
import FrontPage from "./components/FrontPage";
import OTPPage from "./components/OTPPage";
import Welcome from "./components/Welcome";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={FrontPage} />
        <Route exact path="/otp" component={OTPPage} />
        <Route exact path="/welcome" component={Welcome} />
      </Switch>
    </div>
  );
}

export default App;
