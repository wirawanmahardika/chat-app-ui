import { useEffect, useState } from "react";
import { MyAxios } from "../helper/axios-instances";
import { useNavigate } from "react-router-dom";

export default function useGetUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: "",
    username: "",
    fullname: "",
    password: "",
    email: "",
    photo_profile: "",
  });

  useEffect(() => {
    MyAxios.get("/api/v1/user/info")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        navigate("/login");
      });
  }, []);

  return user;
}
