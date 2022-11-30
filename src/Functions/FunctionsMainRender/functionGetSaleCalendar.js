import axios from "axios";

function functionGetSaleCalendar(setSaleCalendar) {
    axios.get("http://localhost:8000/getSaleCalendar", {}).then((res) => {
        const { data } = res;
        setSaleCalendar(data);
    }).catch((err) => {
        console.log(err);
    })
}

export default functionGetSaleCalendar;