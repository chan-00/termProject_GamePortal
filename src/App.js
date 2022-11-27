//react hook import
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
//user component import
import Header from "./component/Header";
import Main from "./component/Main";
//css import
import "./css/App.css";

function App() {
  //react-router-dom의 BrowserRouter를 활용하여 현재 주소값에 따라,
  //상황에 맞는 component를 렌더링하도록 하는 코드이다.
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Main></Main>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
