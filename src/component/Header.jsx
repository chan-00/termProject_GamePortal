//react hook import
import { useRef } from "react";
import { Link } from "react-router-dom";
//bootstrap 속성 import
import { Search, PersonCircle } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';

//css import 
import "../css/Header.css";

function Header() {
    const searchRef = useRef();

    return (
        <form id="headerContainer">
            <Link to="/">Game Portal</Link>
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
            ? <button><PersonCircle /></button>
            : <div id="userBtnContainer">
                <Link to="/signin"><Button variant="outline-secondary">Sign In</Button></Link>
                <Link to="/signup" style={{marginLeft: "20px"}}><Button variant="outline-secondary">Sign Up</Button></Link>
            </div>}
        </form>
    )
}

export default Header;