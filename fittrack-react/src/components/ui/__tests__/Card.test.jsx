import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '../Card';

describe('UI Component: Card', () => {
  test('отображает переданный текст (children)', () => {
    render(<Card>Контент карточки</Card>);
    expect(screen.getByText('Контент карточки')).toBeInTheDocument();
  });
});