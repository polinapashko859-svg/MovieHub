export const workouts = [
  { 
    id: 1, 
    title: 'Утренний Детокс', 
    description: 'Мягкое пробуждение организма через систему глубоких растяжек и дыхательных практик. Идеально для начала продуктивного дня.',
    duration: 15, calories: 110, intensity: '🟢 Низкая', 
    exercises: ['Растяжка шеи', 'Кошка-корова', 'Наклоны'], 
    image: 'https://i.pinimg.com/736x/21/e5/ce/21e5ce0ec56bd23504a7a1aae3289283.jpg' 
  },
  { 
    id: 2, 
    title: 'Стальной Пресс', 
    description: 'Интенсивная проработка мышц кора. Комплекс направлен на формирование рельефа и укрепление мышц-стабилизаторов.',
    duration: 25, calories: 280, intensity: '🟡 Средняя', 
    exercises: ['Скручивания', 'Планка 1 мин', 'Велосипед'], 
    image: 'https://i.pinimg.com/736x/7f/72/3f/7f723f4630753138f9c29eded190ae0b.jpg' 
  },
  { 
    id: 3, 
    title: 'Взрывное Кардио', 
    description: 'Высокоинтенсивный интервальный тренинг (HIIT). Максимальное сжигание жира и развитие выносливости сердца.',
    duration: 40, calories: 550, intensity: '🔴 Высокая', 
    exercises: ['Берпи', 'Прыжки со скакалкой', 'Бег на месте'], 
    image: 'https://i.pinimg.com/736x/47/8c/8d/478c8d03dcf7bc2d50db1c0028a5f878.jpg' 
  },
  { 
    id: 4, 
    title: 'Сила Атланта', 
    description: 'Работа со свободными весами. Направлена на гипертрофию мышц плечевого пояса и ног. Требует базовой подготовки.',
    duration: 50, calories: 420, intensity: '🔴 Высокая', 
    exercises: ['Приседания с весом', 'Жим гантелей', 'Выпады'], 
    image: 'https://i.pinimg.com/736x/e4/7e/67/e47e67aa10faa64c7f6c058832d2e3ee.jpg' 
  },
  { 
    id: 5, 
    title: 'Йога Баланс', 
    description: 'Поиск равновесия между телом и разумом. Статические асаны на координацию и укрепление глубоких мышц.',
    duration: 30, calories: 180, intensity: '🟢 Низкая', 
    exercises: ['Поза дерева', 'Поза воина II', 'Собака мордой вниз'], 
    image: 'https://i.pinimg.com/736x/b0/95/93/b0959353d610bb05947358ad9208bf0f.jpg' 
  },
  { 
    id: 6, 
    title: 'Вечерний Релакс', 
    description: 'Снятие мышечных зажимов после рабочего дня. Глубокое расслабление и подготовка к качественному сну.',
    duration: 10, calories: 50, intensity: '🟢 Низкая', 
    exercises: ['Медитация', 'Дыхание 4-7-8', 'Шавасана'], 
    image: 'https://i.pinimg.com/1200x/df/6f/9c/df6f9c6ca8904e465073090857566799.jpg' 
  },
  { 
    id: 7, 
    title: 'Кроссфит Драйв', 
    description: 'Функциональная тренировка на пределе возможностей. Объединяет атлетику, гимнастику и силовые элементы.',
    duration: 35, calories: 600, intensity: '🔴 Высокая', 
    exercises: ['Махи гирей', 'Запрыгивания на бокс', 'Трастеры'], 
    image: 'https://i.pinimg.com/736x/15/9e/65/159e656a96ae84f6dce490c4ef1d3c85.jpg' 
  }
];

export const achievements = [
  { id: 1, title: 'Первая кровь', icon: '⚡', desc: 'Первая тренировка завершена!', color: '#ccff00', isLocked: false },
  { id: 2, title: 'Мастер дзен', icon: '🧘', desc: '100 минут медитации', color: '#00e5ff', isLocked: false },
  { id: 3, title: 'Чемпион', icon: '🏆', desc: '7 дней активного тренинга', color: '#ff00ff', isLocked: true }
];

export const userStats = [
  { label: 'Выносливость', value: 72, color: '#ccff00' },
  { label: 'Сила', value: 45, color: '#00e5ff' },
  { label: 'Гибкость', value: 90, color: '#ff00ff' }
];