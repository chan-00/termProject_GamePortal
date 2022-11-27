//react hook import
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
//user component import
import Header from "./component/Header";
import Main from "./component/Main";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
//Functions import
import functionBodyClick from "./Functions/functionBodyClick";
//recoil import
import viisibilityAccountList from "./Atoms/atomVisibilityAccountList";
import {useSetRecoilState} from "recoil";
//css import
import "./css/App.css";

function App() {
  const setIsAccountListVisible = useSetRecoilState(viisibilityAccountList);

  const handleBodyClick = (e) => {
    functionBodyClick(e, setIsAccountListVisible);
  }

  //react-router-dom의 BrowserRouter를 활용하여 현재 주소값에 따라,
  //상황에 맞는 component를 렌더링하도록 하는 코드이다.
  return (
    <div className="App" onClick={handleBodyClick}>
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
