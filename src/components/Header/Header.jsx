import { faAngleLeft, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import "./Header.scss";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { nickname } = useParams();

  const goBack = () => {
    navigate(-1);
  };

  const [scrollY, setScrollY] = useState(false);

  const handleScroll = () => {
    if (window.scrollY >= 50) {
      setScrollY(true);
    } else {
      setScrollY(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollY > lastScrollY) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(scrollY);
  }, [scrollY]);

  // 추가된 코드: 특정 경로를 제외한 모든 경로에 뒤로가기 버튼 표시
  const excludePaths = ["/", "/page1", "/page2", "/page3", "/page4"];
  const showBackButton = !excludePaths.includes(location.pathname);

  return (
    <div className={`header ${isVisible ? "visible" : "hidden"}`}>
      {showBackButton ? (
        <div className="icon-back">
          <NavLink
            to="#"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={goBack}
            onMouseDown={() => setIsClicked(true)}
            onMouseUp={() => setIsClicked(false)}
            style={{
              color: isClicked ? "mediumslateblue" : "white",
            }}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </NavLink>
        </div>
      ) : (
        <div className="logo">😆로고</div>
      )}
      <div className="icon-bell">
        <NavLink
          to="/notification"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <FontAwesomeIcon icon={faBell} />
        </NavLink>
      </div>
    </div>
  );
}
