import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state?.users?.userAuth);

  useEffect(() => {
    if (!userInfo?.token) {
      navigate("/login");
    }
  }, []);

  return <div>{children}</div>;
};

export default AuthRoute;
