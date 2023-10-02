import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createTask } from '../apis';
import { useForm } from '../hooks/useForm';
import { TextField, Slider, Button, Typography, Container, Box, Grid, Snackbar } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Alert from '@mui/material/Alert';

const priorityMarks = [
    { value: 0, label: 'Low' },
    { value: 1, label: 'Medium' },
    { value: 2, label: 'High' },
];

const statusMarks = [
    { value: 0, label: 'Pending' },
    { value: 1, label: 'In Progress' },
    { value: 2, label: 'Completed' },
    { value: 3, label: 'Archived' },
];

function CreateTask() {
    const navigate = useNavigate();
    const [values, handleChange, setValues] = useForm({
        title: '',
        description: '',
        priority: 0,
        status: 0,
    });
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        const res = {
            title: values.title,
            description: values.description,
            priority: parseInt(values.priority),
            status: parseInt(values.status)
        }
        event.preventDefault();
        try {
            await createTask(res);
            //navigate('/');
            setValues({
                title: '',
                description: '',
                priority: 0,
                status: 0,
            });            
        } catch (error) {
            setErrorMessage('Error creating task!');
            setOpen(true);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handlePriorityChange = (event, value) => {
        if (value === 2) {
            setOpenDialog(true);
        } else {
            handleChange({ target: { name: 'priority', value: value } });
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="title"
                                value={values.title}
                                onChange={handleChange}
                                label="Title"
                                variant="outlined"
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                label="Description"
                                variant="outlined"
                                multiline
                                rows={4}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography id="priority-slider" gutterBottom>
                                Priority
                            </Typography>
                            <Slider
                                name="priority"
                                value={values.priority}
                                onChange={handlePriorityChange}
                                aria-labelledby="priority-slider"
                                step={1}
                                marks={priorityMarks}
                                min={0}
                                max={2}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography id="status-slider" gutterBottom>
                                Status
                            </Typography>
                            <Slider
                                name="status"
                                value={values.status}
                                onChange={(e, val) => handleChange({ target: { name: 'status', value: val } })}
                                aria-labelledby="status-slider"
                                step={1}
                                marks={statusMarks}
                                min={0}
                                max={3}
                            />
                        </Grid>
                        <Grid item xs={12} display="flex" justifyContent="flex-end">
                            <Button type="submit" variant="contained" color="error" sx={{ mr: 1 }}>Create</Button>
                            <Button variant="outlined" color="error" component={Link} to={`/`}>
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        {errorMessage}
                    </Alert>
                </Snackbar>
            </Box>
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You are about to set the priority of this task to "High". Are you sure you want to proceed?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        No
                    </Button>
                    <Button onClick={() => { handleChange({ target: { name: 'priority', value: 2 } }); setOpenDialog(false); }} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default CreateTask;