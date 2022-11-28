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
import functionChangeUser from "../Functions/functionChangeUser";
import functionDefaultAccount from '../Functions/functionDefaultAccount';
//recoil import
import { useSetRecoilState } from "recoil";
import { userID, isLoggedin } from "../Atoms/atomUserID";


function ProfileUpdate() {
    const setLoginID = useSetRecoilState(userID);
    const setLoginStatus = useSetRecoilState(isLoggedin);

    const pwRef = useRef();
    const nameRef = useRef();
    const emailRef = useRef();

    const navigate = useNavigate();

    const [defaultUserValue, setDefaultUserValue] = useState({});
    const [secessionShow, setSecessionShow] = useState(false);

    const handleSecessionShow = () => setSecessionShow(true);
    const handleSecessionClose = () => setSecessionShow(false);

    const handleChanegeSubmit = (e) => {
        e.preventDefault();
        functionChangeUser(pwRef, nameRef, emailRef, navigate);
    }

    const handleAccountDelete = () => {
        axios.post("http://localhost:8000/deleteAccount", {
            id: window.sessionStorage.id
        }).then((res) => {
            alert("회원 탈퇴 되었습니다.");
            setLoginID("");
            setLoginStatus(false);
            window.sessionStorage.clear();
            handleSecessionClose();
            navigate("/");
        }).catch((err) => {
            console.log(err);
        })
    }

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
                        ref={pwRef} />
                </FormGroup>
                <FormGroup controlId="inputName">
                    <FormLabel className='formLabel'>Change Name</FormLabel>
                    <FormControl 
                        className='formInput' 
                        type="text" 
                        placeholder="변경할 이름을 입력하세요" 
                        ref={nameRef}
                        defaultValue={defaultUserValue.user_name ? defaultUserValue.user_name : null}/>
                </FormGroup>
                <FormGroup controlId="inputEmail">
                    <FormLabel className='formLabel'>Change Email</FormLabel>
                    <FormControl 
                        className='formInput' 
                        type="email" 
                        placeholder="변경할 이메일을 입력하세요" 
                        ref={emailRef}
                        defaultValue={defaultUserValue.email ? defaultUserValue.email : null}/>
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