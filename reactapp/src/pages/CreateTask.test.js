import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateTask from './CreateTask';
import { createTask } from '../apis';

jest.mock('../apis');
jest.mock('axios', () => ({
    post: jest.fn(() => Promise.resolve({ data: {} })),
    // Add other methods if needed
}));

describe('CreateTask', () => {
    test('renders CreateTask component', () => {
        render(<CreateTask />);
        expect(screen.getByText(/Create/i)).toBeInTheDocument();
        expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
    });

    test('allows the user to fill the form', async () => {
        render(<CreateTask />);
        fireEvent.change(screen.getByLabelText(/Title/i), {
            target: { value: 'Test task' },
        });
        fireEvent.change(screen.getByLabelText(/Description/i), {
            target: { value: 'Test description' },
        });

        // Add more fireEvent.change for priority and status sliders

        expect(screen.getByLabelText(/Title/i)).toHaveValue('Test task');
        expect(screen.getByLabelText(/Description/i)).toHaveValue('Test description');
    });

    test('submits the form', async () => {
        createTask.mockResolvedValueOnce();

        render(<CreateTask />);
        fireEvent.change(screen.getByLabelText(/Title/i), {
            target: { value: 'Test task' },
        });
        fireEvent.change(screen.getByLabelText(/Description/i), {
            target: { value: 'Test description' },
        });

        // Add more fireEvent.change for priority and status sliders

        fireEvent.click(screen.getByText(/Create/i));

        await waitFor(() => expect(createTask).toHaveBeenCalledTimes(1));

        // Check the arguments of the createTask function
        expect(createTask).toHaveBeenCalledWith({
            title: 'Test task',
            description: 'Test description',
            // Add priority and status
        });
    });

    // Add more tests for other functionalities, like the Snackbar and Dialog components
});