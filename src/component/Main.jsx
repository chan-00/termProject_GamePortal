//react hook import
import { useEffect } from "react";
import Calendar from 'react-calendar';
//bootstrap import
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
//css import
import 'react-calendar/dist/Calendar.css';
import "../css/Main.css";
//recoil import
import { useRecoilState } from "recoil";
import atomGameRankList from "../Atoms/atomGameRank";
//Functions import
import functionGetGameRank from "../Functions/functionGetGameRank";

function Main() {
    //Main 페이지 첫 렌더링 시 인기게임 리스트 값을 받아와 화면에 뿌려주기 위한 recoil 세팅
    const [ gameRankList, setGameRankList ] = useRecoilState(atomGameRankList);

    //페이지 첫 렌더링 시 default로 표시해야 할 값들을 불러 오는 함수들을 호출한다.
    useEffect(() => {
        //게임 순위 리스트를 가져오는 함수를 호출하여 gameRankList 값에다 넣는 작업을 한다.
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
                                            <Card.Title className="rankCardTitle">
                                                <span className="rankNum">{rankObj.game_rank}</span>{(rankObj.game_rank === 1) ? "st" : ((rankObj.game_rank === 2) ? "nd" : ((rankObj.game_rank === 3) ? "rd" : "th"))}
                                            </Card.Title>
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
                                            <Card.Title className="rankCardTitle"><span className="rankNum">{rankObj.game_rank}</span>th</Card.Title>
                                            <Card.Text className="rankCardText">{rankObj.title}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                )
                            }
                        })}
                    </div>
                </Carousel.Item>
            </Carousel>
            <div id="newCalendarAllContainer">
                <h5 id="calendarTitle">할인 일정</h5>
                <h5 id="newsTitle">게임 뉴스</h5>
                <div id="newsCalendarContainer">
                    <Calendar>

                    </Calendar>
                    <ListGroup id="newsContainer">
                        <ListGroup.Item>Cras justo odio</ListGroup.Item>
                        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                        <ListGroup.Item>Cras justo odio</ListGroup.Item>
                        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                    </ListGroup>
                </div>
            </div>
        </div>
    )
}

export default Main;