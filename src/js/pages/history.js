export default function HistoryPage() {
    const container = document.createElement('div');
    container.className = 'history-page fade-in';

    container.innerHTML = `
        <h2>Histórico de Hábitos</h2>
        <div class="calendar-container">
            <div class="calendar-header">
                <button id="prev-month" class="btn btn-secondary">&lt;</button>
                <h3 id="current-month"></h3>
                <button id="next-month" class="btn btn-secondary">&gt;</button>
            </div>
            <div class="calendar" id="habits-calendar"></div>
        </div>
        <div class="history-summary">
            <h3>Resumo do Mês</h3>
            <div class="summary-stats">
                <div class="stat-card">
                    <h4>Total de Hábitos</h4>
                    <p id="total-habits">0</p>
                </div>
                <div class="stat-card">
                    <h4>Taxa de Conclusão</h4>
                    <p id="completion-rate">0%</p>
                </div>
                <div class="stat-card">
                    <h4>Sequência Atual</h4>
                    <p id="current-streak">0 dias</p>
                </div>
            </div>
        </div>
    `;

    let currentDate = new Date();
    updateCalendar(currentDate);

    const prevMonth = container.querySelector('#prev-month');
    const nextMonth = container.querySelector('#next-month');

    prevMonth.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar(currentDate);
    });

    nextMonth.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar(currentDate);
    });

    return container;
}

function updateCalendar(date) {
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                       'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    
    const currentMonth = document.querySelector('#current-month');
    currentMonth.textContent = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

    const calendar = document.querySelector('#habits-calendar');
    calendar.innerHTML = '';

    // Criar cabeçalho dos dias da semana
    const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    weekDays.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day-header';
        dayElement.textContent = day;
        calendar.appendChild(dayElement);
    });

    // Obter o primeiro dia do mês e total de dias
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    // Adicionar dias vazios até o primeiro dia do mês
    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendar.appendChild(emptyDay);
    }

    // Adicionar os dias do mês
    for (let i = 1; i <= lastDay.getDate(); i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = i;

        // Adicionar classe para o dia atual
        if (date.getMonth() === new Date().getMonth() && 
            date.getFullYear() === new Date().getFullYear() && 
            i === new Date().getDate()) {
            dayElement.classList.add('today');
        }

        calendar.appendChild(dayElement);
    }

    // Carregar dados do histórico
    loadHistoryData(date);
}

async function loadHistoryData(date) {
    try {
        const response = await fetch(`http://localhost:3000/registros?month=${date.getMonth() + 1}&year=${date.getFullYear()}`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            updateCalendarWithData(data);
            updateSummaryStats(data);
        }
    } catch (error) {
        console.error('Erro ao carregar histórico:', error);
    }
}

function updateCalendarWithData(data) {
    const days = document.querySelectorAll('.calendar-day:not(.empty)');
    days.forEach(day => {
        const date = day.textContent;
        const records = data.filter(record => new Date(record.data).getDate() === parseInt(date));
        
        if (records.length > 0) {
            const completionRate = records.filter(r => r.status_id === 1).length / records.length;
            day.style.backgroundColor = `hsl(${120 * completionRate}, 70%, 70%)`;
        }
    });
}

function updateSummaryStats(data) {
    const totalHabits = document.querySelector('#total-habits');
    const completionRate = document.querySelector('#completion-rate');
    const currentStreak = document.querySelector('#current-streak');

    const uniqueHabits = [...new Set(data.map(r => r.habito_id))].length;
    const completed = data.filter(r => r.status_id === 1).length;
    const total = data.length;

    totalHabits.textContent = uniqueHabits;
    completionRate.textContent = `${Math.round((completed / total) * 100)}%`;
    
    // Calcular sequência atual
    let streak = 0;
    const today = new Date();
    let currentDate = new Date();

    while (true) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const dayRecords = data.filter(r => r.data === dateStr);
        
        if (dayRecords.length === 0 || dayRecords.some(r => r.status_id !== 1)) {
            break;
        }
        
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
    }

    currentStreak.textContent = `${streak} dias`;
}

function getToken() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.token : null;
}