import axios from "axios";

//Main component 첫 렌더링 시 DB에 있는 게임 뉴스를 갖고 와서 화면에 넣을 recoil 값을 세팅하는 함수이다.
function functionGetGameNews(setGameNewsList) {
    axios.get("http://localhost:8000/getNewsList", {}).then((res) => {
        const { data } = res;
        setGameNewsList(data);
    }).catch((err) => {
        console.log(err);
    })
}

export default functionGetGameNews;