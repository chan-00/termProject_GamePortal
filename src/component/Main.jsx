//react hook import
import { useEffect } from "react";
//bootstrap import
import Carousel from 'react-bootstrap/Carousel';
//css import
import "../css/Main.css";
//recoil import
import { useRecoilState } from "recoil";
import atomGameRankList from "../Atoms/atomGameRank";
//Functions import
import functionGetGameRank from "../Functions/functionGetGameRank";
//component import
import CarouselGameRank from "./CarouselGameRank";

function Main() {
    //Main 페이지 첫 렌더링 시 인기게임 리스트 값을 받아와 화면에 뿌려주기 위한 recoil 세팅
    const [ gameRankList, setGameRankList ] = useRecoilState(atomGameRankList);

    //페이지 첫 렌더링 시 게임 순위 리스트를 가져오는 함수를 호출하여 gameRankList 값에다 넣는 작업을 한다.
    useEffect(() => {
        functionGetGameRank(setGameRankList);
    }, []);
    console.log(gameRankList);

    //가져온 인기 순위 데이터 길이에 따라 5순위마다 다른 Carousel.Item에 표현하게 한다.
    return (
        <div id="mainContainer">
            <Carousel id="gameRankContainer">
                <Carousel.Item>
                    <div className="gameRankContainer">
                        첫 번째 게임 리스트
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="gameRankContainer">
                        두 번째 게임 리스트
                    </div>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default Main;