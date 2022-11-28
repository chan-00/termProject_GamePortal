import axios from "axios";

function functionAuth(loginID, authPwRef, navigate, handleUserAuthClose) {
    if (authPwRef.current.value.includes("(") || authPwRef.current.value.includes(")") || authPwRef.current.value.includes(";")) {
        alert("비밀번호에 (, ), ; 값 중 하나 이상이 들어가 있습니다.");
        authPwRef.current.focus();
        return false;
    }

    axios.post("http://localhost:8000/authpassword", {
        id: loginID,
        pw: authPwRef.current.value,
    }).then((res) => {
        console.log(res.data[0].cnt);
        if (res.data[0].cnt === 1) {
            alert("회원인증 성공!");
            navigate("/profileupdate");
            handleUserAuthClose();
        }
        else {
            alert("회원인증 실패!");
            authPwRef.current.value = "";
        }
    }).catch((err) => {
        console.log(err);
    })
}

export default functionAuth;