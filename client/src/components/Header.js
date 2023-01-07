import React from 'react'
import '../App.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


export default function Header() {
  return (
    <div className='header'>
        <div>
            <span className='heading'>Student Attendance.</span>
        </div>
        <div>
            <Link to='/attendance' style={{textDecoration:"none"}}><Button variant="contained">Current Attendance</Button></Link>
        </div>
    </div>
  )
}
