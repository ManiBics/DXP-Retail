import { getByText, render, screen } from '@testing-library/react';
import user from '@testing-library/user-event'
import Table from '../Table';
import { mockTableData } from '../__mocks__/Table.mock';

test('it displays all rows and columns in table', () => {
    render(<Table rows={mockTableData.rows} columns={mockTableData.columns}/>);
});

test('user navigates to order details page', () => {
    render(<Table rows={mockTableData.rows} columns={mockTableData.columns}/>)

    const viewMoreLinks = screen.getAllByRole('link');
    user.click(viewMoreLinks[0]);
});

test('it displays message on empty rows', () => {
    render(<Table rows={[]} columns={mockTableData.columns} />);

    const table = screen.getByRole('table');
    const message = getByText(table, 'No orders found');
    expect(message).toBeTruthy();
})