
function functionLogout(setLoginID, setLoginStatus, navigate) {
    setLoginID("");
    setLoginStatus(false);
    window.sessionStorage.clear();

    alert("로그아웃 되었습니다!");
    navigate("/");
}

export default functionLogout;