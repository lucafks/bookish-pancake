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
        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let isDragging = false;
        let isHorizontalSwipe = false;
        const menuWidth = 280;

        // --- 1. CLIQUE TRADICIONAL DO BOTÃO ---
        menuToggle.addEventListener('click', () => {
            header.style.transition = "transform 0.4s cubic-bezier(0.19, 1, 0.22, 1)";
            menuToggle.classList.toggle('active');
            header.classList.toggle('active');
            
            if (!header.classList.contains('active')) {
                header.style.transform = '';
            } else {
                header.style.transform = 'translateX(0px)';
            }
        });

        // --- 2. ANIMAÇÃO EM TEMPO REAL COM BLOQUEIO DE SCROLL ---
        
        header.addEventListener('touchstart', (e) => {
            if (!header.classList.contains('active')) return;
            
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = true;
            isHorizontalSwipe = false; // Reseta a validação de direção
            
            header.style.transition = 'none';
        }, { passive: true });

        header.addEventListener('touchmove', (e) => {
            if (!isDragging) return;

            currentX = e.touches[0].clientX;
            let currentY = e.touches[0].clientY;
            
            let offsetX = currentX - startX;
            let offsetY = currentY - startY;

            // Detecta se o usuário está movendo mais para os lados do que para cima/baixo
            if (!isHorizontalSwipe) {
                // Se o movimento horizontal for maior que o vertical, é um arrasto de menu
                if (Math.abs(offsetX) > Math.abs(offsetY)) {
                    isHorizontalSwipe = true;
                } else {
                    isDragging = false; // É um scroll vertical, cancela o arrasto do menu
                    return;
                }
            }

            // Se for um arrasto do menu, para o scroll do fundo da página imediatamente!
            if (isHorizontalSwipe) {
                if (e.cancelable) e.preventDefault(); 
                
                // Trava os limites do arrasto para não quebrar o layout
                if (offsetX > 0) offsetX = 0;
                if (offsetX < -menuWidth) offsetX = -menuWidth;

                header.style.transform = `translateX(${offsetX}px)`;
            }
        }, { passive: false }); // ATENÇÃO: passive false aqui é obrigatório para o preventDefault funcionar

        header.addEventListener('touchend', (e) => {
            if (!isDragging && !isHorizontalSwipe) return;
            isDragging = false;

            header.style.transition = "transform 0.4s cubic-bezier(0.19, 1, 0.22, 1)";

            let finalOffsetX = currentX - startX;

            // Se arrastou mais de 70px para a esquerda, fecha tudo
            if (isHorizontalSwipe && finalOffsetX < -70) {
                header.classList.remove('active');
                menuToggle.classList.remove('active');
                header.style.transform = '';
            } else {
                // Se soltou antes, gruda de volta na tela
                header.style.transform = 'translateX(0px)';
            }
        });

    } else {
        console.error("Erro: .menu-toggle ou header não foram encontrados no HTML.");
    }
});