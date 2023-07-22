import { useContext } from "react";
import {
  AuthStateContext,
  AuthDispatchContext,
  logout,
} from "../../contexts/auth";
import Typography from "../core/typography";
import Button from "../core/button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useContext(AuthDispatchContext);
  const { isLoggedIn, user } = useContext(AuthStateContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(dispatch);
    navigate("/login");
  };

  return (
    <header className="bg-slate-100 py-5 border-1">
      <div className="container flex items-center justify-between mx-auto flex-wrap">
        <a href="/">
          <div className="flex items-center flex-wrap gap-3">
            <img className="w-8 h-8" src="/obb-logo.svg" alt="OBB Logo" />
            <h1 className="text-xl leading-normal bold">Online Bus Booking</h1>
          </div>
        </a>

        <div className="flex items-center flex-wrap gap-10">
          {isLoggedIn ? (
            <>
              <a href="/login" className="my-1">
                <div className="flex content-center flex-wrap gap-2">
                  <span className="material-symbols-outlined">
                    account_circle
                  </span>
                  <span>Hey</span>
                  <strong>{user}</strong>
                </div>
              </a>
              <Button variant="ghost" onClick={() => handleLogout()}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <a href="tel:+919898981234" className="my-1">
                <div className="flex content-center flex-wrap gap-2">
                  <span className="material-symbols-outlined">call</span>
                  <span>+91-98989-81234</span>
                  <span>24/7 Support</span>
                </div>
              </a>
              <a href="/login" className="my-1">
                <div className="flex content-center flex-wrap gap-2">
                  <span className="material-symbols-outlined">
                    account_circle
                  </span>
                  <span>Login/Signup</span>
                </div>
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
