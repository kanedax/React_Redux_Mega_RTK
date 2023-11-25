import React, { useEffect } from "react";
import AccountList from "./AccountList";
import AccountSummary from "./AccountSummary";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction } from "../../Redux/slice/users/usersSlice";

const MainDashBoard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileAction());
  }, [dispatch]);

  const { loading, error, profile } = useSelector((state) => state?.users);

  return (
    <>
      {loading ? (
        <h2 className="text-center text-3xl mt-10 text-green-600 ">Loading...</h2>
      ) : error ? (
        <h2 className="text-center text-3xl mt-10 text-red-500">{error}</h2>
      ) : (
        <>
          <AccountSummary profile={profile}/>
          <AccountList profile={profile}/>
        </>
      )}
    </>
  );
};

export default MainDashBoard;
