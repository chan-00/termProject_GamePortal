import axios from "axios";

function functionSignIn(idRef, pwRef, setUserID, setIsLoggedin, navigate) {
    if (idRef.current.value.includes("(") || idRef.current.value.includes(")") || idRef.current.value.includes(";")) {
        alert("id에 (, ), ; 값 중 하나 이상이 들어가 있습니다.!");
        idRef.current.focus();
        return false;
    }
    if (pwRef.current.value.includes("(") || pwRef.current.value.includes(")") || pwRef.current.value.includes(";")) {
        alert("비밀번호에 (, ), ; 값 중 하나 이상이 들어가 있습니다.");
        pwRef.current.focus();
        return false;
    }

    axios.post("http://localhost:8000/login", {
        id: idRef.current.value,
        pw: pwRef.current.value,
    }).then((res) => {
        console.log(res.data[0].cnt);
        if (res.data[0].cnt === 1) {
            alert("로그인 성공!");
            window.sessionStorage.setItem("id", idRef.current.value);
            setUserID(idRef.current.value);
            setIsLoggedin(true);
            navigate("/");
        } 
        else {
            alert("로그인 실패!");
            idRef.current.value = "";
            pwRef.current.value = "";
        }
    }).catch((err) => {
        console.log(err);
    })
}

export default functionSignIn;