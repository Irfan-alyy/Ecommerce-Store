import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, Id, date, status) {
  return { name, Id, date, status };
}

const rows = [
  createData('Joht Michale', 1023459, '2 Mar 2024', 'Approved'),
  createData('Joht Michale', 1023459, '2 Mar 2024', 'Pending'),
  createData('Joht Michale', 1023459, '2 Mar 2024', 'Approved'),
  createData('Joht Michale', 1023459, '2 Mar 2024', 'Delivered'),
];

const makeStyles = (status) => {
  if (status === 'Approved') {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
      padding: '5px 10px',
      borderRadius: '5px',
      fontWeight: 'bold'
    };
  } else if (status === 'Pending') {
    return {
      background: '#ffeb3b4f',
      color: '#ff9800',
      padding: '5px 10px',
      borderRadius: '5px',
      fontWeight: 'bold'
    };
  } else if (status === 'Delivered') {
    return {
      background: '#cfe2ff',
      color: '#0d6efd',
      padding: '5px 10px',
      borderRadius: '5px',
      fontWeight: 'bold'
    };
  } else {
    return {};
  }
};

export default function BasicTable() {
  return (
    <div className="Table">
      <h3 className="text-3xl text-white shadow-md mt-4 mb-4">Recent Orders</h3>
      <TableContainer component={Paper} style={{ boxShadow: "0px 13px 20px 0px #80808029" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left" className='p-6'>Status</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.Id}</TableCell>
                <TableCell align="left">{row.date}</TableCell>
                <TableCell align="left">
                  <span style={makeStyles(row.status)}>{row.status}</span>
                </TableCell>
                <TableCell align="left">Detail</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
