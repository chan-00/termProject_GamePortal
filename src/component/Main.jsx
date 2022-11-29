//react hook import
import { useEffect } from "react";
//bootstrap import
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
//css import
import "../css/Main.css";
//recoil import
import { useRecoilState } from "recoil";
import atomGameRankList from "../Atoms/atomGameRank";
//Functions import
import functionGetGameRank from "../Functions/functionGetGameRank";

function Main() {
    //Main 페이지 첫 렌더링 시 인기게임 리스트 값을 받아와 화면에 뿌려주기 위한 recoil 세팅
    const [ gameRankList, setGameRankList ] = useRecoilState(atomGameRankList);

    //페이지 첫 렌더링 시 게임 순위 리스트를 가져오는 함수를 호출하여 gameRankList 값에다 넣는 작업을 한다.
    useEffect(() => {
        functionGetGameRank(setGameRankList);
    }, []);

    //가져온 인기 순위 데이터를 5순위로 나눠 다른 Carousel.Item에 표현하게 한다.
    return (
        <div id="mainContainer">
            <Carousel id="gameRankContainer" controls={false}>
                <Carousel.Item>
                    <div className="rankCardContainer">
                        {gameRankList.map((rankObj, index) => {
                            if(index >= 0 && index <= 4) {
                                return (
                                    <Card className="rankCard" key={index}>
                                        <Card.Img className="rankCardImage" variant="top" src={rankObj.image} />
                                        <Card.Body>
                                            <Card.Title className="rankCardTitle">{rankObj.game_rank}</Card.Title>
                                            <Card.Text className="rankCardText">{rankObj.title}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                )
                            }
                        })}
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="rankCardContainer">
                        {gameRankList.map((rankObj, index) => {
                            if(index >= 5 && index <= 9) {
                                return (
                                    <Card className="rankCard" key={index}>
                                        <Card.Img className="rankCardImage" variant="top" src={rankObj.image} />
                                        <Card.Body>
                                            <Card.Title className="rankCardTitle">{rankObj.game_rank}</Card.Title>
                                            <Card.Text className="rankCardText">{rankObj.title}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                )
                            }
                        })}
                    </div>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default Main;