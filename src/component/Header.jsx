//react hook import
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
//bootstrap 속성 import
import { Search, PersonCircle } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
//css import 
import "../css/Header.css";
//recoil import
import { useRecoilState } from "recoil";
import {userID, isLoggedin} from "../Atoms/atomUserID";
//Functions import
import functionLogout from "../Functions/functionLogout";

//페이지의 Header 영역에 보여질 html 요소들을 반환하는 component이다.
function Header() {
    const navigate = useNavigate();

    //사용자가 입력한 게임 검색값을 알기 위한 useRef 연결 값을 선언했다.
    const searchRef = useRef();

    //현재 로그인된 값과 loginStatus로 로그인 여부를 검사한다.
    const [loginID, setLoginID] = useRecoilState(userID);
    const [loginStatus, setLoginStatus] = useRecoilState(isLoggedin);

    //로그아웃 테스트를 위해 임시로 로그아웃 이벤트 함수를 넣었다.
    const handleLogout = () => {
        functionLogout(setLoginID, setLoginStatus, navigate);
    }

    //Game Portal 로고, 검색어 입력 영역,
    //로그인 되었다면 mypage 연결 버튼 렌더링과 로그인 되어 있지 않다면
    //로그인과 회원가입 페이지로 연결되는 버튼을 렌더링하도록 하는 jsx 코드이다.
    return (
        <form id="headerContainer">
            <div id="mainLogoContainer">
                <Link to="/" id="mainLogo">Game Portal</Link>
            </div>
            <div id="searchTextContainer">
                <input
                    type="text"
                    ref={searchRef}
                    placeholder="검색어를 입력하세요"
                    id="searchTextBox"
                ></input>
                <button><Search /></button>
            </div>
            {window.sessionStorage.id
            ? <div id="accountBtnContainer">
                <button id="accountBtn"><PersonCircle /></button>
                {/*<button onClick={handleLogout}>logout</button>*/}
                <button onClick={handleLogout}>logout</button>
            </div>
            : <div id="userBtnContainer">
                <Link to="/signin"><Button variant="outline-secondary">Sign In</Button></Link>
                <Link to="/signup" style={{marginLeft: "20px"}}><Button variant="outline-secondary">Sign Up</Button></Link>
            </div>}
        </form>
    )
}

export default Header;