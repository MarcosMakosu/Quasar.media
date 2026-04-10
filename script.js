// Menu mobile
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Fecha menu ao clicar em link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Rolagem suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === "#") return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ==================== CARREGAR DEPOIMENTOS ====================
async function carregarDepoimentos() {
    try {
        const resposta = await fetch('depoimentos.json');
        if (!resposta.ok) throw new Error("Não foi possível carregar depoimentos.json");
        const dados = await resposta.json();

        const marqueeContainer = document.getElementById('reviews-marquee');
        marqueeContainer.innerHTML = '';

        const chavesLinhas = Object.keys(dados)
            .filter(key => key.startsWith('linha'))
            .sort((a, b) => {
                const numA = parseInt(a.replace('linha', '')) || 0;
                const numB = parseInt(b.replace('linha', '')) || 0;
                return numA - numB;
            });

        if (chavesLinhas.length === 0) {
            console.warn("Nenhum depoimento encontrado no JSON.");
            return;
        }

        const criarCard = (item) => `
            <div class="review-item">
                <i class="fas fa-quote-right"></i>
                <p class="review-text">${item.texto}</p>
                <span class="review-author">${item.autor}</span>
            </div>
        `;

        chavesLinhas.forEach((chave, index) => {
            const itens = dados[chave];
            if (!itens || !Array.isArray(itens) || itens.length === 0) return;

            const direcao = (index % 2 === 0) ? 'scroll-left' : 'scroll-right';
            const conteudo = itens.map(criarCard).join('');
            const linhaHTML = conteudo + conteudo;

            const linhaDiv = document.createElement('div');
            linhaDiv.className = `marquee-line ${direcao}`;
            linhaDiv.innerHTML = linhaHTML;

            marqueeContainer.appendChild(linhaDiv);
        });

        console.log(`✅ ${chavesLinhas.length} linha(s) de depoimentos carregada(s)`);
    } catch (erro) {
        console.error("❌ Erro ao carregar depoimentos:", erro);
    }
}

// ==================== CARREGAR EQUIPE ====================
async function carregarEquipe() {
    try {
        const resposta = await fetch('equipe.json');
        if (!resposta.ok) throw new Error("Não foi possível carregar equipe.json");
        const dados = await resposta.json();
        console.log("✅ Equipe carregada:", dados);

        const teamGrid = document.getElementById('team-grid');
        const criarMembroHTML = (membro) => `
            <div class="team-member">
                <img class="team-img" src="${membro.img}" alt="${membro.name}">
                <div class="team-info">
                    <h3>${membro.name}</h3>
                    <div class="team-role">${membro.role}</div>
                    <div class="team-bio">${membro.bio}</div>
                    <div class="team-social">
                        <a href="${membro.social.linkedin}" target="_blank"><i class="fab fa-linkedin-in"></i></a>
                        <a href="${membro.social.instagram}" target="_blank"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
        `;

        teamGrid.innerHTML = dados.team.map(criarMembroHTML).join('');
    } catch (erro) {
        console.error("❌ Erro ao carregar equipe:", erro);
        document.getElementById('team-grid').innerHTML = `
            <p style="color: #ff6b6b; text-align: center; grid-column: 1 / -1;">
                Não foi possível carregar a equipe no momento. Tente novamente mais tarde.
            </p>
        `;
    }
}

// ==================== CARREGAR CLIENTES ====================
async function carregarClientes() {
    try {
        const resposta = await fetch('clientes.json');
        if (!resposta.ok) throw new Error("Não foi possível carregar clientes.json");
        const dados = await resposta.json();
        const grid = document.getElementById('clients-grid');

        const htmlClientes = dados.clients.map(cliente => {
            let conteudo = '';
            if (cliente.logo) {
                conteudo = `
                    <img src="${cliente.logo}" alt="${cliente.name}" class="client-logo">
                    <div class="client-name">${cliente.name}</div>
                `;
            } else if (cliente.icon) {
                conteudo = `
                    <i class="${cliente.icon}"></i>
                    <div class="client-name">${cliente.name}</div>
                `;
            }

            // 👇 TRECHO QUE VERIFICA O LINK E CRIA O <a> OU <div>
            if (cliente.link) {
                return `
                    <a href="${cliente.link}" target="_blank" class="client-item" style="text-decoration: none; color: inherit;">
                        ${conteudo}
                    </a>
                `;
            }
            return `<div class="client-item">${conteudo}</div>`;
        }).join('');

        grid.innerHTML = htmlClientes;
    } catch (erro) {
        console.error("❌ Erro ao carregar clientes:", erro);
    }
}
// Inicializa todos os carregamentos
window.addEventListener('load', () => {
    carregarDepoimentos();
    carregarEquipe();
    carregarClientes();
});