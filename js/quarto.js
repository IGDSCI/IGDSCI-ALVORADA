const chaveDoQuarto = new URLSearchParams(location.search).get('q');
const quarto = QUARTOS[chaveDoQuarto];

const criar = (tag, classe, texto) => {
    const elemento = document.createElement(tag);
    if (classe) elemento.className = classe;
    if (texto) elemento.textContent = texto;
    return elemento;
};

const ICONES_DA_FICHA = {
    Tamanho: 'tamanho',
    Hóspedes: 'pessoas',
    Camas: 'cama',
    Vista: 'folha',
};

const montarPaginaDoQuarto = () => {
    document.title = `${quarto.nome} | Pousada Alvorada, Penha – SC`;
    const ficha = quarto.ficha.map(([item, valor]) => `${item.toLowerCase()} ${valor}`).join(', ');
    const descricao = `${quarto.nome} da Pousada Alvorada: ${ficha}. ${quarto.resumo}`;
    const endereco = `https://pousadaalvorada.com.br/quarto.html?q=${chaveDoQuarto}`;
    document.querySelector('meta[name="description"]').content = descricao;
    document.querySelector('link[rel="canonical"]').href = endereco;
    document.querySelector('meta[property="og:url"]').content = endereco;
    document.querySelector('meta[property="og:title"]').content = document.title;
    document.querySelector('meta[property="og:description"]').content = descricao;

    document.querySelectorAll('.js-nome').forEach((elemento) => { elemento.textContent = quarto.nome; });
    document.querySelector('.js-etiqueta').textContent = quarto.etiqueta;
    document.getElementById('descricao-quarto').textContent = quarto.descricao;

    const fotosGrandes = quarto.fotos;
    const areaDeFotos = document.getElementById('fotos-quarto');
    quarto.fotos.slice(0, 3).forEach((foto, indice) => {
        const botao = criar('button', 'fotos-quarto__item');
        botao.type = 'button';
        botao.setAttribute('aria-label', `Ampliar foto: ${foto.alt}`);
        const imagem = criar('img');
        imagem.src = foto.src;
        imagem.alt = foto.alt;
        imagem.width = 1200;
        imagem.height = 800;
        if (indice === 0) imagem.fetchPriority = 'high';
        botao.append(imagem);
        botao.addEventListener('click', () => fotoAmpliada.abrir(fotosGrandes, indice));
        areaDeFotos.append(botao);
    });
    const verTodas = criar('button', 'fotos-quarto__todas', `Ver as ${fotosGrandes.length} fotos`);
    verTodas.type = 'button';
    verTodas.addEventListener('click', () => fotoAmpliada.abrir(fotosGrandes, 0));
    areaDeFotos.append(verTodas);

    document.getElementById('resumo-quarto').append(...quarto.ficha.map(([item, valor]) => {
        const caixa = criar('div', 'item-resumo');
        const icone = criar('span', 'item-resumo__icone');
        icone.innerHTML = `<img src="img/icones/${ICONES_DA_FICHA[item] || 'folha'}.svg" alt="">`;
        const textos = criar('div');
        textos.append(criar('dt', '', item), criar('dd', '', valor));
        caixa.append(icone, textos);
        return caixa;
    }));

    document.getElementById('itens-quarto').append(...quarto.grupos.map(([titulo, itens]) => {
        const grupo = criar('section');
        const lista = criar('ul', 'lista-check');
        lista.append(...itens.map((item) => criar('li', '', item)));
        grupo.append(criar('h2', '', titulo), lista);
        return grupo;
    }));

    const campoHospedes = document.getElementById('hospedes-quarto');
    for (let pessoas = 1; pessoas <= quarto.maxHospedes; pessoas += 1) {
        const opcao = criar('option', '', plural(pessoas, 'pessoa', 'pessoas'));
        if (pessoas === Math.min(2, quarto.maxHospedes)) opcao.selected = true;
        campoHospedes.append(opcao);
    }

    const formulario = document.getElementById('formulario-quarto');
    const erro = document.getElementById('erro-quarto');
    ligarDatas(formulario.elements.chegada, formulario.elements.saida);

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();
        erro.hidden = true;
        const dados = Object.fromEntries(new FormData(formulario));
        if (dados.chegada && dados.saida && dados.saida <= dados.chegada) {
            erro.textContent = 'A data de saída precisa ser depois da chegada.';
            erro.hidden = false;
            formulario.elements.saida.focus();
            return;
        }
        abrirWhatsApp([
            `Olá! Vi no site ${quarto.artigo} ${quarto.nome} e gostaria de verificar a disponibilidade.`,
            '',
            linhaDasDatas(dados.chegada, dados.saida),
            `• Hóspedes: ${dados.hospedes}`,
            '',
            'Podem me informar o valor?',
        ]);
    });

    document.querySelector('.whatsapp-flutuante').href =
        linkWhatsApp(`Olá! Tenho uma dúvida sobre ${quarto.artigo} ${quarto.nome}.`);

    const outrosQuartos = Object.entries(QUARTOS).filter(([chave]) => chave !== chaveDoQuarto);
    document.getElementById('lista-outros-quartos').append(...outrosQuartos.map(([chave, outro]) => {
        const cartao = criar('article', 'cartao-quarto');
        const imagem = criar('img');
        imagem.src = outro.fotos[0].src;
        imagem.alt = outro.fotos[0].alt;
        imagem.loading = 'lazy';
        imagem.width = 1200;
        imagem.height = 800;
        const corpo = criar('div', 'cartao-quarto__corpo');
        const titulo = criar('h3');
        const link = criar('a', '', outro.nome);
        link.href = `quarto.html?q=${chave}`;
        titulo.append(link);
        const pessoas = outro.ficha.find(([item]) => item === 'Hóspedes')[1];
        corpo.append(titulo, criar('p', 'cartao-quarto__resumo', outro.resumo), criar('p', 'cartao-quarto__pessoas', pessoas));
        cartao.append(imagem, corpo);
        return cartao;
    }));
};

if (quarto) {
    montarPaginaDoQuarto();
} else {
    location.replace('index.html#quartos');
}
