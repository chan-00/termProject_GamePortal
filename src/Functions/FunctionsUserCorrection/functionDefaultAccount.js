import axios from "axios";

//회원 수정 페이지 첫 렌더링 시 호출되는 함수로, 현재 로그인된 계정의 user 데이터를 넘기는 함수이다.
function functionDefaultAccount(loginID, setDefaultUserValue) {
    axios.post("http://localhost:8000/defaultaccount", {
        id: loginID,
    }).then((res) => {
        const { data } = res;
        setDefaultUserValue(data[0]);
    }).catch((err) => {
        console.log(err);
    })
}

export default functionDefaultAccount;