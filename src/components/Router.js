import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const AppRouter = () => {
  // 처음엔 비로그인 상태이기 때문에 useState가 false인 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <Switch>
        {/* 사용자가 로그인 되어있다면 <Home/> 비로그인 상태면 <Auth/>*/}
        {isLoggedIn ? (
          // Fragment : 많은 요소들을 render 하고싶을 때 사용
          <>
            <Route exact path="/">
              <Home />
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
