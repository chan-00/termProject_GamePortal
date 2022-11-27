
function functionBodyClick(e, setIsAccountListVisible) {
    e.preventDefault();

    //body 영역에서 클릭 이벤트가 일어났을 때 해당 영역의 아이디가 accountBtn이라면,
    //유저가 Account 영역을 클릭한 것이기 때문에 해당 recoil 변수값을 false에서 true로 바꿔 준다.
    //이렇게 되면 페이지가 리렌더링 되면서 바뀐 isVisible 값을 바탕으로 account list가 visible 값으로 스타일이 바뀌게 된다.
    if(e.target.id === "accountBtn") {
        setIsAccountListVisible(true);
    }
    else if(e.target.id !== "accountBtnClickList") {
        setIsAccountListVisible(false);
    }
}

export default functionBodyClick;