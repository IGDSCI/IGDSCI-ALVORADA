const linksDoMenu = [...menu.querySelectorAll('a:not(.menu__reservar)')];

const observarSecoes = new IntersectionObserver((secoes) => {
    secoes.forEach((secao) => {
        if (!secao.isIntersecting) return;
        linksDoMenu.forEach((link) =>
            link.classList.toggle('ativo', link.getAttribute('href') === `#${secao.target.id}`)
        );
    });
}, { rootMargin: '-45% 0px -50% 0px' });

linksDoMenu
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean)
    .forEach((secao) => observarSecoes.observe(secao));

const faixaDeFotos = document.getElementById('faixa-fotos');
const imagensDaFaixa = [...faixaDeFotos.querySelectorAll('img')];
const fotosDaFaixa = imagensDaFaixa.map((imagem) => ({ src: imagem.src, alt: imagem.alt }));
let estaArrastando = false;

imagensDaFaixa.forEach((imagem, indice) =>
    imagem.parentElement.addEventListener('click', (evento) => {
        if (estaArrastando) {
            evento.preventDefault();
            return;
        }
        fotoAmpliada.abrir(fotosDaFaixa, indice);
    })
);

faixaDeFotos.addEventListener('pointerdown', (evento) => {
    if (evento.pointerType !== 'mouse') return;
    const posicaoInicial = evento.clientX;
    const rolagemInicial = faixaDeFotos.scrollLeft;
    estaArrastando = false;
    faixaDeFotos.classList.add('arrastando');

    const mover = (movimento) => {
        const distancia = movimento.clientX - posicaoInicial;
        if (Math.abs(distancia) > 5) estaArrastando = true;
        faixaDeFotos.scrollLeft = rolagemInicial - distancia;
    };

    const soltar = () => {
        faixaDeFotos.classList.remove('arrastando');
        window.removeEventListener('pointermove', mover);
        window.removeEventListener('pointerup', soltar);
        setTimeout(() => { estaArrastando = false; }, 0);
    };

    window.addEventListener('pointermove', mover);
    window.addEventListener('pointerup', soltar);
});
faixaDeFotos.addEventListener('dragstart', (evento) => evento.preventDefault());

const formularioContato = document.getElementById('formulario-contato');
const erroContato = document.getElementById('erro-contato');
ligarDatas(formularioContato.elements.chegada, formularioContato.elements.saida);

formularioContato.addEventListener('submit', (evento) => {
    evento.preventDefault();
    erroContato.hidden = true;
    const dados = Object.fromEntries(new FormData(formularioContato));

    if (dados.chegada && dados.saida && dados.saida <= dados.chegada) {
        erroContato.textContent = 'A data de saída precisa ser depois da chegada.';
        erroContato.hidden = false;
        formularioContato.elements.saida.focus();
        return;
    }

    let hospedes = plural(dados.adultos, 'adulto', 'adultos');
    if (dados.criancas !== '0') hospedes += ` e ${plural(dados.criancas, 'criança', 'crianças')}`;

    const nome = dados.nome.trim();
    const mensagem = dados.obs.trim();
    const linhas = [
        nome ? `Olá! Meu nome é ${nome}.` : 'Olá!',
        'Vim pelo site e gostaria de fazer uma reserva na Pousada Alvorada.',
        '',
        linhaDasDatas(dados.chegada, dados.saida),
        `• Hóspedes: ${hospedes}`,
        `• Quarto: ${dados.quarto || 'sem preferência'}`,
    ];
    if (mensagem) linhas.push(`• Mensagem: ${mensagem}`);
    linhas.push('', 'Podem me informar a disponibilidade e o valor?');

    abrirWhatsApp(linhas);
});

const gruposParaAmpliar = {};
document.querySelectorAll('[data-ampliar]').forEach((imagem) => {
    const grupo = imagem.dataset.ampliar;
    gruposParaAmpliar[grupo] = gruposParaAmpliar[grupo] || [];
    gruposParaAmpliar[grupo].push(imagem);
});

Object.values(gruposParaAmpliar).forEach((imagens) => {
    const fotos = imagens.map((imagem) => ({ src: imagem.src, alt: imagem.alt }));
    imagens.forEach((imagem, indice) => {
        imagem.tabIndex = 0;
        imagem.setAttribute('role', 'button');
        imagem.setAttribute('aria-label', `Ampliar foto: ${imagem.alt}`);
        imagem.addEventListener('click', () => fotoAmpliada.abrir(fotos, indice));
        imagem.addEventListener('keydown', (evento) => {
            if (evento.key === 'Enter' || evento.key === ' ') {
                evento.preventDefault();
                fotoAmpliada.abrir(fotos, indice);
            }
        });
    });
});
