//bootstrap import
import Button from 'react-bootstrap/Button';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
//css import
import "../css/ProfileUpdate.css";
//react hook import
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//Functions import
import functionChangeUser from "../Functions/functionChangeUser";
import functionDefaultAccount from '../Functions/functionDefaultAccount';

function ProfileUpdate() {
    const pwRef = useRef();
    const nameRef = useRef();
    const emailRef = useRef();

    const navigate = useNavigate();

    const [defaultUserValue, setDefaultUserValue] = useState({});

    const handleChanegeSubmit = (e) => {
        e.preventDefault();
        functionChangeUser(pwRef, nameRef, emailRef, navigate);
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
                <Button variant="outline-danger" style={{marginLeft: "1em"}}>
                    회원 탈퇴
                </Button>
            </Form>
        </div>
    )
}

export default ProfileUpdate;