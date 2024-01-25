import {render , screen } from '@testing-library/react'
import { vi } from 'vitest'

import HomePage from '../app/page'


vi.mock('@clerk/nextjs', () => {
    return {
        auth: () => new Promise ((resolve) => resolve({userId: 'asdfjZDDBfsdbsdftnh'})),
        ClerkProvider: ({ children }) => <div>{children}</div>,
        useUser: () => ({
            isSignedIn: true,
            user: {
              id: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC',
              fullName: 'Charles Harris',
            },
          }),
    }
})

test('Home', async () => {
    render( await  HomePage())
    expect(screen.getByText('get started')).toBeTruthy()
})

test('renders home componet correctly', async () => {
  render( await HomePage())

  const headingElement = screen.getByText(/The best Journal app, period./i);
  const buttonElement = await screen.findByText(/get started/i);

  // Assertions
  expect(headingElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();

})

test('redirects to /journal for authenticated users', async () => {
  // Render the Home component
  render( await HomePage());

  // Verify that the link points to /journal for authenticated users
  const linkElement = await screen.findByRole('link');
  expect(linkElement).toHaveAttribute('href', '/journal');
});

test('redirects to /new-user for unauthenticated users', async () => {
  // Mock the auth function to return no userId
  vi.mock('@clerk/nextjs', () => ({
    auth: () => new Promise((resolve) => resolve({})),
  }));

  // Render the Home component
  render(await HomePage());

  // Verify that the link points to /new-user for unauthenticated users
  const linkElement = await screen.findByRole('link');
  expect(linkElement).toHaveAttribute('href', '/new-user');
});