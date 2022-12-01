//react hook import
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
//user component import
import Header from "./component/Header";
//react component import
import Main from "./component/Main";
import ProfileUpdate from "./component/ProfileUpdate";
import FavoriteGames from "./component/FavoriteGames";
import MessageBox from "./component/MessageBox";
import DetailSearch from "./component/DetailSearch";
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
          <Route path="/profileupdate" element={<ProfileUpdate></ProfileUpdate>}></Route>
          <Route path="/favoritegames" element={<FavoriteGames></FavoriteGames>}></Route>
          <Route path="/messagebox" element={<MessageBox></MessageBox>}></Route>
          <Route path="/detailsearch" element={<DetailSearch></DetailSearch>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
