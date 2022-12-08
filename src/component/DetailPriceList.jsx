//bootstrap import
import ListGroup from 'react-bootstrap/ListGroup';

function DetailPriceList({
    keyValue,
    tempSearchList
}) {
    const shopList = [];

    tempSearchList.map((detail) => {
        shopList.push(
        <ListGroup.Item key={keyValue + 1}>
            <span key={keyValue + 2} style={{textDecoration: "line-through", paddingRight: "10px"}}>{detail.price_old}</span> 
            -&gt; {detail.price_new}$ ({detail.price_cut}%)    <a key={keyValue + 3} href={detail.url} target="_blank">{detail.shop.name}</a>
        </ListGroup.Item>);
        keyValue += 4;
    });

    return (
        <ListGroup key={keyValue} style={{width: "20vw", display: "inline-block", height: "150px", overflow: "auto"}}>
            {shopList.map((shopObj) => shopObj)}
        </ListGroup>
    )
}

export default DetailPriceList;