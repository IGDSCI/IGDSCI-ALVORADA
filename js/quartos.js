const foto = (src, alt) => ({ src, alt });

const QUARTOS = {
    aurora: {
        nome: 'Quarto Aurora',
        artigo: 'o',
        etiqueta: 'Ideal para casais',
        maxHospedes: 3,
        resumo: 'Andar de cima, com varanda e rede voltadas para o jardim.',
        ficha: [['Tamanho', '26 m²'], ['Hóspedes', 'Até 3 pessoas'], ['Camas', '1 king e 1 bicama'], ['Vista', 'Jardim']],
        descricao: 'Fica no andar de cima da casa principal. A porta de vidro abre direto para a varanda, que tem rede e duas cadeiras voltadas para o jardim. De manhã o sol entra no quarto; à tarde a varanda fica na sombra e pega a brisa. É a categoria mais procurada por casais.',
        fotos: [
            foto('img/quarto_01.jpg', 'Quarto Aurora, com cama king e porta para a varanda com rede'),
            foto('img/pousada.jpg', 'Casa da pousada, com varandas e jardim'),
            foto('img/banheiro.jpg', 'Banheiro privativo'),
        ],
        grupos: [
            ['No quarto', ['Ar-condicionado split', 'Ventilador de teto', 'Varanda com rede', 'Smart TV com streaming', 'Frigobar', 'Cofre', 'Mesa e cadeira', 'Enxoval de algodão', 'Tomada ao lado da cama', 'Armário e cabideiro']],
            ['Banheiro privativo', ['Chuveiro a gás, com água quente', 'Secador de cabelo', 'Toalhas de banho e de praia', 'Sabonete e xampu', 'Papel higiênico']],
            ['Bom saber', ['Não é permitido fumar', 'Andar superior, acesso por escada', 'Bicama para a 3ª pessoa', 'Não aceita animais']],
        ],
    },
    areia: {
        nome: 'Quarto Areia',
        artigo: 'o',
        etiqueta: 'Mais reservado',
        maxHospedes: 3,
        resumo: 'Separado da casa, no jardim, com deck privativo.',
        ficha: [['Tamanho', '42 m²'], ['Hóspedes', '2 adultos e 1 criança'], ['Camas', '1 king'], ['Vista', 'Jardim']],
        descricao: 'Fica separado da casa, no fundo do jardim. Tem deck privativo com espreguiçadeiras, ducha externa para tirar o sal depois da praia e cafeteira com café da região. É o mais reservado da pousada e, na alta temporada, costuma estar ocupado com meses de antecedência.',
        fotos: [
            foto('img/quarto_05.jpg', 'Quarto Areia, com cama king e deck privativo'),
            foto('img/pousada.jpg', 'Casa da pousada, com varandas e jardim'),
            foto('img/banheiro.jpg', 'Banheiro privativo'),
        ],
        grupos: [
            ['No quarto', ['Ar-condicionado split', 'Ventilador de teto', 'Smart TV com streaming', 'Frigobar', 'Cafeteira', 'Cofre', 'Deck privativo', 'Espreguiçadeiras', 'Enxoval de algodão']],
            ['Banheiro privativo', ['Chuveiro a gás, com água quente', 'Ducha externa no deck', 'Secador de cabelo', 'Toalhas de banho e de praia', 'Sabonete e xampu']],
            ['Bom saber', ['Não é permitido fumar', 'Térreo, sem escadas', 'Colchonete para criança sob pedido', 'Não aceita animais']],
        ],
    },
    estrela: {
        nome: 'Quarto Estrela',
        artigo: 'o',
        etiqueta: 'Para pequenos grupos',
        maxHospedes: 3,
        resumo: 'Térreo, com cama de casal e de solteiro.',
        ficha: [['Tamanho', '20 m²'], ['Hóspedes', 'Até 3 pessoas'], ['Camas', '1 casal e 1 solteiro'], ['Vista', 'Jardim']],
        descricao: 'Fica no térreo, com uma cama de casal e uma de solteiro. É uma boa opção para amigos ou para pais com um filho maior. Tem mesa de apoio, armário amplo e janela para o jardim.',
        fotos: [
            foto('img/quarto_03.jpg', 'Quarto Estrela, com cama de casal e cama de solteiro'),
            foto('img/pousada.jpg', 'Casa da pousada, com varandas e jardim'),
            foto('img/banheiro.jpg', 'Banheiro privativo'),
        ],
        grupos: [
            ['No quarto', ['Ar quente e frio', 'Ventilador de teto', 'Smart TV com streaming', 'Frigobar', 'Mesa de apoio', 'Armário amplo', 'Enxoval de algodão', 'Tomada ao lado das camas']],
            ['Banheiro privativo', ['Chuveiro a gás, com água quente', 'Secador de cabelo', 'Toalhas de banho e de praia', 'Sabonete e xampu', 'Papel higiênico']],
            ['Bom saber', ['Não é permitido fumar', 'Térreo, sem escadas', 'Não aceita animais']],
        ],
    },
    jardim: {
        nome: 'Quarto Jardim',
        artigo: 'o',
        etiqueta: 'Térreo e silencioso',
        maxHospedes: 2,
        resumo: 'Térreo, silencioso, voltado para o jardim. Aceita pets.',
        ficha: [['Tamanho', '18 m²'], ['Hóspedes', 'Até 2 pessoas'], ['Camas', '1 queen'], ['Vista', 'Jardim']],
        descricao: 'Fica no térreo, com a porta voltada para o jardim de hortênsias. É o quarto mais silencioso e fresco da pousada, bom para quem gosta de dormir cedo. Como não tem escadas, é o mais indicado para quem tem dificuldade de locomoção. É também o único que aceita animais de pequeno porte.',
        fotos: [
            foto('img/quarto_02.jpg', 'Quarto Jardim, com cama de casal e janela para o jardim'),
            foto('img/pousada.jpg', 'Casa da pousada, com varandas e jardim'),
            foto('img/banheiro.jpg', 'Banheiro privativo'),
        ],
        grupos: [
            ['No quarto', ['Ar-condicionado split', 'Ventilador de teto', 'Smart TV com streaming', 'Frigobar', 'Enxoval de algodão', 'Tomada ao lado da cama', 'Cabideiro', 'Cadeiras no jardim']],
            ['Banheiro privativo', ['Chuveiro a gás, com água quente', 'Secador de cabelo', 'Toalhas de banho e de praia', 'Sabonete e xampu', 'Barras de apoio']],
            ['Bom saber', ['Não é permitido fumar', 'Térreo, sem escadas', 'Aceita pets de até 10 kg (taxa à parte)']],
        ],
    },
    mar: {
        nome: 'Quarto Mar',
        artigo: 'o',
        etiqueta: 'Para famílias',
        maxHospedes: 5,
        resumo: 'Dois ambientes integrados, para até 5 pessoas.',
        ficha: [['Tamanho', '38 m²'], ['Hóspedes', 'Até 5 pessoas'], ['Camas', '1 king e 2 de solteiro'], ['Vista', 'Jardim']],
        descricao: 'Tem dois ambientes integrados: em um, a cama king e uma pequena sala; no outro, duas camas de solteiro, ótimas para as crianças. A varanda lateral tem rede e mesinha para o café. Berço e cadeirão de alimentação são emprestados sem custo, é só pedir na reserva.',
        fotos: [
            foto('img/quarto_04.jpg', 'Quarto Mar, com dois ambientes integrados'),
            foto('img/pousada.jpg', 'Casa da pousada, com varandas e jardim'),
            foto('img/banheiro.jpg', 'Banheiro privativo'),
        ],
        grupos: [
            ['No quarto', ['Dois aparelhos de ar-condicionado', 'Ventiladores de teto', 'Smart TV com streaming', 'Frigobar', 'Sofá na sala', 'Varanda lateral', 'Cofre', 'Mesa para refeições', 'Enxoval de algodão']],
            ['Banheiro privativo', ['Chuveiro a gás, com água quente', 'Secador de cabelo', 'Toalhas de banho e de praia', 'Sabonete e xampu', 'Papel higiênico']],
            ['Bom saber', ['Não é permitido fumar', 'Térreo, sem escadas', 'Berço e cadeirão sem custo', '5ª pessoa com taxa à parte']],
        ],
    },
};
