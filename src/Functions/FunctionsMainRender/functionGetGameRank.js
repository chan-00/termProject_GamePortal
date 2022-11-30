import axios from "axios";

//Main 페이지에서 인기 게임 순위 리스트 데이터를 가져와서 recoil 상태 관리 데이터에 넣어 주는 기능의 함수이다.
function functionGetGameRank(setGameRankList) {
    axios.get("http://localhost:8000/getRankList", {}).then((res) => {
        const { data } = res;
        setGameRankList(data);
    }).catch((err) => {
        console.log(err);
    })
}

export default functionGetGameRank;