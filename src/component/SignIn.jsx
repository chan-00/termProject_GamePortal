//bootstrap 속성 import
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//css import
import "../css/Sign.css";
//react hook
import {useRef} from "react";

function SignUp() {
    const idRef = useRef();
    const pwRef = useRef();


    const handleSignInSubmit = (e) => {
        e.preventDefault();


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

export default SignUp;