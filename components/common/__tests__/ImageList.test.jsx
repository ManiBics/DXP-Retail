import { render } from '@testing-library/react';
import ImageList from '../ImageList'
import { mockImages } from '../__mocks__/ImageList.mock';

test('it displays all the images provided in props', () => {
    render(<ImageList image={mockImages}/>);
});