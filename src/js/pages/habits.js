export default function HabitsPage() {
    const container = document.createElement('div');
    container.className = 'habits-page fade-in';

    container.innerHTML = `
        <div class="habits-header">
            <h2>Meus Hábitos</h2>
            <button id="add-habit" class="btn btn-primary">+ Novo Hábito</button>
        </div>
        <div class="habits-grid" id="habits-list">
            <!-- Hábitos serão carregados aqui -->
        </div>
        <div id="habit-modal" class="modal">
            <div class="modal-content">
                <h3>Novo Hábito</h3>
                <form id="habit-form">
                    <div class="form-group">
                        <label for="habit-title">Título</label>
                        <input type="text" id="habit-title" required>
                    </div>
                    <div class="form-group">
                        <label for="habit-description">Descrição</label>
                        <textarea id="habit-description"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="habit-frequency">Frequência</label>
                        <select id="habit-frequency" required>
                            <option value="1">Diário</option>
                            <option value="2">Semanal</option>
                            <option value="3">Mensal</option>
                        </select>
                    </div>
                    <div class="modal-buttons">
                        <button type="button" class="btn btn-secondary" id="cancel-habit">Cancelar</button>
                        <button type="submit" class="btn btn-primary">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    // Carregar hábitos do usuário
    loadHabits();

    // Event listeners
    const addButton = container.querySelector('#add-habit');
    const modal = container.querySelector('#habit-modal');
    const cancelButton = container.querySelector('#cancel-habit');
    const habitForm = container.querySelector('#habit-form');

    addButton.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    cancelButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    habitForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = habitForm.querySelector('#habit-title').value;
        const description = habitForm.querySelector('#habit-description').value;
        const frequencyId = habitForm.querySelector('#habit-frequency').value;

        try {
            const response = await fetch('http://localhost:3000/habitos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: JSON.stringify({
                    titulo: title,
                    descricao: description,
                    frequencia_id: frequencyId,
                    usuario_id: getUserId()
                })
            });

            if (response.ok) {
                modal.style.display = 'none';
                habitForm.reset();
                loadHabits();
            } else {
                alert('Erro ao criar hábito');
            }
        } catch (error) {
            console.error('Erro ao criar hábito:', error);
            alert('Erro ao criar hábito');
        }
    });

    return container;
}

async function loadHabits() {
    try {
        const response = await fetch('http://localhost:3000/habitos', {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });

        if (response.ok) {
            const habits = await response.json();
            const habitsList = document.querySelector('#habits-list');
            habitsList.innerHTML = '';

            habits.forEach(habit => {
                const habitCard = createHabitCard(habit);
                habitsList.appendChild(habitCard);
            });
        }
    } catch (error) {
        console.error('Erro ao carregar hábitos:', error);
    }
}

function createHabitCard(habit) {
    const card = document.createElement('div');
    card.className = 'habit-card';
    
    card.innerHTML = `
        <h3>${habit.titulo}</h3>
        <p>${habit.descricao || 'Sem descrição'}</p>
        <div class="habit-status">
            <div class="custom-checkbox ${habit.completed ? 'checked' : ''}" data-id="${habit.id}"></div>
            <span>Hoje</span>
        </div>
    `;

    const checkbox = card.querySelector('.custom-checkbox');
    checkbox.addEventListener('click', async () => {
        try {
            const response = await fetch(`http://localhost:3000/registros`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: JSON.stringify({
                    habito_id: habit.id,
                    data: new Date().toISOString().split('T')[0],
                    status_id: checkbox.classList.contains('checked') ? 2 : 1
                })
            });

            if (response.ok) {
                checkbox.classList.toggle('checked');
            }
        } catch (error) {
            console.error('Erro ao atualizar status:', error);
        }
    });

    return card;
}

function getToken() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.token : null;
}

function getUserId() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.id : null;
}