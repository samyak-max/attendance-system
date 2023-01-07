import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Alert from '@mui/material/Alert';

export default function FormPropsTextFields() {
    const [form, setForm] = useState({
      name: "",
      roll: ""
    })

    function updateForm(value) {
      return setForm((prev) => {
        return { ...prev, ...value };
      });
    }

    async function onSubmitIn(e){
      var newDate = (new Date()).toLocaleString("en-GB", { timeZone: 'IST' });
      const checkIn={...form, checkInTime: newDate, checkOutTime: ""};
      console.log(checkIn);
      
      await fetch("http://localhost:5000/record/add",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkIn)
      })
      .then(()=>{<Alert severity="success">This is a success alert — check it out!</Alert>})
      .catch(error=>{
        window.alert(error);
        return;
      }) 
      
      
      setForm({ name: "", roll: "" });
    }

    async function onSubmitOut(e){
      var newDate = (new Date()).toLocaleString("en-GB", { timeZone: 'IST' });
      const checkOut={...form, checkInTime: "", checkOutTime: newDate};
      console.log(checkOut);

      const response = await fetch("http://localhost:5000/record/update",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkOut)
      })
      .then(
        // console.log("yes");
        await fetch("http://localhost:5000/record/update",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(checkOut)
        })
        .then(console.log("success"))
        .catch(error=>{
          window.alert(error);
          return;
        })  
      )
      .catch(error=>{
        window.alert(error);
        return;
      })
      console.log(response);
        
      setForm({ name: "", roll: "" });
      return;
    }

    return (
    <div
    className='form-div'
    >
      <div className='form-fields'>
        <TextField
            sx={{ input: { color: 'white' } }}
            required
            id="outlined-required"
            label="Name"
            placeholder="Student Name"
            defaultValue=""
            color='warning'
            onChange={(e)=>updateForm({name: e.target.value})}
          />
          <TextField
            required
            id="outlined-number"
            label="Roll Number"
            type="number"
            color='warning'
            onChange={(e)=>updateForm({roll: e.target.value})}
          />
      </div>
      <div className='form-btn'>
        <Button variant="contained" color='success' onClick={(e)=>onSubmitIn(e)}>Check in</Button>
        <Button variant="contained" color='secondary' onClick={(e)=>onSubmitOut(e)}>Check out</Button>
      </div>
        
    </div>
    
    )
}
