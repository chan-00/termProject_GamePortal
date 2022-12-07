import axios from "axios";
import server_ip from "../../serverIP.js";

function functionGetAppID(plains, setGameAppID) {
    plains.map((plainObj) => {
        axios.post("http://" + server_ip + ":8000/getSteamAppID", {
            title: plainObj.title
        }).then((res) => {
            const { data } = res;
            console.log({appid: data[0].game_id, title: plainObj.title, plain: plainObj.plain});
            setGameAppID(prev => [...prev, {appid: data[0].game_id, title: plainObj.title, plain: plainObj.plain}]);
        }).catch((err) => {
            //console.log(err);
        })
    });
}

export default functionGetAppID;