import axios from "axios";
import server_ip from "../../serverIP.js";

//회원 수정 페이지에 들어가기 전 Modal 창에서 비밀번호 입력을 통해 회원 인증을 하도록 하는 비밀번호 인증 함수
function functionAuth(loginID, authPwRef, navigate, handleUserAuthClose) {
    if (authPwRef.current.value.includes("(") || authPwRef.current.value.includes(")") || authPwRef.current.value.includes(";")) {
        alert("비밀번호에 (, ), ; 값 중 하나 이상이 들어가 있습니다.");
        authPwRef.current.focus();
        return false;
    }

    axios.post("http://" + server_ip + ":8000/authpassword", {
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