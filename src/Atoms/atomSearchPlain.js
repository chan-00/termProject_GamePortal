import { atom } from "recoil";
//사용자가 검색어를 입력했을 때 관련성 순으로 검색 api를 돌린 결과를 담을 recoil 상태변수 값
const atomSearchPlain = atom({
    key: "atomSearchPlain",
    default: []
});

export default atomSearchPlain;