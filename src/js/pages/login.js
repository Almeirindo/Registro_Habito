export default function LoginPage() {
    const container = document.createElement('div');
    container.className = 'auth-page fade-in';

    container.innerHTML = `
        <div class="auth-card">
            <h2>Login</h2>
            <form id="login-form" class="auth-form">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Senha</label>
                    <input type="password" id="password" required>
                </div>
                <button type="submit" class="btn btn-primary">Entrar</button>
            </form>
            <p class="auth-link">
                Não tem uma conta? <a href="#" data-page="register">Cadastre-se</a>
            </p>
        </div>
    `;

    const form = container.querySelector('#login-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = form.email.value;
        const password = form.password.value;

        try {
            const response = await fetch('http://localhost:3000/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('user', JSON.stringify(data));
                window.location.href = '#/habits';
            } else {
                alert('Email ou senha inválidos');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Erro ao fazer login');
        }
    });

    return container;
}