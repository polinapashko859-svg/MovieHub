import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgressChart from '../ProgressChart';

describe('Feature Component: ProgressChart', () => {
  const mockStats = [
    { label: 'Кардио', value: 75, color: '#ff0000' },
    { label: 'Силовые', value: 40, color: '#00ff00' }
  ];

  test('отображает все элементы статистики из пропсов', () => {
    render(<ProgressChart stats={mockStats} />);
    
    expect(screen.getByText('Кардио')).toBeInTheDocument();
    expect(screen.getByText('Силовые')).toBeInTheDocument();
    
    expect(screen.getByText('75%')).toBeInTheDocument();
    expect(screen.getByText('40%')).toBeInTheDocument();
  });

  test('применяет правильную ширину и цвет к полоскам прогресса', () => {
    const { container } = render(<ProgressChart stats={mockStats} />);
    
    const bars = container.querySelectorAll('.stat-bar-fill');
    
    expect(bars[0]).toHaveStyle({ 
      width: '75%',
      backgroundColor: '#ff0000'
    });
  });
});