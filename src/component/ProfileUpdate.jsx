//bootstrap import
import Button from 'react-bootstrap/Button';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
//css import
import "../css/ProfileUpdate.css";
//react hook import
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//Functions import
import functionChangeUser from "../Functions/FunctionsUserCorrection/functionChangeUser";
import functionDefaultAccount from '../Functions/FunctionsUserCorrection/functionDefaultAccount';
//recoil import
import { useSetRecoilState } from "recoil";
import { userID, isLoggedin } from "../Atoms/atomUserID";

//회원 수정 페이지 component
function ProfileUpdate() {
    //회원 수정 페이지에서 회원 탈퇴 시 회원 정보를 DB에서 삭제함과 동시에,
    //현재 로그인 되어 있는 ID 정보도 초기화 해야 하기 때문에 useSetRecoilState로 변경 함수값을 가져온다.
    const setLoginID = useSetRecoilState(userID);
    const setLoginStatus = useSetRecoilState(isLoggedin);

    //회원 정보 수정을 위한 useRef
    const pwRef = useRef();
    const nameRef = useRef();
    const emailRef = useRef();

    const navigate = useNavigate();

    //처음 회원 수정 페이지에 들어왔을 때 default 값으로 현재 계정의 name, email 값을 넣어 주기 위한 State 상태 관리값
    const [defaultUserValue, setDefaultUserValue] = useState({});
    //회원 탈퇴 버튼 클릭 시 Modal 창을 띄우게 하기 위한 State 상태 관리값
    const [secessionShow, setSecessionShow] = useState(false);

    //Modal 창 활성/비활성화를 위한 State 값의 변경 함수
    const handleSecessionShow = () => setSecessionShow(true);
    const handleSecessionClose = () => setSecessionShow(false);

    //회원 정보 변경 시 DB와의 통신이 일어나게끔 이벤트 함수 내에서 functionChangeUser 함수를 호출한다.
    const handleChanegeSubmit = (e) => {
        e.preventDefault();
        functionChangeUser(pwRef, nameRef, emailRef, navigate);
    }

    //회원 탈퇴 클릭 시 axios 통신으로 현재 로그인 계정의 ID 값을 보내는 이벤트 함수이다.
    const handleAccountDelete = () => {
        axios.post("http://localhost:8000/deleteAccount", {
            id: window.sessionStorage.id
        }).then((res) => {
            //axios 통신이 성공적으로 처리되면 해당 회원의 계정이 delete된 것이므로,
            //알림창을 띄운 후 현재 로그인 상태(atom)값을 초기화(setLoginID, setLoginStatus)시킨다.
            alert("회원 탈퇴 되었습니다.");
            setLoginID("");
            setLoginStatus(false);
            //현재 브라우저의 세션 값도 초기화 시킨 후 회원 탈퇴 Modal 창을 닫게 하고 메인 페이지로 이동시킨다.
            window.sessionStorage.clear();
            handleSecessionClose();
            navigate("/");
        }).catch((err) => {
            console.log(err);
        })
    }

    //회원 수정 페이지에 처음 들어왔을 때 DB에 연결하여 현 계정의 name과 email 값을 알아내야 하기 때문에,
    //해당 기능을 하는 함수(functionDefaultAccount)를 컴포넌트 첫 렌더링 시 호출되는 useEffect 안에서 호출함으로써
    //name과 email 값을 default 값으로 넣어주게 된다.
    useEffect(() => {
        functionDefaultAccount(window.sessionStorage.id, setDefaultUserValue);
    }, []);

    return (
        <div id="signAllContainer">
            <Form id="signContainer" onSubmit={handleChanegeSubmit}>
                <h3>회원 수정</h3>
                <FormGroup controlId="inputPW">
                    <FormLabel className='formLabel'>Change Password</FormLabel>
                    <FormControl 
                        className='formInput' 
                        type="password" 
                        placeholder="변경할 비밀번호를 입력하세요" 
                        ref={pwRef} 
                        required/>
                </FormGroup>
                <FormGroup controlId="inputName">
                    <FormLabel className='formLabel'>Change Name</FormLabel>
                    <FormControl 
                        className='formInput' 
                        type="text" 
                        placeholder="변경할 이름을 입력하세요" 
                        ref={nameRef}
                        defaultValue={defaultUserValue.user_name ? defaultUserValue.user_name : null}
                        required />
                </FormGroup>
                <FormGroup controlId="inputEmail">
                    <FormLabel className='formLabel'>Change Email</FormLabel>
                    <FormControl 
                        className='formInput' 
                        type="email" 
                        placeholder="변경할 이메일을 입력하세요" 
                        ref={emailRef}
                        defaultValue={defaultUserValue.email ? defaultUserValue.email : null}
                        required />
                </FormGroup>
                <Button variant="outline-primary" type="submit">
                    정보 수정
                </Button>
                <Button variant="outline-danger" style={{marginLeft: "1em"}} onClick={handleSecessionShow}>
                    회원 탈퇴
                </Button>
            </Form>
            <Modal show={secessionShow} onHide={handleSecessionClose}>
                <Modal.Body>정말 회원 탈퇴하시겠습니까?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleSecessionClose}>
                    취소
                </Button>
                <Button variant="danger" onClick={handleAccountDelete}>
                    탈퇴
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ProfileUpdate;