/* eslint-disable react/prop-types */
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
const columns = [
  { id: "id", label: "id", maxWidth: 80 },
  { id: "personalNumber", label: "personalNumber", maxWidth: 100 },
  { id: "firstname", label: "firstname", maxWidth: 120 },
  { id: "lastname", label: "lastname", maxWidth: 120 },
  { id: "email", label: "email", maxWidth: 120 },
  { id: "phone", label: "phone", maxWidth: 120 },
  { id: "password", label: "password", maxWidth: 120 },
 
];
function Users({setActiveComponent,setUpdateUser}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [userList, setUserList] = React.useState([]);

  const handleUpdate = (user)=> {
    setActiveComponent("Userupdateform")
    setUpdateUser(user)
  }
  React.useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:3000/users");
      const data = await response.json();
      const filteredUsers = data.filter(user => user.type === "user");
      setUserList(filteredUsers);
    };

    fetchUsers();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const deleteUser = async (userId)=>{
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error('Something went wrong with the deletion');
    }
    setUserList((prevUsers) => prevUsers.filter((user) => user.id !== userId));

  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
    <div className="bg"></div>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
          <TableRow>
              <TableCell align="center" colSpan={7}>
                User List Table
              </TableCell>
              <TableCell align="center" colSpan={2} onClick={()=>setActiveComponent("Userregisterform")}>
                Add New User   <GroupAddIcon/>
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ maxWidth: column.maxWidth }}
                >
                  {column.label}
                </TableCell>
                
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                  {columns.map(column => {
                    const value = user[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}  style={{ maxWidth: column.maxWidth }}>
                        {value}
                      </TableCell>
                    );
                    
                  })}
                  <TableCell onClick={()=>handleUpdate(user)}><SystemUpdateAltIcon/></TableCell>
                  <TableCell onClick={()=> deleteUser(user.id)}><DeleteIcon/></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={userList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default Users;