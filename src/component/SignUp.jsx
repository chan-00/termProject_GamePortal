//bootstrap 속성 import
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//css import
import "../css/Sign.css";
//react hook
import {useRef} from "react";
import {useNavigate} from "react-router-dom";
//recoil import
import { useSetRecoilState } from "recoil";
import {userID, isLoggedin} from "../Atoms/atomUserID";
//Functions import
import functionSignUp from '../Functions/functionSignUp';
import functionReduplicationID from '../Functions/functionReduplicationID';

//component function
function SignUp() {
    //회원가입 시 아이디, 비번, 이름, 이메일 html 영역과 연결해 주는 코드이다.
    //회원가입/아이디 중복확인 등의 이벤트가 일어났을 시점에 이 Ref의 현재 값을 바탕으로
    //백엔드에 해당 데이터들을 보내 주게 된다.
    const idRef = useRef();
    const pwRef = useRef();
    const pwCheckRef = useRef();
    const nameRef = useRef();
    const emailRef = useRef();
    //특정 이벤트 시 페이지 이동을 위해 useNavigate hook을 활용했다.
    const navigate = useNavigate();

    //회원가입 시 session 반영되면서 recoil 상태 관리에도 반영되도록 set 값을 선언했다.
    const setUserID = useSetRecoilState(userID);
    const setIsLoggedin = useSetRecoilState(isLoggedin);

    //ID 중복확인 버튼을 눌렀을 때 호출되는 이벤트 함수
    const handleReduplicationID = () => {
        //중복확인 함수를 모듈화 시켰다.
        functionReduplicationID(idRef);
    }

    //Sign Up 버튼을 눌렀을 때 호출되는 함수이다.
    const handleSignUpSubmit = (e) => {
        //submit 이벤트 발생 시 기본 동작으로 페이지가 새로고침 되는데,
        //이 기본 동작을 막기 위해 preventDefault를 했다.
        e.preventDefault();
        //데이터 통신과 결과 처리 기능을 functionSignUp 함수로 따로 빼 관리를 했다.
        functionSignUp(idRef, pwRef, pwCheckRef, nameRef, emailRef, setUserID, setIsLoggedin, navigate);
    }

    //jsx return 내용
    //form으로 전체를 묶어 값을 입력한 후 enter 키를 누르거나 버튼을 눌렀을 때
    //onSubmit 이벤트를 감지하여 위에서 정의한 함수가 실행되도록 한다.
    return (
        <Form className="signContainer" onSubmit={handleSignUpSubmit}>
            <div className="inputContainer">
                <h2 className="signTitle">Sign Up Page</h2>
                <FormGroup controlId="inputID">
                    <FormLabel>ID</FormLabel>
                    <FormControl 
                        type="text"
                        placeholder="아이디를 입력하세요" 
                        ref={idRef} 
                        required/>
                    <Button 
                        variant="outline-secondary"
                        style={{marginTop: "7px"}}
                        onClick={handleReduplicationID}>
                        중복 확인
                    </Button>
                </FormGroup>
                <FormGroup controlId="inputPW">
                    <FormLabel>Password</FormLabel>
                    <FormControl 
                        type="password" 
                        placeholder="비밀번호를 입력하세요" 
                        ref={pwRef}
                        required/>
                </FormGroup>
                <FormGroup controlId="inputPWCheck">
                    <FormLabel>Password Check</FormLabel>
                    <FormControl 
                        type="password" 
                        placeholder="비밀번호를 입력하세요" 
                        ref={pwCheckRef}
                        required/>
                </FormGroup>
                <FormGroup controlId="inputName">
                    <FormLabel>Name</FormLabel>
                    <FormControl 
                        type="text" 
                        placeholder="사용하실 이름을 입력하세요" 
                        ref={nameRef}
                        required/>
                </FormGroup>
                <FormGroup controlId="inputEmail">
                    <FormLabel>Email</FormLabel>
                    <FormControl 
                        type="email" 
                        placeholder="이메일을 입력하세요" 
                        ref={emailRef}
                        required/>
                </FormGroup>
                <Button 
                    variant="outline-primary" 
                    type="submit"
                    style={{marginTop: "20px"}}>
                    Sign Up
                </Button>
            </div>
        </Form>
    )
}

export default SignUp;