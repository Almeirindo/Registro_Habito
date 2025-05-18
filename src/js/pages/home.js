import { animateElement } from '../main.js';

export default function HomePage() {
    const container = document.createElement('div');
    container.className = 'home-page fade-in';

    container.innerHTML = `
        <h1>Bem-vindo ao Diário de Hábitos</h1>
        <div class="card">
            <h2>Resumo do Dia</h2>
            <div class="progress-bar">
                <div class="progress-bar-fill" style="width: 70%"></div>
            </div>
            <p>5 de 7 hábitos completados hoje</p>
        </div>
        <div class="habits-summary">
            <h2>Seus Hábitos</h2>
            <div class="habits-grid">
                <!-- Hábitos serão inseridos aqui dinamicamente -->
            </div>
        </div>
    `;

    // Adiciona alguns hábitos de exemplo
    const habitsGrid = container.querySelector('.habits-grid');
    const habits = [
        { title: 'Exercício', completed: true },
        { title: 'Leitura', completed: false },
        { title: 'Meditação', completed: true }
    ];

    habits.forEach(habit => {
        const habitCard = createHabitCard(habit);
        habitsGrid.appendChild(habitCard);
    });

    return container;
}

function createHabitCard(habit) {
    const card = document.createElement('div');
    card.className = 'card';
    
    card.innerHTML = `
        <div class="habit-header">
            <h3>${habit.title}</h3>
            <div class="custom-checkbox ${habit.completed ? 'checked' : ''}"></div>
        </div>
    `;

    const checkbox = card.querySelector('.custom-checkbox');
    checkbox.addEventListener('click', () => {
        checkbox.classList.toggle('checked');
        animateElement(checkbox, 'fade-in');
    });

    return card;
}