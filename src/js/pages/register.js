export default function RegisterPage() {
    const container = document.createElement('div');
    container.className = 'auth-page fade-in';

    container.innerHTML = `
        <div class="auth-card">
            <h2>Cadastro</h2>
            <form id="register-form" class="auth-form">
                <div class="form-group">
                    <label for="name">Nome</label>
                    <input type="text" id="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Senha</label>
                    <input type="password" id="password" required>
                </div>
                <button type="submit" class="btn btn-primary">Cadastrar</button>
            </form>
            <p class="auth-link">
                Já tem uma conta? <a href="#" data-page="login">Faça login</a>
            </p>
        </div>
    `;

    const form = container.querySelector('#register-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        try {
            const response = await fetch('http://localhost:3000/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome: name, email, senha: password })
            });

            if (response.ok) {
                alert('Cadastro realizado com sucesso!');
                window.location.href = '#/login';
            } else {
                alert('Erro ao realizar cadastro');
            }
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            alert('Erro ao realizar cadastro');
        }
    });

    return container;
}