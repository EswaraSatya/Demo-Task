import React, { useState } from 'react';
import styled from 'styled-components';
import hamBurger from "./images/hamBurger.svg";
import AvatarIcon from "./images/avatar-svgrepo-com.svg";
import DownArrow from "./images/arrow-sm-down-svgrepo-com.svg";


const Header = styled.header`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  /* cursor: pointer; */
`;

const UserText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
  margin-right: 5px; // Added to give space before arrow
  color: #000;
  white-space: nowrap;
`;

const DropdownArrow = styled.span`
  margin-left: 5px;
  font-size: 12px;
  color: #000;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: #fff;
  color: #000;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 4px;

  a {
    display: block;
    padding: 10px;
    text-decoration: none;
    color: #000;
    &:hover {
      background-color: #f1f1f1;
    }
  }
`;

const MenuHeader = (props: any) => {

  const loginDetailsString = localStorage.getItem("logindetails") ?? "";
  const LoginData = loginDetailsString ? JSON.parse(loginDetailsString) : null;


  return (
    <Header>
      <img onClick={() => props.setShowValue(!props.showValue)} src={hamBurger} height={45} width={45} style={{
        cursor: 'pointer'
      }} alt="hamburgerMenu">
      </img>
      <UserInfo>
        <img
          style={{
            borderRadius: "50%",
            border: "1px solid",
          }}
          src={AvatarIcon}
          width={35}
          height={35}
          alt="AvatarIcon"
        />
        <UserText>
          <strong>{LoginData.firstName} {LoginData.lastName}</strong>
          <span>{LoginData.email}</span>
        </UserText>
        <img src={DownArrow} height={35} width={35}></img>
        {/* {dropdownOpen &&
          <DropdownMenu>
            <a href="#profile">Profile</a>
            <a href="#settings">Settings</a>
            <a href="#logout">Logout</a>
          </DropdownMenu>} */}
      </UserInfo>
    </Header>
  );
};

export default MenuHeader;
