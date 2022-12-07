import axios from "axios";
import server_ip from "../../serverIP.js";

function functionGetAppID(plains, setSearchAppID) {
    const tempArr = [];
    const tempObj = { appid: "", title: "", plain: "" };

    plains.map((plainObj) => {
        tempObj.title = plainObj.title;
        tempObj.plain = plainObj.plain;

        axios.post("http://" + server_ip + ":8000/getSteamAppID", {
            title: plainObj.title
        }).then((res) => {
            const { data } = res;
            tempObj.appid = data.appid;

            tempArr.push(tempObj);
        }).catch((err) => {
            console.log(err);
        })
    });

    setSearchAppID(tempArr);
}

export default functionGetAppID;