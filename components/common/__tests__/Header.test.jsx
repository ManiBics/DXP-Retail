import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import Header from '../Header';
import { mockHeaderData } from '../__mocks__/Header.mock';

jest.mock('next/navigation', () => {
  return {
    __esModule: true,
    usePathname: () => ({
      pathname: '',
    }),
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }),
    useSearchParams: () => ({
      get: () => {}
    })
  }
})


test('it renders header content', () => {
    render(<Header {...mockHeaderData} />);
});

test('it renders menu links', () => {
    render(<Header {...mockHeaderData} />);

    const menuLinks = screen.getAllByTestId('menuLink');
    expect(menuLinks).toBeTruthy();
    expect(menuLinks).toHaveLength(2);
});

test('it renders sub menu links', () => {
    render(<Header {...mockHeaderData} />);

    const subMenuLinks = screen.getAllByTestId('subMenuLink');
    expect(subMenuLinks).toBeTruthy();
    expect(subMenuLinks).toHaveLength(2);
});

test('it navigates user to another page on clicking a menu link', () => {
    render(<Header {...mockHeaderData} />);

    const menuLinks = screen.getAllByTestId('menuLink');
    expect(menuLinks).toBeTruthy();

    user.click(menuLinks[1]);
});