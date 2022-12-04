import { atom } from "recoil";
//isthereanydeal api로 검색 api를 돌렸을 때 얻는 게임 title값을 통해 DB의 스팀 app id 값을 가져와 이 배열에 담는다.
//또한, DB에 있는 게임 정보만 보여줘야 하기에 여기에 isthereanydeal과 스팀의 구분 값인 app id, plain 값을 모두 담는다.
const atomSearchGameID = atom({
    key: "atomSearchGameID",
    default: []
});

export default atomSearchGameID;