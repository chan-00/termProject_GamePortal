//react hook import
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
//user component import
import Header from "./component/Header";
import Main from "./component/Main";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";

function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Main></Main>}></Route>
          <Route path="/signin" element={<SignIn></SignIn>}></Route>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
