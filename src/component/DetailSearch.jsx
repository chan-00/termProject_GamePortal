//recoil import
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import atomSearchPlain from "../Atoms/atomSearchPlain";
import atomGameSearchInfo from "../Atoms/atomGameSearchInfo";
//react hook import
import { useEffect, useState } from "react";
//import api key
import apikey from "../apikey";
//Functions import
import functionGetAppID from "../Functions/FunctionsSearch/functionGetAppID";


//사용자가 게임을 검색했을 때 결과 화면을 보여 줄 component
function DetailSearch() {
    //isthereanydeal search api url을 담기 위한 변수
    let urlApi;
    //isthereanydeal 가격 비교 api에 넣을 plain 문자열 변수
    let strPlain;

    //테스트
    const [gameAppID, setGameAppID] = useState([]);
    
    //사용자가 입력한 검색 결과에 대한 api 요청 값이 들어 있는 recoil 상태 관리값
    const [plains, setPlains] = useRecoilState(atomSearchPlain);
    //isthereanydeal api의 search 결과값 title로 스팀의 app id값을 알아낸 후 스팀 game info api 값이 담길 recoil 값
    const [searchInfo, setSearchInfo] = useRecoilState(atomGameSearchInfo);

    useEffect(() => {
        setGameAppID([]);
    }, [window.sessionStorage.userSearchJudgment]);

    //search api의 결과값이 담긴 plains 값이 바뀔 때만 DB와 새로 통신하여 searchAppID 값을 바꾸게 한다.
    useEffect(() => {
        functionGetAppID(plains, setGameAppID);
    }, [plains]);

    useEffect(() => {
        //console.log(gameAppID);
    }, [gameAppID]);

    return (
        <div>
            안녕
        </div>
    )
}

export default DetailSearch;