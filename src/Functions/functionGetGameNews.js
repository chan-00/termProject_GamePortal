import axios from "axios";

function functionGetGameNews(setGameNewsList) {
    axios.get("http://localhost:8000/getNewList", {}).then((res) => {
        const { data } = res;
        setGameNewsList(data);
    }).catch((err) => {
        console.log(err);
    })
}

export default functionGetGameNews;