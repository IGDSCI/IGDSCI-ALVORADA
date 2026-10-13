const WHATSAPP = '5547999990000';

const linkWhatsApp = (texto) =>
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;

const abrirWhatsApp = (linhas) =>
    window.open(linkWhatsApp(linhas.join('\n')), '_blank', 'noopener');

document.querySelectorAll('[data-wa]').forEach((elemento) => {
    elemento.href = linkWhatsApp(elemento.dataset.wa);
    elemento.target = '_blank';
    elemento.rel = 'noopener';
});

const numeroSemPais = WHATSAPP.replace(/^55/, '');
const numeroFormatado = `(${numeroSemPais.slice(0, 2)}) ${numeroSemPais.slice(2, -4)}-${numeroSemPais.slice(-4)}`;
document.querySelectorAll('.js-numero-whatsapp').forEach((elemento) => {
    elemento.textContent = numeroFormatado;
});

const menu = document.getElementById('menu');
const botaoMenu = document.getElementById('botao-menu');

const fecharMenu = () => {
    menu.classList.remove('aberto');
    botaoMenu.setAttribute('aria-expanded', 'false');
};

botaoMenu.addEventListener('click', () => {
    const aberto = menu.classList.toggle('aberto');
    botaoMenu.setAttribute('aria-expanded', String(aberto));
});
menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', fecharMenu));
document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') fecharMenu();
});

const whatsappFlutuante = document.querySelector('.whatsapp-flutuante');
const secaoContato = document.getElementById('contato');
const rodape = document.querySelector('.rodape');

const areaDeRolagem = document.getElementById('rolagem');

const aoRolar = () => {
    const rolado = areaDeRolagem.scrollTop;
    const passouDaCapa = rolado > window.innerHeight * 0.7;
    const chegouNoContato = secaoContato && secaoContato.getBoundingClientRect().top < window.innerHeight * 0.7;
    const chegouNoRodape = rodape.getBoundingClientRect().top < window.innerHeight;
    whatsappFlutuante.classList.toggle('visivel', passouDaCapa && !chegouNoContato && !chegouNoRodape);
};
areaDeRolagem.addEventListener('scroll', aoRolar, { passive: true });
aoRolar();

const fotoAmpliada = (() => {
    const janela = document.getElementById('foto-ampliada');
    if (!janela) return null;
    const imagem = janela.querySelector('figure img');
    const legenda = janela.querySelector('figcaption');
    const botaoFechar = janela.querySelector('.ampliada__fechar');
    let fotos = [];
    let atual = 0;
    let quemAbriu = null;

    const mostrar = (indice) => {
        atual = (indice + fotos.length) % fotos.length;
        imagem.src = fotos[atual].src;
        imagem.alt = fotos[atual].alt;
        legenda.textContent = fotos.length > 1 ? `${fotos[atual].alt} (${atual + 1}/${fotos.length})` : fotos[atual].alt;
    };

    const fechar = () => {
        janela.hidden = true;
        document.body.style.overflow = '';
        if (quemAbriu) quemAbriu.focus();
    };

    const setaAnterior = janela.querySelector('.ampliada__seta--anterior');
    const setaProxima = janela.querySelector('.ampliada__seta--proxima');

    botaoFechar.addEventListener('click', fechar);
    setaAnterior.addEventListener('click', () => mostrar(atual - 1));
    setaProxima.addEventListener('click', () => mostrar(atual + 1));
    janela.addEventListener('click', (evento) => {
        if (evento.target === janela) fechar();
    });

    let inicioDoToque = null;
    janela.addEventListener('touchstart', (evento) => {
        inicioDoToque = evento.touches[0].clientX;
    }, { passive: true });
    janela.addEventListener('touchend', (evento) => {
        if (inicioDoToque === null) return;
        const distancia = evento.changedTouches[0].clientX - inicioDoToque;
        if (Math.abs(distancia) > 40 && fotos.length > 1) mostrar(atual + (distancia < 0 ? 1 : -1));
        inicioDoToque = null;
    });

    document.addEventListener('keydown', (evento) => {
        if (janela.hidden) return;
        if (evento.key === 'Escape') fechar();
        if (evento.key === 'ArrowLeft') mostrar(atual - 1);
        if (evento.key === 'ArrowRight') mostrar(atual + 1);
        if (evento.key === 'Tab') {
            const botoes = [...janela.querySelectorAll('button:not([hidden])')];
            const posicao = botoes.indexOf(document.activeElement);
            const proximo = evento.shiftKey
                ? (posicao <= 0 ? botoes.length - 1 : posicao - 1)
                : (posicao + 1) % botoes.length;
            botoes[proximo].focus();
            evento.preventDefault();
        }
    });

    return {
        abrir(lista, indice = 0) {
            fotos = lista;
            setaAnterior.hidden = lista.length < 2;
            setaProxima.hidden = lista.length < 2;
            quemAbriu = document.activeElement;
            mostrar(indice);
            janela.hidden = false;
            document.body.style.overflow = 'hidden';
            botaoFechar.focus();
        },
    };
})();

