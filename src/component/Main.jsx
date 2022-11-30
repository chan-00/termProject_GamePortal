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
import atomGameNewsList from "../Atoms/atomGameNews";
import atomGameSaleCalendar from "../Atoms/atomGameSaleCalendar";
//Functions import
import functionGetGameRank from "../Functions/FunctionsMainRender/functionGetGameRank";
import functionGetGameNews from "../Functions/FunctionsMainRender/functionGetGameNews";
import functionGetSaleCalendar from "../Functions/FunctionsMainRender/functionGetSaleCalendar";
//moment import
import moment from "moment";


function Main() {
    //Main 페이지 첫 렌더링 시 인기게임 리스트 값을 받아와 화면에 뿌려주기 위한 recoil 세팅
    const [ gameRankList, setGameRankList ] = useRecoilState(atomGameRankList);
    //위와 마찬가지로 첫 렌더링 시 게임 뉴스 값을 갖고 와서 화면에 뿌려주기 위한 recoil 세팅
    const [ gameNewsList, setGameNewsList ] = useRecoilState(atomGameNewsList);
    //게임 할인 일정 리스트 값을 recoil 상태 관리로 값 관리
    const [ saleCalendar, setSaleCalendar ] = useRecoilState(atomGameSaleCalendar);

    //react calendar highlight 설정을 위한 boolean 변수
    //이 변수값이 true일 때 해당 tile에 highlight 클래스 값을 준다.
    let tileHighlight = false;
    //calendar에서 일정별로 색깔을 구분하기 위한 숫자 값
    //숫자 값은 매번 1, 2, 3 순으로 숫자가 바뀌어 클래스값 highlight 뒤에 붙어 색을 구분하게 한다.
    let divCalendarNum = 1;

    //페이지 첫 렌더링 시 default로 표시해야 할 값들을 불러 오는 함수들을 호출한다.
    useEffect(() => {
        //게임 순위 리스트를 가져오는 함수를 호출하여 gameRankList 값에다 넣는 작업을 한다.
        functionGetGameRank(setGameRankList);
        //게임 뉴스 리스트를 가져오는 함수 호출
        functionGetGameNews(setGameNewsList);
        //게임 세일 일정 리스트를 가져오는 함수 호출
        functionGetSaleCalendar(setSaleCalendar);
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
                                    <Card className="rankCard" key={index} id={rankObj.title}>
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
                                    <Card className="rankCard" key={index} id={rankObj.title}>
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
                    <Calendar tileClassName={({ date, view }) => {
                        //Calendar에서 현재 날짜(date)가 할인 이벤트 일정(saleObj.sale_start ~ saleObj.sale_end) 사이에 있다고 판단되면 tileHighlight 값을 true로 바꾼다.
                        if (saleCalendar.find((saleObj) => {
                            if(moment(date).format("YYYY-MM-DD") === saleObj.sale_start || moment(date).format("YYYY-MM-DD") === saleObj.sale_end ||
                                (moment(moment(date).format("YYYY-MM-DD")).isAfter(saleObj.sale_start) && moment(moment(date).format("YYYY-MM-DD")).isBefore(saleObj.sale_end))) {
                                return true;
                            } else {
                                return false;
                            }
                        })) {
                            tileHighlight = true;
                        } else {
                            //위의 조건에 걸리지 않는다면 할인 일정의 범위에 있는 날짜가 아니기 때문에 할인 일정별 색을 다르게 주는 옵션인 divCalendarNum 값을 바꾸고,
                            //tileHighlight 값을 false로 바꿈으로써 해당 날짜에는 색을 입히지 않게 한다.
                            if(divCalendarNum === 3) {
                                divCalendarNum = 1;
                            } else {
                                divCalendarNum += 1;
                            }
                            tileHighlight = false;
                        }
                        //위 조건식에서 조건에 따라 true 일 때 highlight 클래스 이름 값을 반환하여 캘린더에 색이 입혀질 수 있게 한다.
                        if(tileHighlight) {
                            return "highlight" + divCalendarNum;
                        }
                    }}
                    onViewChange={({ action, activeStartDate, value, view }) => alert('New view is: ', view)} />
                    <ListGroup id="newsContainer">
                        {gameNewsList.map((newsObj) => {
                            return (
                                <ListGroup.Item action href={newsObj.news_url} target="_blank" key={newsObj.news_id} id={newsObj.news_id}>
                                    {newsObj.headline}
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                </div>
            </div>
        </div>
    )
}

export default Main;