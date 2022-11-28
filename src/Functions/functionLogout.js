//매개 변수를 전달받아 세션과 로그인과 관련된 recoil 상태 변수값을 초기화하는 로그아웃 함수이다.
function functionLogout(setLoginID, setLoginStatus, navigate) {
    setLoginID("");
    setLoginStatus(false);
    window.sessionStorage.clear();

    alert("로그아웃 되었습니다!");
    navigate("/");
}

export default functionLogout;