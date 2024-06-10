import { Button } from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import {logout } from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout() as any);
    navigate("/");
  };

  return (
    <div>
      <Button
        aria-describedby="logout-button"
        variant="contained"
        onClick={handleLogout}
        style={{ backgroundColor: 'rgb(95, 81, 81)', color: 'white' ,boxShadow: '0px 0px 10px rgba(95, 81, 81)'}}
      >
        <LogoutIcon  style={{ fontSize: '3rem' }}/>
      </Button>
    </div>
  );
};

export default Account;
