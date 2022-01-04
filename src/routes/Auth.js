// 로그인이 되어있지 않다면 로그인을 위한 부분을 보여줄 것임

import { authService, firebaseInstance } from "fbase";
import React, { useState } from "react";

// Auth 컴포넌트를 입력할때 위에 자동으로 import 해주기 위해서
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // 계정이 있을 때와 없을 때 분리
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (evnet) => {
    // 새로고침 되는 순간마다 react 코드 및 state가 사라짐
    // 기본행위가 실행되는걸 원치 않는 것
    evnet.preventDefault();
    try {
      let data;
      if (newAccount) {
        // create account
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        // log in
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  // newAccount의 이전 값을 가져와서, 그 값에 반대되는 것을 리턴
  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          value={password}
          required
          onChange={onChange}
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;

/*
emailAuthProvider 문서
1. email과 password로 사용자를 생성하는 것
2. email과 password로 로그인 하는 것을 인증해주는 것

createUserWithEmailAndPassword
1. 이메일 주소와 패스워드로 연결도니 새로운 유저 계정 만들기
2. 사용자 계정을 성공적으로 만들면, 사용자는 또한 어플리케이션에 로그인 될 것이다.
3. 이미 계정이 있거나 해당 패스워드를 사용할 수 없으면 실패할 것이다.

setPersistence
1. 사용자들을 어떻게 기억할 것인지 선택할 수 있도록 해줌
2. 초기값은 local
2-1. local : 브라우저를 닫더라도 사용자 정보는 기억될 것을 의미
2-2. session : 탭이 열려있는 동안에는 사용자 정보를 기억하는 것을 의미
2-3. none : 유저를 기억하지 않음
*/

// 이메일, 구굴, 깃헙으로 로그인 구현.
// signInWithRedirect
// 1. 두가지 옵션
// 1-1. popup
// 1-2. redirect
