import axios from "axios";

function functionGetGameRank(setGameRankList) {
    axios.get("http://localhost:8000/getRankList", {}).then((res) => {
        const { data } = res;
        setGameRankList(data);
    }).catch((err) => {
        console.log(err);
    })
}

export default functionGetGameRank;