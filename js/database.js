// Banco de dados dos produtos

const data = [
  {
    id: 0,
    img: "./img/jaqueta.svg",
    nameItem: "Lightweight Jacket",
    description:
      "Adicione um pouco de energia ao seu guarda-roupa de inverno com esta jaqueta vibrante...",
    value: 100,
    addCart: "Adicionar ao carrinho",
    tag: ["Camisetas"],
  },
  {
    id: 1,
    img: "./img/gorro.svg",
    nameItem: "Black Hat",
    description:
      "O gorro Next.js chegou! Esta beldade bordada tem um ajuste confortável que garante que...",
    value: 100,
    addCart: "Adicionar ao carrinho",
    tag: ["Acessórios"],
  },
  {
    id: 2,
    img: "./img/mascara.svg",
    nameItem: "Mask",
    description:
      "Esta máscara facial durável é feita de duas camadas de tecido tratado e possui presilhas...",
    value: 40,
    addCart: "Adicionar ao carrinho",
    tag: ["Acessórios"],
  },
  {
    id: 3,
    img: "./img/camiseta_preta.svg",
    nameItem: "T-Shirt",
    value: 200,
    description:
      "Esta t-shirt é imprescindível no seu guarda-roupa, combinando o caimento intemporal de...",
    addCart: "Adicionar ao carrinho",
    tag: ["Camisetas"],
  },
  {
    id: 4,
    img: "./img/camiseta_branca.svg",
    nameItem: "Short-Sleeve T-Shirt",
    description:
      "Agora você encontrou a camiseta básica do seu guarda-roupa. É feito de um mais grosso...",
    value: 100,
    addCart: "Adicionar ao carrinho",
    tag: ["Camisetas"],
  },
  {
    id: 5,
    img: "./img/moletom.svg",
    nameItem: "Champion Packable Jacket",
    description:
      "Proteja-se dos elementos com esta jaqueta embalável Champion. Esta jaqueta de poliést...",
    value: 100,
    addCart: "Adicionar ao carrinho",
    tag: ["Camisetas"],
  },
  {
    id: 6,
    img: "https://i.pinimg.com/originals/d3/9f/d9/d39fd9e67a0e7cebe279a0ae9e7a5a5e.jpg",
    nameItem: "Chinelo",
    description:
      "A Havaianas Top traz toda a alegria de Havaianas em várias opções de cores, desde....",
    value: 40.00,
    tag: ["Calçados"],
  },
  {
    id: 7,
    img: "https://images.unsplash.com/photo-1485736231968-0c8ad5c9e174?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHNob2VzJTIwbGlzbyUyMGJyYW5jb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    nameItem: "TÊNIS OLD SKOOL",
    description:
      "Em 1977, o tênis Old Skool, originalmente nomeado de Vans #36 foi lançado sendo o primeiro a conter...",
    value: 150.0,
    tag: ["Calçados"],
  },

  {
    id:8,
    img:"https://images.tcdn.com.br/img/img_prod/722337/bota_coturno_tratorada_feminina_usaflex_em_couro_cano_medio_preto_ad1223_5335549_1_e58b9646478a7f413df52ae47b9afc88.jpg",
    nameItem:"Bota Coturno",
    value:80.50,
    description:"Com shape clássico, a Bota Coturn aposta em um visual liso e versátil.",
    tag:["Calçados"],
  }
];
