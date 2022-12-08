import axios from "axios";
import server_ip from "../../serverIP.js";

function functionGetAppID(plains, setGameAppID) {
    plains.map((plainObj) => {
        if(plainObj.title.indexOf(";") === -1) {
            axios.post("http://" + server_ip + ":8000/getSteamAppID", {
                title: plainObj.title
            }).then((res) => {
                const { data } = res;
                if(data[0].game_id) {
                    setGameAppID(prev => [...prev, {appid: data[0].game_id, title: plainObj.title, plain: plainObj.plain}]);
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    });
}

export default functionGetAppID;