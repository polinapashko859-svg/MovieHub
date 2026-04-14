import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Timer from '../Timer';

describe('UI Component: Timer', () => {
  test('отображает переданное количество минут в формате MM:00', () => {
    render(<Timer minutes={15} />);
    
    const timerValue = screen.getByText('15:00');
    expect(timerValue).toBeInTheDocument();
    expect(timerValue).toHaveStyle({ fontWeight: 'bold' });
  });

  test('показывает alert при клике на таймер', () => {
    window.alert = jest.fn(); 
    
    render(<Timer minutes={10} />);
    const timerElement = screen.getByText('10:00').parentElement;
    
    fireEvent.click(timerElement);
    
    expect(window.alert).toHaveBeenCalledWith('Таймер запущен на 10 мин.');
  });
});