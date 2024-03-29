# 게임 가격 비교 서비스

## 개요

- 2022 서일대학교 Term Project 과목의 팀 프로젝트로, 웹 프론트엔드&백엔드 담당
- 개발 기간 (2022.11 ~ 2022.12)
- isthereanydeal의 API와 Steam의 데이터를 이용하여 게임과 관련된 정보와 가격 비교를 볼 수 있는 사이트 제작

## 사용 기술

- React.js
- Recoil
- Bootstrap
- ES6+
- Axios
- Express.js

## 구현 기능

### 로그인 / 회원가입 / 회원 인증
- 페이지 헤더에서 할 수 있으며, 비밀번호로 회원 인증 시에는 회원 수정 페이지로 이동

### 회원 수정
- 비밀번호, 닉네임, 이메일 값 변경 가능
- 회원탈퇴 버튼 클릭 시 회원 탈퇴

### 메인 페이지
- 현재 게임 순위를 Bootstrap Carousel로 표현
- Bootstrap Calendar로 게임 할인 일정 표시(특정 날짜에 다른 색으로 표현, 클릭 시 자세한 정보가 담긴 Modal창 띄워짐)
- Bootstrap ListGroup으로 게임 뉴스 데이터 표시

### 헤더
- 가격 비교를 위한 게임명 검색 input 창 존재
- 로그인 전에는 로그인 / 회원가입 버튼, 로그인 후에는 유저 Dropdown 버튼 표시 (회원정보 수정, 로그아웃 버튼 구현)

### 검색 결과 페이지
- 입력 게임 타이틀로 DataBase 에서 스팀 game id값 받아와 isthereanydeal api 요청에 game id값 사용
