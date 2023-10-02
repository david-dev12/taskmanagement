import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchTask, updateTask } from '../apis';
import { useForm } from '../hooks/useForm';
import { TextField, Slider, Button, Typography, Container, Box, Grid, Snackbar } from '@mui/material';
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
function TaskDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [values, handleChange, setValues] = useForm({
        title: '',
        description: '',
        priority: 0,
        status: 0,
    });
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await fetchTask(id);
                setTask(response.data);
                const { title, description, priority, status } = response.data;
                setValues({ title, description, priority, status });
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetch();
    }, [id]);

    const handleSubmit = async (event) => {
        const res = {
            title: values.title,
            description: values.description,
            priority: parseInt(values.priority),
            status: parseInt(values.status)
        }
        event.preventDefault();
        try {
            await updateTask(task.id, res);
            navigate('/');
        } catch (error) {
            setErrorMessage('Error updating task!');
            setOpen(true);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    if (!task) {
        return <div>Loading...</div>;
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                <Typography variant="h6" component="div">Task ID: {task.id}</Typography>
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
                                onChange={(e, val) => handleChange({ target: { name: 'priority', value: val } })}
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
                            <Button type="submit" variant="contained" color="primary" sx={{ mr: 1 }}>Update</Button>
                            <Button variant="outlined" color="primary" component={Link} to={`/`}>
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
        </Container>
    );
}

export default TaskDetail;