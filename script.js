document.addEventListener("DOMContentLoaded", () => {
        const brandTitle = document.querySelector('.brand-title');
        
        // Executa apenas se for mobile/tablet (telas menores ou iguais a 992px)
        if (window.innerWidth <= 992 && brandTitle) {
            
            window.addEventListener('scroll', () => {
                // Se o usuário rolar mais do que 40 pixels para baixo, o texto abre
                if (window.scrollY > 40) {
                    brandTitle.classList.add('active');
                } else {
                    // Se ele voltar para o topo do site, o texto fecha de novo
                    brandTitle.classList.remove('active');
                }
            });
            
        }
    });







    document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const header = document.querySelector('header');

    if (menuToggle && header) {
        menuToggle.addEventListener('click', () => {
            // Alterna a animação do botão hambúrguer (vira X)
            menuToggle.classList.toggle('active');
            // Abre/fecha a gaveta do menu lateral
            header.classList.toggle('active');
        });
    } else {
        console.error("Erro: .menu-toggle ou header não foram encontrados no HTML.");
    }
});