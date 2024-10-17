import { screen, render } from '@testing-library/react';
import Pagination from '../Pagination';
import { mockPaginationData } from '../__mocks__/Pagination.mock';

test('it renders pagination', () => {
    render(<Pagination {...mockPaginationData}/>);
});

test('it renders previous and next buttons', () => {
    render(<Pagination {...mockPaginationData}/>);

    const buttons = screen.getAllByTestId('paginationButtons');
    expect(buttons).toBeTruthy();
    expect(buttons).toHaveLength(2);
});

test('it renders numbers to navigate products', () => {
    render(<Pagination {...mockPaginationData}/>);

    const numbers = screen.getAllByTestId('paginationNumbers');
    expect(numbers).toBeTruthy();
    expect(numbers).toHaveLength(5);
});