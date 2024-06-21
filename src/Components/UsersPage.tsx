import { useEffect, useState } from 'react';
import styled from 'styled-components';
import "../index.css"
import MenuHeader from './MenuHeader';
import { Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const Container = styled.div`
  display: flex;
`;

const Sidebar = styled.div`
  width: 200px;
  background-color: #2C3E50;
  color: #fff;
  height: auto;
  padding: 20px;
  /* z-index: 100; */
    /* transition: 0.3s ease-in-out; */
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    /* border: 1px solid red; */
    padding: 8px;
  }

  th {
    background-color: #d7d7ff;
  }
`;

const MainWrapperBDRadius = styled.div`
  border: 1px solid;
  padding: 12px;
  background-color: white;
  border-radius: 31px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 77vh;
`;

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [detailUserData, setdetailUserData] = useState<any>(null);
    const navigate = useNavigate();

    const fetchUsers = async (pageval: number) => {
        const response = await fetch(`http://dummyjson.com/users?limit=${pageval}`);
        const data = await response.json();
        return data.users;
    };

    const handleChange = (event: any, value: number) => {
        const fetchData = async () => {
            const users = await fetchUsers(value * 10);
            const start = (value - 1) * 10;
            const end = value * 10;
            setUsers(users.slice(start, end));
        };
        fetchData();
    };

    useEffect(() => {
        const getUsers = async () => {
            const users = await fetchUsers(1 * 10);
            setUsers(users);
        };
        getUsers();
    }, []);


    const fetchUsersOne = async (val: number) => {
        const response = await fetch(`http://dummyjson.com/users/${val}`);
        const data = await response.json();
        return data;
    };

    const ClickHandler = async (id: number) => {

        const getUsersDetail = async () => {
            const data = await fetchUsersOne(id)
            setdetailUserData(data);
        };
        getUsersDetail();


    }

    const [showValue, setShowValue] = useState<any>(true)

    return (
        <>
            <MenuHeader showValue={showValue} setShowValue={setShowValue}></MenuHeader>
            <Container>
                {
                    showValue &&
                    <Sidebar>
                        <Nav>
                            <ul>
                                <li
                                    className={"activehover"}
                                    onClick={() => {
                                        navigate("/dashboard")
                                    }}>Dashboard</li>
                                <li className={!detailUserData ? "active" : "activehover"} onClick={() => {
                                    setdetailUserData(null)
                                }}>Users</li>
                            </ul>
                        </Nav>
                    </Sidebar>
                }
                {
                    detailUserData != null && Object.keys(detailUserData).length > 0 ?
                        <MainContent>
                            <h2>{detailUserData.firstName} {detailUserData.lastName}</h2>
                            <MainWrapperBDRadius style={{ alignItems: 'flex-start' }}>
                                <div>
                                    <div className='mainDiv'>
                                        <div className='heading'>Basic Details</div>
                                        <div
                                            style={{
                                                display: "flex",
                                                gap: "30px"
                                            }}
                                        >
                                            <div><strong>Name:</strong> {detailUserData.firstName} {detailUserData.lastName}</div>
                                            <div><strong>Email:</strong> {detailUserData.email}</div>
                                            <div><strong>Gender:</strong> {detailUserData.gender}</div>
                                            <div><strong>Age:</strong> {detailUserData.age}</div>
                                            <div><strong>Phone:</strong> {detailUserData.phone}</div>
                                        </div>
                                    </div>

                                    <div className='mainDiv'>
                                        <div className='heading'>Address Details</div>
                                        <div
                                            style={{
                                                display: "flex",
                                                gap: "30px"
                                            }}
                                        >
                                            <div><strong>Address:</strong> {detailUserData.firstName} {detailUserData.address.address}</div>
                                            <div><strong>City:</strong> {detailUserData.address.city}</div>
                                            <div><strong>State Code:</strong> {detailUserData.address.stateCode}</div>
                                            <div><strong>Postal Code:</strong> {detailUserData.address.postalCode}</div>
                                            <div><strong>Country:</strong> {detailUserData.address.country}</div>
                                        </div>
                                    </div>

                                    <div className='mainDiv'>
                                        <div className='heading'>Company Details</div>
                                        <div
                                            style={{
                                                display: "flex",
                                                gap: "30px"
                                            }}
                                        >
                                            <div><strong>Name:</strong> {detailUserData.firstName} {detailUserData.company.name}</div>
                                            <div><strong>Title:</strong> {detailUserData.company.title}</div>
                                            <div><strong>Department:</strong> {detailUserData.company.department}</div>
                                        </div>
                                    </div>
                                </div>
                            </MainWrapperBDRadius>
                        </MainContent>
                        :
                        <MainContent>
                            <h2>Users</h2>
                            <MainWrapperBDRadius>

                                <div style={{ display: "contents" }}>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th className='middleAlign'>Name</th>
                                                <th className='leftAlign'>Email</th>
                                                <th className='leftAlign'>Phone</th>
                                                <th className='leftAlign'>Age</th>
                                                <th className='leftAlign'>SSN</th>
                                                <th className='leftAlign'>Department</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user: any) => (
                                                <tr key={user.id}
                                                    onClick={
                                                        () => {
                                                            ClickHandler(user.id)
                                                        }
                                                    }
                                                    className='tbrow'
                                                >
                                                    <td style={{
                                                        display: 'flex',
                                                        gap: "25px",
                                                    }}>
                                                        <span>
                                                            <img
                                                                style={{
                                                                    borderRadius: "100%",
                                                                    border: "1px solid",
                                                                    objectFit: "contain"
                                                                }}
                                                                width={23} height={23} src={user.image}>
                                                            </img>
                                                        </span>
                                                        <span>{user.firstName} {user.lastName}</span>
                                                    </td>
                                                    <td className='leftAlign'>{user.email}</td>
                                                    <td className='leftAlign'>{user.phone}</td>
                                                    <td className='leftAlign'>{user.age}</td>
                                                    <td className='leftAlign'>{user.ssn}</td>
                                                    <td className='leftAlign'>{user.company.department}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "20px"
                                    }}>
                                    <h5>{`total ${users.length} items`}</h5>
                                    <Pagination
                                        count={10}
                                        variant="outlined"
                                        shape="rounded"
                                        onChange={handleChange}
                                    />
                                </div>

                            </MainWrapperBDRadius>
                        </MainContent>}
            </Container >
        </>
    );
};

export default UsersPage;
