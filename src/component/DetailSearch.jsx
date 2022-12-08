//recoil import
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import atomSearchPlain from "../Atoms/atomSearchPlain";
//react hook import
import { useEffect, useState } from "react";
//import api key
import apikey from "../apikey";
//Functions import
import functionGetAppID from "../Functions/FunctionsSearch/functionGetAppID";
//bootstrap import
import ListGroup from 'react-bootstrap/ListGroup';
//component import
import DetailPriceList from "./DetailPriceList";
//css import
import "../css/DetailSearch.css";


//사용자가 게임을 검색했을 때 결과 화면을 보여 줄 component
function DetailSearch() {
    //isthereanydeal search api url을 담기 위한 변수
    let urlApi;
    //isthereanydeal 가격 비교 api에 넣을 plain 문자열 변수
    let strPlain;
    //최종 jsx 디자인이 들어갈 배열 변수
    let result;

    //DB에 있는 해당 게임 title의 steam app id값을 받아오는 배열
    const [gameAppID, setGameAppID] = useState([]);
    //isthereanydeal price api로 게임의 가격 비교 정보를 가져와 저장하는 배열
    const [searchPrice, setSearchPrice] = useState([]);
    //steam app id로 detail game info를 가져와 저장하는 배열
    const [searchGameInfo, setSearchGameInfo] = useState([]);
    //최종적으로 검색된 결과(제목, 이미지, 가격 비교값)를 html tag 형태로 담을 배열
    const [searchResultTagArray, setSearchResultTagArray] = useState([]);
    
    //사용자가 입력한 검색 결과에 대한 api 요청 값이 들어 있는 recoil 상태 관리값
    const [plains, setPlains] = useRecoilState(atomSearchPlain);

    useEffect(() => {
        setGameAppID([]);
        setSearchPrice([]);
        setSearchGameInfo([]);
        setSearchResultTagArray([]);
    }, [window.sessionStorage.userSearchJudgment]);

    //search api의 결과값이 담긴 plains 값이 바뀔 때만 DB와 새로 통신하여 searchAppID 값을 바꾸게 한다.
    useEffect(() => {
        functionGetAppID(plains, setGameAppID);
    }, [plains]);

    useEffect(() => {
        strPlain = "";

        gameAppID.map((gameAppIDObj) => {
            strPlain += gameAppIDObj.plain + "%2C";

            fetch("https://cors-anywhere.herokuapp.com/https://store.steampowered.com/api/appdetails?appids=" + gameAppIDObj.appid + "&l=korean")
            .then(response => response.json()).then((data) => {
                setSearchGameInfo(prev => [...prev, data]);
            })
        });
        strPlain = strPlain.slice(0, -3);
        urlApi = `https://api.isthereanydeal.com/v01/game/prices/?key=${apikey.myApiKey}&plains=${strPlain}&region=us`;

        fetch(urlApi).then((response) => response.json()).then((data) => {
            setSearchPrice([data.data]);
        });
    }, [gameAppID]);

    useEffect(() => {
        let search;
        result = [];
        let i = 0;

        let tempAppIDObj, tempInfoObj, tempHeaderImage, tempSearchList;

        for (search in searchPrice[0]) {
            tempAppIDObj = gameAppID.find((gameAppIDObj) => {
                if(gameAppIDObj.plain === search) {
                    return gameAppIDObj;
                }
            });
            tempInfoObj = searchGameInfo.find((searchGameInfoObj) => {
                if(tempAppIDObj.appid in searchGameInfoObj) {
                    return searchGameInfoObj;
                }
            });
            tempSearchList = searchPrice[0][search].list
            tempHeaderImage = Object.values(tempInfoObj)[0].data;

            result.push(<ListGroup.Item key={i} className="searchListItemContainer">
                <img key={i + 1} src={tempHeaderImage.header_image} className="gameImage"></img>
                <h4 key={i + 2} className="gameTitle">{tempAppIDObj.title}</h4>
                <DetailPriceList className="gameShopList" key={i + 3} keyValue={i + 4} tempSearchList={tempSearchList}></DetailPriceList>
            </ListGroup.Item>)
            i += 100;
            /*
            tempSearchList.map((detail) => {
                result.push(<ListGroup.Item key={i}><img key={i + 1} src={tempHeaderImage.header_image}></img>이름 : {tempAppIDObj.title}, 원가 : {detail.price_old}, 할인가 : {detail.price_new}, <a key={i + 2} href={detail.url}>{detail.shop.name}</a></ListGroup.Item>)
                i += 3;
            });
            */
        }
        if(searchPrice[0] !== undefined) {
            if(result.length == gameAppID.length) {
                console.log(result);
                console.log(searchPrice[0]);
                console.log(gameAppID);
                setSearchResultTagArray(prev => [...prev, result]);
            }
        }
    }, [searchGameInfo, searchPrice]);

    if(gameAppID.length === 0) {
        return (
            <div>
                검색 결과가 없습니다.
            </div>
        )
    }
    else {
        return (
            <div>
                <ListGroup id="searchResultListAllContainer">
                    {searchResultTagArray.map((searchResultObj) => searchResultObj)}
                </ListGroup>
            </div>
        )
    }
    
}

export default DetailSearch;