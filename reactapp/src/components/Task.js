import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Chip, LinearProgress } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

const priorityColors = ['info', 'warning', 'error'];
const priorityLabels = ['Low', 'Medium', 'High'];
const statusLabels = ['Pending', 'In Progress', 'Completed', 'Archived'];

const statusColors = {
    0: 'error',
    1: 'primary',
    2: 'info',
    3: 'success'
};

const Task = ({ task, onDelete }) => (
    <Box key={task.id} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" sx={{ width: '80%' }}>
                <Chip label={task.id} sx={{ mr: 1 }} />
                <Typography variant="h6">{task.title}</Typography>
            </Box>
            <Box sx={{ width: '20%' }}>
                <Typography variant="caption">{priorityLabels[task.priority]}</Typography>
                <LinearProgress variant="determinate" value={(task.priority + 1) * 33.33} color={priorityColors[task.priority]} />
                <Typography variant="caption">{statusLabels[task.status]}</Typography>
                <LinearProgress variant="determinate" value={(task.status + 1) * 25} color={statusColors[task.status]} />
            </Box>
        </Box>
        <Typography variant="body1" color="text.secondary">{task.description}</Typography>
        <Box display="flex" justifyContent="flex-end">
            <Button variant="outlined" color="primary" component={Link} to={`/tasks/${task.id}`} sx={{ mr: 1 }}>
                <EditIcon sx={{ mr: 1 }} />
                Edit
            </Button>
            <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => onDelete(task.id)}>
                Delete
            </Button>
        </Box>
    </Box>
);

export default Task;