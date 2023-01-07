import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../App.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

function CurrentAttendance() {
  const [records, setRecords] = useState([]);

    useEffect(()=>{
      async function fetchData() {
        const response = await axios.get('http://localhost:5000/record/view');
        setRecords(response.data);
      }
      fetchData();
    }, []);
  
  let present=0;
  for(var i=0;i<records.length;i++){
    if(records[i].checkOut==="") {
      present++;
    }
  }
    
  return (
    <div className='attendance'>
      <div className='c-header'>
        Current Attendance: {present}
      </div>
      <div className='c-table'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Roll No</TableCell>
              <TableCell align="right">Check in Time</TableCell>
              <TableCell align="right">Check out Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record) => (
              <TableRow
                key={record.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {record.name}
                </TableCell>
                <TableCell align="right">{record.roll}</TableCell>
                <TableCell align="right">{record.checkIn}</TableCell>
                <TableCell align="right">{record.checkOut}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
      <Link to='/' style={{textDecoration:"none"}}><Button size='large'  sx={{padding: 1, margin: 0 }} color='primary'>🔙 Back</Button></Link>
    </div>
  )
}

export default CurrentAttendance