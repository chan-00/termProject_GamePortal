//react hook import
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//bootstrap 속성 import
import { Search } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
//css import 
import "../css/Header.css";
//recoil import
import { useRecoilState, useSetRecoilState } from "recoil";
import {userID, isLoggedin} from "../Atoms/atomUserID";
import atomSearchPlain from "../Atoms/atomSearchPlain";
//Functions import
import functionLogout from "../Functions/FunctionsSign/functionLogout";
import functionSignIn from '../Functions/FunctionsSign/functionSignIn';
import functionSignUp from "../Functions/FunctionsSign/functionSignUp";
import functionReduplicationID from "../Functions/FunctionsSign/functionReduplicationID";
import functionAuth from "../Functions/FunctionsUserCorrection/functionAuth";
//import api key
import apikey from "../apikey";


//페이지의 Header 영역에 보여질 html 요소들을 반환하는 component이다.
function Header() {
    //navigate 사용을 위한 useNavigate 변수 선언
    const navigate = useNavigate();

    //api 요청을 보낼 url 값이 들어갈 변수
    let urlApi;

    //사용자가 입력한 게임 검색값을 알기 위한 useRef 연결 값을 선언했다.
    const searchRef = useRef();
    //로그인 이벤트 발생 시 사용자가 입력한 id값과 pw값을 알아내기 위한 useRef 연결
    const loginIdRef = useRef();
    const loginPwRef = useRef();
    //회원가입 이벤트 발생 시 사용자가 입력한 값들을 알기 위한 useRef 연결
    const signupIdRef = useRef();
    const signupPwRef = useRef();
    const signupPwCheckRef = useRef();
    const signupNameRef = useRef();
    const signupEmailRef = useRef();
    //회원 인증을 위한 useRef 값
    const authPwRef = useRef();

    //현재 로그인된 값과 loginStatus로 로그인 여부를 검사한다.
    const [loginID, setLoginID] = useRecoilState(userID);
    const [loginStatus, setLoginStatus] = useRecoilState(isLoggedin);
    //검색어 입력 시 isthereanydeal api에 요청한 후 결과값을 담을 recoil 상태 관리값
    const [plains, setPlains] = useRecoilState(atomSearchPlain);
    //로그인 시 session 반영되면서 recoil 상태 관리에도 반영되도록 set 값을 선언했다.
    const setUserID = useSetRecoilState(userID);
    const setIsLoggedin = useSetRecoilState(isLoggedin);

    //로그인과 회원가입 Modal 창을 띄우기 위한 useState 변수 선언
    const [loginShow, setLoginShow] = useState(false);
    const [signUpShow, setSignUpShow] = useState(false);
    //회원 인증 Modal 창을 띄우기 위한 useState 변수 선언
    const [authShow, setAuthShow] = useState(false);

    //로그아웃 테스트를 위해 임시로 로그아웃 이벤트 함수를 넣었다.
    const handleLogout = () => {
        functionLogout(setLoginID, setLoginStatus, navigate);
    }

    //로그인 Modal 창을 켜고 끄는 이벤트 함수
    const handleLoginShow = () => setLoginShow(true);
    const handleLoginClose = () => setLoginShow(false);
    //회원가입 Modal 창을 켜고 끄는 이벤트 함수
    const handleSignUpShow = () => setSignUpShow(true);
    const handleSignUpClose = () => setSignUpShow(false);
    //회원정보 수정 버튼 클릭 시 회원 인증 Modal 창을 켜고 끄는 이벤트 함수
    const handleUserAuthShow = () => setAuthShow(true);
    const handleUserAuthClose = () => setAuthShow(false);

    //로그인 이벤트 발생 시 백엔드와 통신하는 functionSignIn 함수 호출
    const handleSignInSubmit = (e) => {
        e.preventDefault();
        //로그인 기능 처리 함수 모듈화
        functionSignIn(loginIdRef, loginPwRef, setUserID, setIsLoggedin, handleLoginClose);
    }

    //회원가입 이벤트 발생 시 백엔드와 통신하는 functionSignUp 함수 호출
    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        //로그인 기능 처리 함수 모듈화
        functionSignUp(signupIdRef, signupPwRef, signupPwCheckRef, signupNameRef, signupEmailRef, setUserID, setIsLoggedin, handleSignUpClose);
    }

    //회원 인증 버튼 클릭 시 호출되는 이벤트 함수
    const handleAuthSubmit = (e) => {
        e.preventDefault();
        //백엔드와 통신하는 함수 호출
        functionAuth(loginID, authPwRef, navigate, handleUserAuthClose);
    }

    //회원가입 시 중복확인 함수를 호출하는 이벤트 함수이다.
    const handleReduplicationID = () => {
        //중복확인 함수를 모듈화 시켰다.
        functionReduplicationID(signupIdRef);
    }

    //검색어를 입력하고 엔터키 혹은 버튼을 눌렀을 때 호출되는 submit 이벤트 함수
    //이 이벤트가 일어날 때 사용자가 입력한 검색어 값으로 api 요청을 fetch로 보내고, 결과를 받아 값을 recoil 변수값에 저장한 후,
    //페이지 새로고침을 해도 검색 결과가 유지되게 하기 위해 session에도 데이터를 세팅한다.
    const handleSearchSubmit = (e) => {
        e.preventDefault();

        window.sessionStorage.setItem("userSearch", searchRef.current.value);
        urlApi = `https://api.isthereanydeal.com/v02/search/search/?key=${apikey.myApiKey}&q=${window.sessionStorage.userSearch}&limit=30&strict=0`;
        fetch(urlApi).then((response) => response.json()).then((data) => {
            setPlains(data.data.results);
            navigate("/detailsearch");
        });
    }

    //Game Portal 로고, 검색어 입력 영역,
    //로그인 되었다면 mypage 연결 버튼 렌더링과 로그인 되어 있지 않다면
    //로그인과 회원가입 페이지로 연결되는 버튼을 렌더링하도록 하는 jsx 코드이다.
    return (
        <div id="headerAllContainer">
            <form id="headerContainer" onSubmit={handleSearchSubmit}>
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
                    <button type="submit"><Search /></button>
                </div>
                {window.sessionStorage.id
                ? <div id="accountBtnContainer">
                    <DropdownButton title={loginID} variant="outline-secondary" id="accountBtn">
                        <Dropdown.Item onClick={handleUserAuthShow}>회원정보 수정</Dropdown.Item>
                        <Dropdown.Item><Link to="/favoritegames">찜한 게임</Link></Dropdown.Item>
                        <Dropdown.Item><Link to="/messagebox">쪽지함</Link></Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </DropdownButton>
                </div>
                : <div id="userBtnContainer">
                    <Button variant="outline-secondary" onClick={handleLoginShow}>Sign In</Button>
                    <Button variant="outline-secondary" onClick={handleSignUpShow}>Sign Up</Button>
                </div>}
            </form>
            <Modal show={loginShow} onHide={handleLoginClose} centered>
                <Modal.Header className="px-4" closeButton>
                    <Modal.Title className="ms-auto">Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSignInSubmit}>
                        <FormGroup className="mb-3" controlId="userID">
                            <FormLabel>ID</FormLabel>
                            <FormControl
                                type="text"
                                placeholder="아이디를 입력하세요"
                                ref={loginIdRef}
                                autoFocus
                                required
                            />
                        </FormGroup>
                        <FormGroup className="mb-3" controlId="userPW">
                            <FormLabel>Password</FormLabel>
                            <FormControl
                                type="password"
                                placeholder="비밀번호를 입력하세요"
                                ref={loginPwRef}
                                required
                            />
                        </FormGroup>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <Modal show={signUpShow} onHide={handleSignUpClose}>
                <Modal.Header className="px-4" closeButton>
                    <Modal.Title className="ms-auto">Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSignUpSubmit}>
                        <FormGroup className="mb-3" controlId="userID">
                            <FormLabel>ID</FormLabel>
                            <FormControl
                                type="text"
                                placeholder="아이디를 입력하세요"
                                ref={signupIdRef}
                                autoFocus
                                required
                            />
                            <Button 
                                variant="outline-secondary"
                                style={{marginTop: "7px"}}
                                onClick={handleReduplicationID}>
                                중복 확인
                            </Button>
                        </FormGroup>
                        <FormGroup className="mb-3" controlId="userPW">
                            <FormLabel>Password</FormLabel>
                            <FormControl
                                type="password"
                                placeholder="비밀번호를 입력하세요"
                                ref={signupPwRef}
                                required
                            />
                        </FormGroup>
                        <FormGroup className="mb-3" controlId="userPWCheck">
                            <FormLabel>Password Check</FormLabel>
                            <FormControl
                                type="password"
                                placeholder="비밀번호를 입력하세요"
                                ref={signupPwCheckRef}
                                required
                            />
                        </FormGroup>
                        <FormGroup className="mb-3" controlId="userName">
                            <FormLabel>Name</FormLabel>
                            <FormControl
                                type="text"
                                placeholder="사용할 이름을 입력하세요"
                                ref={signupNameRef}
                                required
                            />
                        </FormGroup>
                        <FormGroup className="mb-3" controlId="userEmail">
                            <FormLabel>Email</FormLabel>
                            <FormControl
                                type="email"
                                placeholder="이메일을 입력하세요"
                                ref={signupEmailRef}
                                required
                            />
                        </FormGroup>
                        <Button variant="primary" type="submit">
                            Sign Up
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <Modal show={authShow} onHide={handleUserAuthClose} centered>
                <Modal.Header className="px-4" closeButton>
                    <Modal.Title className="ms-auto">회원 인증</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAuthSubmit}>
                        <FormGroup className="mb-3" controlId="userPW">
                            <FormLabel>현재 비밀번호</FormLabel>
                            <FormControl
                                type="password"
                                placeholder="비밀번호를 입력하세요"
                                ref={authPwRef}
                                required
                                autoFocus
                            />
                        </FormGroup>
                        <Button variant="primary" type="submit">
                            회원 인증
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Header;