import axios from "axios";
import server_ip from "../../serverIP.js";

function functionSignUp(idRef, pwRef, pwCheckRef, nameRef, emailRef, setUserID, setIsLoggedin, handleSignUpClose) {
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
        axios.post("http://" + server_ip + ":8000/signup", {
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
                handleSignUpClose();
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

export default functionSignUp;