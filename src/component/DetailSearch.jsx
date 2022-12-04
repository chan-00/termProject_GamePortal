//recoil import
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import atomSearchPlain from "../Atoms/atomSearchPlain";
//react hook import
import { useEffect } from "react";
//import api key
import apikey from "../apikey";

//테스트
import axios from "axios";


//사용자가 게임을 검색했을 때 결과 화면을 보여 줄 component
function DetailSearch() {
    //사용자가 입력한 검색 결과에 대한 api 요청 값이 들어 있는 recoil 상태 관리값
    const searchPlainResult = useRecoilValue(atomSearchPlain);

    console.log("디테일 페이지");
    console.log(searchPlainResult);

    useEffect(() => {

    }, []);

    return (
        <div>
            
        </div>
    )
}

export default DetailSearch;