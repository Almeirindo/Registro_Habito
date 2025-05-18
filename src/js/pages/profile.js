export default function ProfilePage() {
    const container = document.createElement('div');
    container.className = 'profile-page fade-in';

    const user = JSON.parse(localStorage.getItem('user')) || {};

    container.innerHTML = `
        <div class="profile-card">
            <h2>Perfil</h2>
            <form id="profile-form" class="profile-form">
                <div class="form-group">
                    <label for="name">Nome</label>
                    <input type="text" id="name" value="${user.nome || ''}" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" value="${user.email || ''}" required>
                </div>
                <div class="form-group">
                    <label for="new-password">Nova Senha</label>
                    <input type="password" id="new-password">
                    <small>Deixe em branco para manter a senha atual</small>
                </div>
                <button type="submit" class="btn btn-primary">Salvar Alterações</button>
            </form>
            <button id="logout" class="btn btn-secondary mt-4">Sair</button>
        </div>
        <div class="stats-section">
            <h3>Estatísticas</h3>
            <div class="stats-grid">
                <div class="stat-card">
                    <h4>Total de Hábitos</h4>
                    <p id="total-habits">0</p>
                </div>
                <div class="stat-card">
                    <h4>Hábitos Ativos</h4>
                    <p id="active-habits">0</p>
                </div>
                <div class="stat-card">
                    <h4>Maior Sequência</h4>
                    <p id="best-streak">0 dias</p>
                </div>
            </div>
        </div>
    `;

    const form = container.querySelector('#profile-form');
    const logoutButton = container.querySelector('#logout');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = form.name.value;
        const email = form.email.value;
        const newPassword = form.querySelector('#new-password').value;

        try {
            const response = await fetch(`http://localhost:3000/usuarios/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: JSON.stringify({
                    nome: name,
                    email,
                    senha: newPassword || undefined
                })
            });

            if (response.ok) {
                const updatedUser = await response.json();
                localStorage.setItem('user', JSON.stringify({
                    ...user,
                    nome: updatedUser.nome,
                    email: updatedUser.email
                }));
                alert('Perfil atualizado com sucesso!');
            } else {
                alert('Erro ao atualizar perfil');
            }
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            alert('Erro ao atualizar perfil');
        }
    });

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('user');
        window.location.href = '#/login';
    });

    // Carregar estatísticas
    loadUserStats();

    return container;
}

async function loadUserStats() {
    try {
        const response = await fetch('http://localhost:3000/usuarios/stats', {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });

        if (response.ok) {
            const stats = await response.json();
            document.querySelector('#total-habits').textContent = stats.totalHabits;
            document.querySelector('#active-habits').textContent = stats.activeHabits;
            document.querySelector('#best-streak').textContent = `${stats.bestStreak} dias`;
        }
    } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
    }
}

function getToken() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.token : null;
}