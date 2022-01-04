import { authService } from "fbase";
import React from "react";
import { useHistory } from "react-router-dom";

export default () => {
  const history = useHistory();

  // 사용자 인증 게정을 끝내고 싶기 때문에
  const onLogoutClick = () => {
    authService.signOut();
    history.push("/");
  };

  return (
    <>
      <button onClick={onLogoutClick}>Log out</button>
    </>
  );
};
