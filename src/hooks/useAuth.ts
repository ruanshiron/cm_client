import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "../store/userSlice";

export const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
};
