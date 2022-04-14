import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const KART_NAV_OPEN_DRAWER = 2;
const TRACK_NAV_OPEN_DRAWER = 3;

const Container = styled.div`
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: center;
  background-color: #005fcc;
`;
const Inner = styled.div`
  width: 1000px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Items = styled.section`
  display: flex;
`;
const Item = styled.div`
  width: 80px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 40px;
  box-sizing: border-box;
  border-bottom: ${({ clicked, index }) =>
    clicked === index ? "4px solid white" : null};
  font-weight: ${({ clicked, index }) => (clicked === index ? "700" : null)};
  color: #fff;
  opacity: ${({ clicked, index }) => (clicked === index ? "1" : "0.5")};
  transition-property: font-weight, opacity;
  transition-duration: 0.15s;
  transition-timing-function: ease-in-out;

  :hover {
    border-bottom: 4px solid white;
    font-weight: 700;
    opacity: 1;
  }
`;
const Text = styled.a`
  margin-bottom: ${({ clicked, index }) => (clicked === index ? "-4px" : null)};
  ${Item}:hover & {
    margin-bottom: -4px;
  }
`;

const SearchContainer = styled.div`
  width: 220px;
  height: 32px;
  display: flex;
  align-items: center;
  padding-right: 15px;
  margin-left: 285px;
  border-bottom: 1px solid #fff;
  font-size: 12px;
  color: white;
  opacity: 0.5;
  transition: all 0.15s ease-in-out;
  :hover {
    opacity: 1;
  }
  :focus {
    opacity: 1;
  }
`;

const Search = styled.input`
  width: 195px;
  height: 32px;
  padding-left: 10px;
  padding-right: 25px;
  margin-left: auto;
  border: none;
  color: white;
  background: none;
  opacity: 0.8;
  font-weight: 700;
  outline: none;
  ::placeholder {
    color: white;
  }
  :focus::placeholder {
    color: transparent;
  }
`;

const IconContainer = styled.div`
  cursor: pointer;
`;

const Nav = ({ setHovered, openDrawer, closeDrawer, setNickname }) => {
  const items = ["홈", "랭킹", "카트", "트랙"];
  const [clicked, setClicked] = useState(null);
  // 클릭한 아이템의 index를 저장하는 state
  const [inputValue, setInputValue] = useState("");
  // input의 value를 저장하는 state

  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/");
  };
  const goToBlankPage = () => {
    navigate("/blank");
  };

  const onClickItem = (index) => {
    setClicked(index);

    if (index === 0) {
      // home을 누르면 mainpage로 이동
      goToMain();
    } else {
      // 나머지는 빈 페이지로 이동
      goToBlankPage();
    }
  };

  const onMouseEnter = (index) => {
    if (index === KART_NAV_OPEN_DRAWER) {
      setHovered(KART_NAV_OPEN_DRAWER);
      openDrawer();
    } else if (index === TRACK_NAV_OPEN_DRAWER) {
      setHovered(TRACK_NAV_OPEN_DRAWER);
      openDrawer();
    } else {
      setHovered(null);
      closeDrawer();
    }
  };

  const onChangeInput = (event) => {
    setInputValue(event.target.value);
  };

  const searchData = () => {
    setNickname(inputValue);
  };

  const onKeyUp = (e) => {
    if (e.key === "Enter") {
      searchData();
    }
  };

  return (
    <Container>
      <Inner>
        <Items>
          {items.map((item, index) => (
            <Item
              key={item}
              clicked={clicked}
              index={index}
              onClick={() => onClickItem(index)}
              onMouseEnter={() => onMouseEnter(index)}
            >
              <Text clicked={clicked} index={index}>
                {item}
              </Text>
            </Item>
          ))}
        </Items>
        <SearchContainer>
          <Search
            placeholder="닉네임 검색"
            value={inputValue}
            onChange={onChangeInput}
            onKeyUp={(e) => onKeyUp(e)}
          />
          <IconContainer onClick={searchData}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </IconContainer>
        </SearchContainer>
      </Inner>
    </Container>
  );
};

export default Nav;
