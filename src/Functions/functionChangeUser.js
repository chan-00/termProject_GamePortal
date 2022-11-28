import axios from "axios";

function functionChangeUser(pwRef, nameRef, emailRef, navigate) {
    if (pwRef.current.value.includes("(") || pwRef.current.value.includes(")") || pwRef.current.value.includes(";")) {
        alert("비밀번호에 (, ), ; 값 중 하나 이상이 들어가 있습니다.");
        pwRef.current.focus();
        return false;
    }
    if (nameRef.current.value.includes("(") || nameRef.current.value.includes(")") || nameRef.current.value.includes(";")) {
        alert("이름에 (, ), ; 값 중 하나 이상이 들어가 있습니다.");
        nameRef.current.focus();
        return false;
    }
    if (emailRef.current.value.includes("(") || emailRef.current.value.includes(")") || emailRef.current.value.includes(";")) {
        alert("이메일에 (, ), ; 값 중 하나 이상이 들어가 있습니다.");
        emailRef.current.focus();
        return false;
    }

    axios.post("http://localhost:8000/updateuser", {
        id: window.sessionStorage.id,
        pw: pwRef.current.value,
        name: nameRef.current.value,
        email: emailRef.current.value,
    }).then((res) => {
        if(res.data.affectedRows === 1) {
            alert("회원정보가 수정되었습니다.");
            navigate("/");
        } else {
            alert("회원정보 수정에 실패하였습니다.");
        }
    }).catch((err) => {
        console.log(err);
    })
}

export default functionChangeUser;