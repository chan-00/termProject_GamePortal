import axios from "axios";

//로그인 이벤트 발생 시 호출되는 함수로, 로그인 창에 입력한 id와 pw 값을 갖고 DB에 select 문을 요청하는 로그인 함수이다.
//DB에서 해당 ID와 PW 값을 갖고 select문으로 해당되는 행이 몇 개 있나 count(*)로 세기 때문에 결과값에 있는 cnt가 1이라면 로그인 성공으로 간주하는 방식이다.
function functionSignIn(idRef, pwRef, setUserID, setIsLoggedin, handleLoginClose) {
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
            handleLoginClose();
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