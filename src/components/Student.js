import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Paper, Button } from '@mui/material';
import axios from 'axios';

export default function Student() {
    const paperStyle = {
        'padding': '50px 20px',
        'width': '600',
        'margin': '20px auto'
    }

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [students, setStudents] = useState([]);

    const handleClick = async (e) => {
        e.preventDefault();
        const student = {
            name,
            address
        }
        console.log(student);
        fetch("http://localhost:8080/student/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)
        }).then(() => {
            console.log("New student added")
        });
    }

    useEffect(() => {
        fetch("http://localhost:8080/student/getAll")
            .then(
                res => res.json()
            )
            .then(
                (result) => {
                    setStudents(result);
                })
    }, [])

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '60ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <Paper elevation={3} style={paperStyle}>
                <h1><u>Add Student</u></h1>
                <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField id="outlined-basic" label="Student Address" variant="outlined" fullWidth
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleClick}>
                    Submit
                </Button>
            </Paper>
            <Paper elevation={3} style={paperStyle}>
                <h1>Students</h1>
                {students.map(student => (
                    <Paper elevation={6} style={{margin:'10px', padding:'15px', textAlign:'left'}} key={student.id}>
                        Id: {student.id} <br/>
                        Name: {student.name} <br/>
                        Address: {student.address}
                    </Paper>
                ))}
            </Paper>
        </Box>
    );
}
