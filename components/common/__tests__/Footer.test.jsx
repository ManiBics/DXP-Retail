import { screen, render } from '@testing-library/react';
import Footer from '../Footer';
import { mockFooterData } from '../__mocks__/Footer.mock';

test('it renders footer content', () => {
    render(<Footer {...mockFooterData}/>);
});

test('it renders social media icons', () => {
    render(<Footer {...mockFooterData}/>);

    const icons = screen.getAllByTestId('icon');
    expect(icons).toHaveLength(2);
});

test('it renders stat items', () => {
    render(<Footer {...mockFooterData} />);

    const statItems = screen.getAllByTestId('statItem');
    expect(statItems).toHaveLength(2);
});

test('it renders disclaimer and copy rights content', () => {
    render(<Footer {...mockFooterData}/>);

    const disclaimer = screen.getByTestId('disclaimer');
    const copyRightsText = screen.getByTestId('copyRights');

    expect(disclaimer).toBeTruthy();
    expect(copyRightsText).toBeTruthy();
});