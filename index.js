const express = require("express"); //웹서버 생성
const mysql = require("mysql"); // 데이터베이스
const bodyParser = require("body-parser"); // 요청정보 처리
const cors = require("cors"); // 교차 출처 리소스 공유(Cross-Origin Resource Sharing, CORS)

const app = express(); // 익스프레스 설정
const PORT = process.env.port || 8000; // 포트번호 설정 포트번호는 0부터 16비트

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // 객체 형식 처리

let corsOptions = {
  origin: "*", // 출처 허용 옵션
  credential: true, // 사용자 인증이 필요한 리소스(쿠키, ...등) 접근
};

app.use(cors(corsOptions)); // 미들웨어 설정 작업

//mysql db와 연결하는 작업
const db = mysql.createPool({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "1234",
  database: "side_project",
  //한 번에 여러 쿼리문을 보낼 수 있게 해 주는 옵션
  //현재는 delete 쿼리문에서 여러 쿼리를 보내게 하기 위해 사용
  multipleStatements: true,
});

//회원가입 시 회원 데이터를 user 테이블에 넣는 백엔드 코드
app.post("/signup", (req, res) => {
    const id = req.body.id;
    const pw = req.body.pw;
    const name = req.body.name;
    const email = req.body.email;

    const sqlQuery = "INSERT INTO user(USER_ID,PASSWORD,USER_NAME,EMAIL,REGIST_DATE)\
    VALUES (?, ?, ? ,? ,date_format(sysdate(),'%Y-%m-%d'));";
    db.query(sqlQuery, [id, pw, name, email], (err, result) => {
        if(err) console.log(err.message);
        res.send(result);
    });
})

//회원가입 페이지에서 아이디 중복확인 요청이 왔을 때 select문을 db에 보내는 백엔드 코드
app.post("/reduplicationID", (req, res) => {
    const id = req.body.id;

    const sqlQuery = "select count(*) as cnt from user where user_id = ?;";
    db.query(sqlQuery, [id], (err, result) => {
        if(err) console.log(err.message);
        res.send(result);
    })
})

//로그인 페이지에서 login 이벤트 발생했을 때 로그인 처리를 위한 백엔드 코드
//count(*)로 전달받은 id값이 현재 user 테이블에 있는 계정인지 검사하여 프론트로 데이터를 보낸다.
app.post("/login", (req, res) => {
    const id = req.body.id;
    const pw = req.body.pw;

    const sqlQuery = "select count(*) as 'cnt' from user where USER_ID = ? and PASSWORD = ?;";
    db.query(sqlQuery, [id, pw], (err, result) => {
        if(err) console.log(err.message);
        res.send(result);
    })
})

//회원정보 수정 버튼 클릭 시 발생하는 회원 인증 기능 구현을 위한 백엔드 코드
app.post("/authpassword", (req, res) => {
    const id = req.body.id;
    const pw = req.body.pw;

    const sqlQuery = "select count(*) as 'cnt' from user where USER_ID = ? and PASSWORD = ?;";
    db.query(sqlQuery, [id, pw], (err, result) => {
        if(err) console.log(err.message);
        res.send(result);
    })
})

//회원정보 변경(update) 이벤트 발생 시 백엔드 코드
app.post("/updateuser", (req, res) => {
    const id = req.body.id;
    const pw = req.body.pw;
    const name = req.body.name;
    const email = req.body.email;

    const sqlQuery = "update user set password = ?, user_name = ?, email = ? where user_id = ?;";
    db.query(sqlQuery, [pw, name, email, id], (err, result) => {
        if(err) console.log(err.message);
        res.send(result);
    })
})

//회원 수정 페이지 접속 시 default 값을 얻기 위한 select문
app.post("/defaultaccount", (req, res) => {
    const id = req.body.id;

    const sqlQuery = "select password, user_name, email from user where user_id = ?;";
    db.query(sqlQuery, [id], (err, result) => {
        if(err) console.log(err.message);
        res.send(result);
    })
})

//회원 탈퇴 이벤트 발생 시 해당 유저를 테이블에서 삭제하도록 하는 백엔드 코드
app.post("/deleteAccount", (req, res) => {
    const id = req.body.id;

    const sqlQuery = "delete from user where user_id = ?;";
    db.query(sqlQuery, [id], (err, result) => {
        if(err) console.log(err.message);
        res.send(result);
    })
})

//게임 인기순위 리스트를 DB로부터 가져오는 백엔드 코드
app.get("/getRankList", (req, res) => {
    const sqlQuery = "select GAME_ENG_NAME as title, game_rank, GAME_IMAGE as image from game_rank_list order by game_rank asc;";
    db.query(sqlQuery, (err, result) => {
        if(err) console.log(err.message);
        res.send(result);
    })
})

//게임 뉴스 리스트를 DB로부터 가져오는 백엔드 코드
app.get("/getNewList", (req, res) => {
    const sqlQuery = "select * from news order by news_time desc;";
    db.query(sqlQuery, (err, result) => {
        if(err) console.log(err.message);
        res.send(result);
    })
})


app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
});