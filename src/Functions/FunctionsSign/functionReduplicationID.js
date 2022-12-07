import axios from "axios";
import server_ip from "../../serverIP.js";

function functionReduplicationID(idRef) {
    //회원가입 버튼과 마찬가지로 (, ), ; 3개 값이 들어가지 않게 조건문으로 걸러 준다.
    if(idRef.current.value.includes("(") || idRef.current.value.includes(")") || idRef.current.value.includes(";")) {
        alert("id에 (, ), ; 값 중 하나 이상이 들어가 있습니다.");
        idRef.current.value = "";
        return false;
    }

    //axios로 id 값을 백엔드에 보내서 DB에 입력한 id 값이 1개 이상 존재하는지 확인
    axios.post("http://" + server_ip + ":8000/reduplicationID", {
        id: idRef.current.value
    }).then((res) => {
        //반환된 컬럼 cnt는 현재 user 테이블에 입력한 아이디 값이 존재하는지 count한 결과값으로,
        //이 컬럼 값이 1 이상이라면 아이디가 중복되기 떄문에 경고창을 띄운다.
        if(res.data[0].cnt >= 1) {
            alert("이미 존재하는 아이디입니다.");
            idRef.current.value = "";
            idRef.current.focus();
        } else {
            //위의 조건식에 걸리지 않는다면 아이디 중복이 되지 않기 때문에 사용 가능하다는 알림을 띄운다.
            alert("사용 가능한 아이디입니다.");
        }
    }).catch((err) => {
        console.log(err);
    })
}

export default functionReduplicationID;