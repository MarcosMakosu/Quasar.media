https://www.youtube.com/watch?v=SnDElseQs9M


<a href="#" class="logo">
    <img src="logo.webp" alt="Quasar Media Logo" class="logo-img">
    quasar<span>.media</span>
</a>
---
`
.logo-imaf {
    display: flex;
    align-items: center; /* Alinha imagem e texto verticalmente */
    gap: 12px;           /* Espaço entre a imagem e o nome */
}

.logo-img {
    height: 40px;        /* Ajuste a altura conforme necessário */
    width: auto;         /* Mantém a proporção da imagem */
    object-fit: contain;
}         `                                                                                                                                                           `                                                                                                                  logo circular caso o cliente queira
.logo-img {
    height: 58px;
    width: 58px;
    object-fit: contain;
    border-radius: 50%;              
    border: 3px solid rgba(0, 168, 255, 0.4);
    background: #111111;
    padding: 6px;
    filter: drop-shadow(0 4px 12px rgba(0, 168, 255, 0.4));
    transition: transform 0.3s ease, border-color 0.3s ease;
}
.logo-img:hover {
    transform: scale(1.08);
    border-color: var(--blue-electric);     `