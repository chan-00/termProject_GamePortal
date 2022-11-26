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

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
});