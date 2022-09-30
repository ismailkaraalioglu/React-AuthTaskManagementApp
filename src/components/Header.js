import { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../redux/auth/loginSlice";
import { changeDarkMode } from "../redux/event/eventSlice";

function Header() {
  const { user } = useSelector((state) => state.login);
  const { darkMode } = useSelector((state) => state.event);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogoutUser = () => {
    dispatch(userLogout());
    navigate("/login");
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleDarkMode = () => {
    dispatch(changeDarkMode());
  };

  return (
    <header className="headerContainer">
      <div className="headerContent">
        <div className="headerAppName">Task Management App</div>

        <div className="headerUserEventContent">
          <div className="headerUserContent">
            <FaUserCircle size={24} />
            <div>
              Hi,{" "}
              <span className="headerUserName">
                {user.firstName} {user.lastName}
              </span>
            </div>
          </div>

          <div className="headerEventContent">
            <button onClick={handleDarkMode}>
              {darkMode ? (
                <FiSun size={22} />
              ) : (
                <BsFillMoonStarsFill size={22} />
              )}
            </button>

            <button
              type="button"
              className="headerLogoutButton"
              onClick={handleLogoutUser}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
