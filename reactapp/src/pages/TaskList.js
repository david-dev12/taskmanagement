import React, { useState, useEffect, useCallback } from 'react';
import { createConnection } from '../apis/signalRConnection';
import { deleteTask, fetchTasks } from '../apis/index';
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import Task from '../components/Task';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './TaskList.css'; // import CSS file for transitions
import { Box, CircularProgress } from '@mui/material';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const connection = createConnection({
            onTaskCreated: (task) => {
                if (hasMore) {
                    return;
                }
                setTasks((prevTasks) => {
                    if (prevTasks.find(t => t.id === task.id)) {
                        return prevTasks;
                    }
                    return [...prevTasks, task];
                });
            },
            onTaskUpdated: (updatedTask) => {
                setTasks((prevTasks) => prevTasks.map((task) => task.id === updatedTask.id ? updatedTask : task));
            },
            onTaskDeleted: (id) => {
                setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
            }
        });

        connection.start()
            .then(() => console.log("Connection started"))
            .catch((err) => console.log("Error establishing connection: ", err));

        return () => {
            connection.stop();
        }
    }, [hasMore]);

    const handleDeleteTask = async (id) => {
        try {
            await deleteTask(id);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const fetchMoreTasks = useCallback(() => {
        const fetch = async () => {
            try {
                const cursor = tasks.length > 0 ? tasks[tasks.length - 1].id : 0;
                const response = await fetchTasks(cursor);
                if (response.data.length === 0) {
                    setHasMore(false);
                    return;
                }
                setTasks((prevTasks) => [...prevTasks, ...response.data]);
            } catch (error) {
                console.log('Error:', error);
            }
        };
        fetch();
    }, [tasks]);
    const [ref] = useInfiniteScroll(fetchMoreTasks);

    return (
        <Box sx={{ padding: '20px' }}>
            <TransitionGroup className="task-list">
                {tasks.map(task => (
                    <CSSTransition key={task.id} timeout={500} classNames="item">
                        <Task task={task} onDelete={handleDeleteTask} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
            {hasMore && (
                <Box display="flex" justifyContent="center" alignItems="center" height="200px" ref={ref}>
                    <CircularProgress />
                </Box>)}
        </Box>
    );
}

export default TaskList;