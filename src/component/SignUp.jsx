//bootstrap 속성 import
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//css import
import "../css/Sign.css";

function SignUp() {

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    return (
        <Form className="signContainer" onSubmit={handleSubmit}>
            <FormGroup controlId="inputID">
                <FormLabel>ID</FormLabel>
                <FormControl type="text" placeholder="아이디를 입력하세요" />
            </FormGroup>
            <FormGroup controlId="inputPW">
                <FormLabel>Password</FormLabel>
                <FormControl type="password" placeholder="비밀번호를 입력하세요" />
            </FormGroup>
            <FormGroup controlId="inputName">
                <FormLabel>Name</FormLabel>
                <FormControl type="text" placeholder="사용하실 이름을 입력하세요" />
            </FormGroup>
            <FormGroup controlId="inputEmail">
                <FormLabel>Email</FormLabel>
                <FormControl type="email" placeholder="이메일을 입력하세요" />
            </FormGroup>
            <Button variant="outline-primary" type="submit">
                Sign Up
            </Button>
        </Form>
    )
}

export default SignUp;