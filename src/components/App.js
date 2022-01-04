import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  /*
  아직은 초기화되지 않은 것임
  firebase가 프로그램을 초기화하길 기달려야 함.
  그런 다음에, isLoggedIn 이 바뀌도록
  */
  const [init, setInit] = useState(false);

  // 처음엔 비로그인 상태이기 때문에 useState가 false인 상태로 해놨지만
  // 현재 유저의 로그인 여부를 알수있게 해줌
  // 반환값 : User or null
  // 아직 여기서는 실제로 로그인,로그아웃에 대해 잘 모르기 때문
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  // 그래서 초기화되는걸 기다리려면 아래 코드를 입력
  // 여기서 USER의 변화를 listen 해야 됨.
  // user의 login 상태의 변화를 관찰하는 관찰자를 추가
  useEffect(() => {
    // 실제로 로그인 여부를 알 수 있음.
    // 여기서 create account or log in을 눌렀거나 아니면 이미 로그인 되어 있거나 firebase는 스스로 초기화하는 것을 끝냈기 때문
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {/* init이 false라면(초기화) roter를 숨김 */}
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
      <footer>&copy;{new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;

/*
firebase는 사용자가 로그인 되었는지 아닌지를 확인할 시간이 없음
어플리케이션이 시작될 시, 항상 바로 즉시 로그아웃 될 것임
currentUser 에는 아무것도 없을 것임.
바로 로그아웃 되는건 firebase가 초기화되고 모든 걸 로드할 때까지 기다려줄 시간이 없어서임
*/

// onAuthStateChanged
// 1. 기본적으로 이벤트 리스터
// 2. 유저 상태에 변화가 있을 때, 그 변화를 알아차리게 됨
// 3. 유저가 로그아웃할 때도 발생, 계정을 생성할 때도 트리거가 되고, firebase가 초기화될 대도 실행됨
