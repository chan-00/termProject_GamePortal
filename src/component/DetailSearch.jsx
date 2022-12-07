//recoil import
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import atomSearchPlain from "../Atoms/atomSearchPlain";
import atomSearchGameID from "../Atoms/atomSearchGameID";
//react hook import
import { useEffect } from "react";
//import api key
import apikey from "../apikey";
//Functions import
import functionGetAppID from "../Functions/FunctionsSearch/functionGetAppID";


//사용자가 게임을 검색했을 때 결과 화면을 보여 줄 component
function DetailSearch() {
    //isthereanydeal search api url을 담기 위한 변수
    let urlApi;
    
    //사용자가 입력한 검색 결과에 대한 api 요청 값이 들어 있는 recoil 상태 관리값
    const [plains, setPlains] = useRecoilState(atomSearchPlain);
    //isthereanydeal search api로 얻어낸 plain, title 값과 title값으로 DB에서 얻어낸 steam app id 값이 들어갈 recoil 상태 관리값
    const [ searchAppID, setSearchAppID ] = useRecoilState(atomSearchGameID);

    //사용자가 새로고침해도 기존의 검색어로 검색 결과가 나올 수 있게 useEffect로 처음 DetailSearch 페이지가 렌더링될 때 search api를 호출하여 값을 담는다.
    useEffect(() => {
        urlApi = `https://api.isthereanydeal.com/v02/search/search/?key=${apikey.myApiKey}&q=${window.sessionStorage.userSearch}&limit=30&strict=0`;
        fetch(urlApi).then((response) => response.json()).then((data) => {
            setPlains(data.data.results);
        });
    }, []);

    //search api의 결과값이 담긴 plains 값이 바뀔 때만 DB와 새로 통신하여 searchAppID 값을 바꾸게 한다.
    useEffect(() => {
        //functionGetAppID(plains, setSearchAppID);
        console.log(plains);
    }, [plains]);

    return (
        <div>
            안녕
        </div>
    )
}

export default DetailSearch;