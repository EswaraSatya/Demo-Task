import styled from 'styled-components';
import "../index.css"
import MenuHeader from './MenuHeader';
import { Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RightArrow from "./images/rightArrow.svg";
import { useState } from 'react';

const Container = styled.div`
  display: flex;
`;

const Sidebar = styled.div`
  width: 200px;
  background-color: #2C3E50;
  color: #fff;
  height: auto;
  padding: 20px;
  z-index: 100;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  background-color:#f1f1f1
`;

const Nav = styled.nav`
  ul {
    list-style: none;
    padding: 0;
  }

  li {
    padding: 15px;
    cursor: pointer;

    &.active {
      background-color: #E74C3C;
    }
  }
`;

const MainWrapperBDRadius = styled.div`
  border: 1px solid;
  padding: 12px;
  background-color: white;
  border-radius: 31px;
    display: flex;
    justify-content: center;
    align-items: center;
  height: 84vh;
`;

const Card = styled.div`
  border: 1px solid;
  padding: 12px;
  background-color: white;
  border-radius: 31px;
      height: 150px;
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
&:hover{
   background-color: lightblue;
   cursor: pointer;
}
  /* height: 74vh; */
`;


const WrapSmallCard = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 20px;

`;

const DashBoard = () => {
    const navigate = useNavigate();
    const NavigateHandler = () => {
        navigate("/userlist")
    }
    const [showValue, setShowValue] = useState<any>(true)


    return (
        <>
            <MenuHeader showValue={showValue} setShowValue={setShowValue}></MenuHeader>
            <Container>

                {showValue &&
                    <Sidebar>
                        <Nav>
                            <ul>
                                <li className={"active"}>Dashboard</li>
                                <li className='activehover' onClick={() => {
                                    NavigateHandler()
                                }}>Users</li>
                            </ul>
                        </Nav>
                    </Sidebar>
                }

                <MainContent>
                    <MainWrapperBDRadius>
                        <div>
                            <Card onClick={() => NavigateHandler()}>
                                <WrapSmallCard>
                                    <div>Go To Users</div>
                                    <img style={{
                                        width: '45px',
                                        height: '45px'
                                    }} src={RightArrow}></img>
                                </WrapSmallCard>
                            </Card>

                        </div>
                    </MainWrapperBDRadius>
                </MainContent>
            </Container >
        </>
    );
};

export default DashBoard;
