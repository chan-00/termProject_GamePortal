import axios from "axios";
import server_ip from "../../serverIP.js";

function functionGetSaleCalendar(setSaleCalendar) {
    axios.get("http://" + server_ip + ":8000/getSaleCalendar", {}).then((res) => {
        const { data } = res;
        setSaleCalendar(data);
    }).catch((err) => {
        console.log(err);
    })
}

export default functionGetSaleCalendar;