// Router simples
const router = {
    home: () => import('./pages/home.js'),
    login: () => import('./pages/login.js'),
    register: () => import('./pages/register.js'),
    habits: () => import('./pages/habits.js'),
    history: () => import('./pages/history.js'),
    profile: () => import('./pages/profile.js')
};

// Estado global da aplicação
const state = {
    user: null,
    habits: [],
    currentPage: 'home'
};

// Função para navegar entre páginas
async function navigateTo(page) {
    const appContainer = document.getElementById('app');
    state.currentPage = page;

    try {
        const module = await router[page]();
        appContainer.innerHTML = '';
        appContainer.appendChild(module.default());
    } catch (error) {
        console.error('Erro ao carregar a página:', error);
        appContainer.innerHTML = '<h1>Página não encontrada</h1>';
    }
}

// Adiciona event listeners para navegação
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.dataset.page;
            navigateTo(page);
        });
    });

    // Carrega a página inicial
    navigateTo('home');
});

// Funções de utilidade para animações
export function animateElement(element, animation) {
    element.classList.add(animation);
    element.addEventListener('animationend', () => {
        element.classList.remove(animation);
    });
}

// Funções para interagir com a API
export async function fetchApi(endpoint, options = {}) {
    const baseUrl = 'http://localhost:3000';
    const response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        }
    });
    
    if (!response.ok) {
        throw new Error('Erro na requisição');
    }
    
    return response.json();
}