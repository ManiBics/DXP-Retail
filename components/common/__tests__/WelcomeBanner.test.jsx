import { render, screen } from "@testing-library/react";
import WelcomeBanner from "../WelcomeBanner";
import { mockImages } from "../__mocks__/ImageList.mock";

test('it renders welcome banner content', () => {
    render(<WelcomeBanner image={mockImages}/>);
});

test('it renders images in welcome banner content', () => {
    render(<WelcomeBanner image={mockImages}/>);

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3)
});