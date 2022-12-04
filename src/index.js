import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { RecoilRoot } from 'recoil';
//css import
import "./css/index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
//모든 component 영역에서 atom 값을 쓸 수 있게 하기 위해 RecoilRoot로 App component를 묶었다.
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);