import axios from "axios";

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