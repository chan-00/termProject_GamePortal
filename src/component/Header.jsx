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
//Functions import
import functionLogout from "../Functions/functionLogout";
import functionSignIn from '../Functions/functionSignIn';
import functionSignUp from "../Functions/functionSignUp";
import functionReduplicationID from "../Functions/functionReduplicationID";
import functionAuth from "../Functions/functionAuth";

//페이지의 Header 영역에 보여질 html 요소들을 반환하는 component이다.
function Header() {
    //navigate 사용을 위한 useNavigate 변수 선언
    const navigate = useNavigate();

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
    //로그인 시 session 반영되면서 recoil 상태 관리에도 반영되도록 set 값을 선언했다.
    const setUserID = useSetRecoilState(userID);
    const setIsLoggedin = useSetRecoilState(isLoggedin);

    //로그인과 회원가입 Modal 창을 띄우기 위한 useState 변수 선언
    const [loginShow, setLoginShow] = useState(false);
    const [signUpShow, setSignUpShow] = useState(false);
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

    //Game Portal 로고, 검색어 입력 영역,
    //로그인 되었다면 mypage 연결 버튼 렌더링과 로그인 되어 있지 않다면
    //로그인과 회원가입 페이지로 연결되는 버튼을 렌더링하도록 하는 jsx 코드이다.
    return (
        <div id="headerAllContainer">
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