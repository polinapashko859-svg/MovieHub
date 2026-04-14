import { calculateCalories, formatWorkoutTime } from '../fitness';

describe('FitTrack Logic (Вариант 11)', () => {
  

  test('calculateCalories: правильно считает (70кг, 60мин, интенсивность 5)', () => {
    const result = calculateCalories(70, 60, 5);
    expect(result).toBe(350);
  });

  test('calculateCalories: возвращает 0 при некорректных данных', () => {
    expect(calculateCalories(0, 60, 5)).toBe(0);
    expect(calculateCalories(70, -10, 5)).toBe(0);
  });


  test('formatWorkoutTime: превращает 125 секунд в 02:05', () => {
    expect(formatWorkoutTime(125)).toBe('02:05');
  });

  test('formatWorkoutTime: возвращает 00:00 для отрицательных чисел', () => {
    expect(formatWorkoutTime(-5)).toBe('00:00');
  });
});