const hoje = new Date();
hoje.setMinutes(hoje.getMinutes() - hoje.getTimezoneOffset());
const dataDeHoje = hoje.toISOString().slice(0, 10);

const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

const seta = (nome) =>
    `<img src="img/icones/${nome}.svg" alt="">`;

const montarData = (ano, mes, dia) =>
    `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;

const paraFormatoBrasileiro = (data) => data.split('-').reverse().join('/');

const criarCalendario = (campo) => {
    const valor = document.createElement('input');
    valor.type = 'hidden';
    valor.name = campo.name;
    valor.min = dataDeHoje;
    campo.removeAttribute('name');
    campo.id = `data-${valor.name}`;
    campo.type = 'text';
    campo.readOnly = true;
    campo.placeholder = 'Selecionar data';
    campo.classList.add('campo-data');
    campo.setAttribute('aria-haspopup', 'dialog');
    campo.after(valor);

    const calendario = document.createElement('div');
    calendario.className = 'calendario';
    calendario.hidden = true;
    calendario.setAttribute('role', 'dialog');
    calendario.setAttribute('aria-label', 'Escolher data');
    campo.parentElement.append(calendario);

    let mesVisivel = new Date();

    const desenhar = () => {
        const ano = mesVisivel.getFullYear();
        const mes = mesVisivel.getMonth();
        const primeiroDiaDaSemana = new Date(ano, mes, 1).getDay();
        const diasNoMes = new Date(ano, mes + 1, 0).getDate();
        const mesMinimo = valor.min.slice(0, 7);
        const nomeDoMes = MESES[mes][0].toUpperCase() + MESES[mes].slice(1);

        let dias = '';
        for (let i = 0; i < primeiroDiaDaSemana; i += 1) dias += '<span></span>';
        for (let dia = 1; dia <= diasNoMes; dia += 1) {
            const data = montarData(ano, mes, dia);
            const classes = [data === valor.value && 'selecionado', data === dataDeHoje && 'hoje'].filter(Boolean).join(' ');
            const bloqueado = data < valor.min ? ' disabled' : '';
            dias += `<button type="button" data-data="${data}" class="${classes}"${bloqueado}>${dia}</button>`;
        }

        const voltarBloqueado = montarData(ano, mes, 1).slice(0, 7) <= mesMinimo ? ' disabled' : '';
        calendario.innerHTML = `
            <div class="calendario__topo">
                <button type="button" class="calendario__seta" data-mudar-mes="-1" aria-label="Mês anterior"${voltarBloqueado}>${seta('mes_anterior')}</button>
                <p class="calendario__titulo">${nomeDoMes} de ${ano}</p>
                <button type="button" class="calendario__seta" data-mudar-mes="1" aria-label="Próximo mês">${seta('mes_proximo')}</button>
            </div>
            <div class="calendario__semana"><span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span></div>
            <div class="calendario__dias">${dias}</div>
            <div class="calendario__rodape">
                <button type="button" class="calendario__link" data-limpar>Limpar</button>
                <button type="button" class="calendario__link" data-fechar>Fechar</button>
            </div>`;
    };

    const abrir = () => {
        const base = valor.value || valor.min;
        mesVisivel = new Date(Number(base.slice(0, 4)), Number(base.slice(5, 7)) - 1, 1);
        desenhar();
        calendario.hidden = false;
        const naoCabeADireita = campo.getBoundingClientRect().left + 300 > window.innerWidth - 12;
        calendario.classList.toggle('calendario--direita', naoCabeADireita);
        const diaParaFocar = calendario.querySelector('.selecionado') || calendario.querySelector('.calendario__dias button:not([disabled])');
        if (diaParaFocar) diaParaFocar.focus({ preventScroll: true });
    };

    const fechar = (voltarAoCampo) => {
        if (calendario.hidden) return;
        calendario.hidden = true;
        if (voltarAoCampo) campo.focus({ preventScroll: true });
    };

    const escolher = (data) => {
        valor.value = data;
        campo.value = data ? paraFormatoBrasileiro(data) : '';
        valor.dispatchEvent(new Event('change'));
    };

    campo.addEventListener('click', () => (calendario.hidden ? abrir() : fechar()));
    campo.addEventListener('keydown', (evento) => {
        if (['Enter', ' ', 'ArrowDown'].includes(evento.key)) {
            evento.preventDefault();
            abrir();
        }
    });

    calendario.addEventListener('click', (evento) => {
        evento.preventDefault();
        evento.stopPropagation();
        const botao = evento.target.closest('button');
        if (!botao || botao.disabled) return;
        if (botao.dataset.mudarMes) {
            mesVisivel.setMonth(mesVisivel.getMonth() + Number(botao.dataset.mudarMes));
            desenhar();
        } else if ('limpar' in botao.dataset) {
            escolher('');
            fechar(true);
        } else if ('fechar' in botao.dataset) {
            fechar(true);
        } else if (botao.dataset.data) {
            escolher(botao.dataset.data);
            fechar(true);
        }
    });

    calendario.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape') {
            evento.stopPropagation();
            fechar(true);
        }
    });

    document.addEventListener('click', (evento) => {
        if (!campo.parentElement.contains(evento.target)) fechar();
    });

    valor.focus = () => campo.focus();
    valor.calendario = { abrir, limpar: () => escolher('') };
};

document.querySelectorAll('input[type="date"]').forEach(criarCalendario);

const ligarDatas = (chegada, saida) => {
    chegada.addEventListener('change', () => {
        saida.min = chegada.value || dataDeHoje;
        if (saida.value && saida.value <= chegada.value) saida.calendario.limpar();
        if (chegada.value && !saida.value) setTimeout(() => saida.calendario.abrir(), 0);
    });
};

const plural = (quantidade, singular, varios) =>
    `${quantidade} ${Number(quantidade) === 1 ? singular : varios}`;

const linhaDasDatas = (chegada, saida) => {
    if (chegada && saida) {
        const noites = Math.round((new Date(saida) - new Date(chegada)) / 86400000);
        return `• Datas: ${paraFormatoBrasileiro(chegada)} a ${paraFormatoBrasileiro(saida)} (${plural(noites, 'noite', 'noites')})`;
    }
    if (chegada) return `• Chegada: ${paraFormatoBrasileiro(chegada)} (saída a definir)`;
    return '• Datas: ainda a definir';
};

document.getElementById('ano').textContent = new Date().getFullYear();

const ELEMENTOS_ANIMADOS = [
    '.cabecalho-secao',
    '.boas-vindas__foto',
    '.boas-vindas__texto',
    '.beneficios li',
    '.quarto',
    '.cafe-manha__texto',
    '.cafe-manha__foto',
    '.faixa-fotos',
    '.passeio',
    '.lista-passeios__link',
    '.avaliacao',
    '.local',
    '.regras',
    '.contato__texto',
    '.formulario',
    '.caminho',
    '.cabecalho-quarto',
    '.fotos-quarto',
    '.item-resumo',
    '.descricao-quarto',
    '#itens-quarto section',
    '.aviso-regras',
    '.reserva',
    '.cartao-quarto',
    '.rodape__grade',
];

const iniciarAnimacoes = () => {
    const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (semMovimento || !('IntersectionObserver' in window)) return;

    document.documentElement.classList.add('com-animacao');

    const observar = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (!entrada.isIntersecting) return;
            entrada.target.classList.add('apareceu');
            observar.unobserve(entrada.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    document.querySelectorAll(ELEMENTOS_ANIMADOS.join(',')).forEach((elemento) => {
        const irmaos = [...elemento.parentElement.children].filter((filho) => filho.matches(ELEMENTOS_ANIMADOS.join(',')));
        const posicao = irmaos.indexOf(elemento);
        if (irmaos.length > 1) elemento.style.transitionDelay = `${(posicao % 4) * 90}ms`;
        elemento.classList.add('surgir');
        observar.observe(elemento);
    });

    const mostrarOsQueEstaoNaTela = () => {
        document.querySelectorAll('.surgir:not(.apareceu)').forEach((elemento) => {
            const posicao = elemento.getBoundingClientRect();
            if (posicao.top < window.innerHeight * 0.94 && posicao.bottom > 0) {
                elemento.classList.add('apareceu');
                observar.unobserve(elemento);
            }
        });
    };

    mostrarOsQueEstaoNaTela();
    areaDeRolagem.addEventListener('scroll', mostrarOsQueEstaoNaTela, { passive: true });
    window.addEventListener('resize', mostrarOsQueEstaoNaTela);
    document.addEventListener('visibilitychange', mostrarOsQueEstaoNaTela);
};

document.addEventListener('DOMContentLoaded', iniciarAnimacoes);
