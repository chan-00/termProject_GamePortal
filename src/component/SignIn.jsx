//bootstrap 속성 import
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//css import
import "../css/Sign.css";
//react hook
import {useRef} from "react";
import { useNavigate } from 'react-router-dom';
//Functions import
import functionSignIn from '../Functions/functionSignIn';
//recoil import
import { useSetRecoilState } from "recoil";
import {userID, isLoggedin} from "../Atoms/atomUserID";

//component function
function SignIn() {
    //로그인 시 id, 비밀번호 값을 알기 위한 useRef 선언
    const idRef = useRef();
    const pwRef = useRef();

    const navigate = useNavigate();

    //로그인 시 session 반영되면서 recoil 상태 관리에도 반영되도록 set 값을 선언했다.
    const setUserID = useSetRecoilState(userID);
    const setIsLoggedin = useSetRecoilState(isLoggedin);

    //로그인 버튼 클릭 시 이 함수 호출
    const handleSignInSubmit = (e) => {
        e.preventDefault();
        //로그인 기능 처리 함수 모듈화
        functionSignIn(idRef, pwRef, setUserID, setIsLoggedin, navigate);
    }

    return (
        <Form className="signContainer" onSubmit={handleSignInSubmit}>
            <div className="inputContainer">
                <h2 className="signTitle">Sign In Page</h2>
                <FormGroup controlId="inputID">
                    <FormLabel>ID</FormLabel>
                    <FormControl 
                        type="text"
                        placeholder="아이디를 입력하세요" 
                        ref={idRef} 
                        required/>
                </FormGroup>
                <FormGroup controlId="inputPW">
                    <FormLabel>Password</FormLabel>
                    <FormControl 
                        type="password" 
                        placeholder="비밀번호를 입력하세요" 
                        ref={pwRef}
                        required/>
                </FormGroup>
                <Button 
                    variant="outline-primary" 
                    type="submit"
                    style={{marginTop: "20px"}}>
                    Sign In
                </Button>
            </div>
        </Form>
    )
}

export default SignIn;