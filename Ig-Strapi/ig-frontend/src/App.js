import Home from "./pages/Home";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Create from "./pages/Create";
import Nav from "./components/Nav";
import SinglePost from "./pages/SinglePost";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/create" component={Create} exact />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/:id" exact component={SinglePost} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
