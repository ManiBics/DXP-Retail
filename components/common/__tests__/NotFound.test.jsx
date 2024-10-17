import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import NotFound from '../NotFound';

jest.mock('next/navigation', () => require('next-router-mock'));

test('it renders not found page', () => {
    render(<NotFound />);
});

test('it renders heading and paragraph for not found', () => {
    render(<NotFound />);

    const heading = screen.findByRole('heading', {
        name: /404 - Page Not Found/i
    });
    const paragraph = screen.findByRole('paragraph', {
        name: /Oops! The page you are looking for does not exist/i
    });

    expect(heading).toBeTruthy();
    expect(paragraph).toBeTruthy();
});

test('navigate user to home page', () => {
    render(<NotFound />);

    const button = screen.findByRole('button', {
        name: /go home/i
    });
    
    user.click(button);
});