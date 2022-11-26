//bootstrap 속성 import
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
//css import
import "../css/Sign.css";
//react hook
import axios from "axios";
import {useRef} from "react";
import {useNavigate} from "react-router-dom";
//recoil import
import { useSetRecoilState } from "recoil";
import {userID, isLoggedin} from "../Atoms/atomUserID";

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
        //회원가입 버튼과 마찬가지로 (, ), ; 3개 값이 들어가지 않게 조건문으로 걸러 준다.
        if(idRef.current.value.includes("(") || idRef.current.value.includes(")") || idRef.current.value.includes(";")) {
            alert("id에 (, ), ; 값 중 하나 이상이 들어가 있습니다.");
            idRef.current.value = "";
            return false;
        }

        //axios로 id 값을 백엔드에 보내서 DB에 입력한 id 값이 1개 이상 존재하는지 확인
        axios.post("http://localhost:8000/reduplicationID", {
            id: idRef.current.value
        }).then((res) => {
            //반환된 컬럼 cnt는 현재 user 테이블에 입력한 아이디 값이 존재하는지 count한 결과값으로,
            //이 컬럼 값이 1 이상이라면 아이디가 중복되기 떄문에 경고창을 띄운다.
            if(res.data[0].cnt >= 1) {
                alert("이미 존재하는 아이디입니다.");
                idRef.current.value = "";
                idRef.current.focus();
            } else {
                //위의 조건식에 걸리지 않는다면 아이디 중복이 되지 않기 때문에 사용 가능하다는 알림을 띄운다.
                alert("사용 가능한 아이디입니다.");
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    //Sign Up 버튼을 눌렀을 때 호출되는 함수이다.
    const handleSignUpSubmit = (e) => {
        //submit 이벤트 발생 시 기본 동작으로 페이지가 새로고침 되는데,
        //이 기본 동작을 막기 위해 preventDefault를 했다.
        e.preventDefault();

        //데이터베이스로 sql 쿼리 문으로 데이터를 넘길 때 밑의 3개 값이 포함되면 에러가 발생할 수 있기에 사전 차단하기 위한 조건문을 쓴다.
        if(idRef.current.value.includes("(") || idRef.current.value.includes(")") || idRef.current.value.includes(";")) {
            alert("id에 (, ), ; 값 중 하나 이상이 들어가 있습니다.");
            idRef.current.value = "";
            return false;
        }
        if(pwRef.current.value.includes("(") || pwRef.current.value.includes(")") || pwRef.current.value.includes(";")) {
            alert("비밀번호에 (, ), ; 값 중 하나 이상이 들어가 있습니다.");
            pwRef.current.value = "";
            return false;
        }
        if(nameRef.current.value.includes("(") || nameRef.current.value.includes(")") || nameRef.current.value.includes(";")) {
            alert("이름에 (, ), ; 값 중 하나 이상이 들어가 있습니다.");
            nameRef.current.value = "";
            return false;
        }
        if(emailRef.current.value.includes("(") || emailRef.current.value.includes(")") || emailRef.current.value.includes(";")) {
            alert("email에 (, ), ; 값 중 하나 이상이 들어가 있습니다.");
            emailRef.current.value = "";
            return false;
        }

        //비밀번호와 비밀번호 체크 값이 같은지 확인하여 같으면 axios로 서버에 값을 보낸다.
        if(pwRef.current.value === pwCheckRef.current.value) {
            //axios post 방식으로 서버 url에 signup 요청을 보낸다.(입력한 값도 같이 보냄)
            axios.post("http://localhost:8000/signup", {
                id: idRef.current.value,
                pw: pwRef.current.value,
                name: nameRef.current.value,
                email: emailRef.current.value
            }).then((res) => {
                //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
                //결과값 안의 affectedRows는 데이터베이스에 영향을 준 행 수를 나타내는 값으로
                //이 값이 1이라면 새로운 유저 데이터를 1행 넣는 것에 성공했다는 의미이다.
                //그럴 때 회원가입 성공 메시지와 함께 session 데이터에 현재 로그인 id 계정을 넣고 메인 페이지로 가게 한다.
                if(res.data.affectedRows === 1) {
                    alert("회원가입 성공!");
                    setUserID(idRef.current.value);
                    setIsLoggedin(true);
                    window.sessionStorage.setItem("id", idRef.current.value);
                    navigate("/");
                }
                else {
                    //위의 조건이 아니라면 회원가입 실패 메시지를 띄운다.
                    alert("회원가입 실패!(아이디 중복확인 테스트)");
                    idRef.current.value = "";
                    pwRef.current.value = "";
                    nameRef.current.value = "";
                    emailRef.current.value = "";
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            //else 문으로 들어왔다는 것은 비밀번호와 재확인 값이 같지 않은 경우므로 에러 메시지를 띄운다.
            alert("비밀번호와 비밀번호 재확인 값이 같지 않습니다.");
            pwCheckRef.current.focus();
        }
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