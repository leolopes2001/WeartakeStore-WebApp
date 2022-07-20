let cart = [];






const getElement = (...queries) => document.querySelector(...queries);
const createElement = (...queries) => document.createElement(...queries);
const getAllElements = (...queries) => document.querySelectorAll(...queries);
const listOfProducts = getElement(".products__list");

const getDataBase = () => {
  return JSON.parse(localStorage.getItem("database")) ?? data;
};
const postDataBase = (database) => {
  localStorage.setItem("database", JSON.stringify(database));
};


const createRemoveBtn = () => {
  const btn = createElement("button");
  btn.classList.add("cart__btn");
  btn.textContent = "Remover produto";
  btn.addEventListener("click", (e) => {
    const id = Number(e.composedPath()[3].id);
    let newCart = [];
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id !== id) {
        newCart.push(cart[i]);
      }
    }

    cart = [...newCart];
    updateCart();
  });
  return btn;
};
const createAddCartBtn = () => {
  const button = createElement("button");

  button.classList.add("products__btn");
  button.insertAdjacentHTML(
    "afterbegin",
    `
        Adicionar ao carrinho<span class="btnhover"></span>
    `
  );

  button.addEventListener("click", addCart);
  return button;
};

const formatNum = (num) => {
  const newN = num.toFixed(2);
  return newN.replace(".", ",");
};

const getQuantityAndTotal = () => {
  let total = 0;
  let quantity = 0;
  cart.forEach((product) => {
    quantity += product.quantity;
    total += product.value * product.quantity;
  });

  const totalFormat = formatNum(total);
  return { quantity, totalFormat };
};
const createLi = () => {
  const li = createElement("li");
  li.classList.add("empty");
  li.insertAdjacentHTML(
    "afterbegin",
    `
            <h4>Carrinho vázio</h4>
            <p>Adicione itens
    </p>
    `
  );
  return li;
};

const updateAbout = () => {
  const cartAbout = getElement(".cart__about");
  if (cart.length > 0) {
    cartAbout.classList.remove("hidden");
  } else {
    const cart__list = getElement(".cart__list");
    cart__list.appendChild(createLi());
    cartAbout.classList.add("hidden");
    return;
  }
  const { quantity, totalFormat } = getQuantityAndTotal();

  const cart__quantity = getElement(".cart__quantity");
  const cart__total = getElement(".cart__total");
  cart__quantity.children[1].innerHTML = "";
  cart__total.children[1].innerHTML = "";
  cart__quantity.children[1].insertAdjacentHTML("afterbegin", quantity);
  cart__total.children[1].insertAdjacentHTML("afterbegin", `R$ ${totalFormat}`);
};

const getObj = (id) => {
  for (let i = 0; i < cart.length; i++) {
    if (id === cart[i].id) return i;
  }
};
const createSelect = (quantity) => {
  const select = createElement("select");
  for (let i = 1; i <= 5; i++) {
    const option = createElement("option");
    option.textContent = i;
    if (quantity === i) option.setAttribute("selected", "selected");

    select.appendChild(option);
  }
  select.addEventListener("change", (e) => {
    const value = Number(e.target.value);
    const id = Number(e.composedPath()[3].id);
    const objId = getObj(id);
    cart[objId].quantity = value;
    updateAbout();
  });

  return select;
};

const updateCart = () => {
  const list = getElement(".cart__list");
  list.innerHTML = "";
  for (let i = 0; i < cart.length; i++) {
    const li = createElement("li");
    li.classList.add("cart__item");
    li.id = cart[i].id;
    li.insertAdjacentHTML(
      "beforeend",
      `
            <div>
                <img 
                    src=${cart[i].img} 
                    alt=${cart[i].description}
                    class="cart__img" />
            </div>
            <div>
                <h1 class="cart__name">${cart[i].nameItem}</h1>
                <p class="cart__price">R$ ${cart[i].value}</p>
            </div>
        `
    );
    const div = li.children[1];
    const newDiv = createElement("div");
    newDiv.classList.add("extraDiv");
    const buttonRemove = createRemoveBtn();
    const addSelect = createSelect(cart[i].quantity);
    newDiv.append(addSelect, buttonRemove);
    div.appendChild(newDiv);

    list.appendChild(li);
  }

  updateAbout();
};

const getProduct = (id) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) return data[i];
  }
};

const checkExistence = (id) => {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id) return true;
  }
};
const addCart = (e) => {
  const id = Number(e.composedPath()[2].id);

  if (checkExistence(id)) {
    alert("Esse produto já existe no carrinho!");
    return;
  }

  const obj = getProduct(id);

  cart.push({
    id: obj.id,
    img: obj.img,
    nameItem: obj.nameItem,
    value: obj.value,
    description: obj.description,
    quantity: 1,
  });

  updateCart(cart);
};

const show_all_products = (arr, showcase) => {
  showcase.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    const li = createElement("li");
    const button = createAddCartBtn();
    li.classList.add("products__item");
    li.id = arr[i].id;
    li.insertAdjacentHTML(
      "afterbegin",
      `
        <img src=${arr[i].img} 
            alt=${arr[i].nameItem} 
            class="products__img" />
        <div>
          <span class="products__category">${arr[i].tag[0]}</span>
          <h1 class="products__title">${arr[i].nameItem}</h1>
          <p class="products__about">
            ${arr[i].description}
          </p>
          <p class="products__price">R$ ${arr[i].value}</p>
          </div>
        `
    );

    li.children[1].appendChild(button);

    showcase.appendChild(li);
  }
};

const getByType = (data, type) => {
  let arr = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].tag[0] === type) arr.push(data[i]);
  }
  return arr;
};
const inputText = getElement(".options__inputtext");
const buttonsearch = getElement(".options__search");

buttonsearch.addEventListener("click", (e) => {
  e.preventDefault();
  const text = inputText.value.toLowerCase().trim();

  let arrFilter = data.filter((product) => {
    const name = product.nameItem.toLowerCase().trim();
    if (name.includes(text)) return true;
  });

  show_all_products(arrFilter, listOfProducts);
});

const allLiTypes = getAllElements(".type");
const clearClicked = () => {
  allLiTypes.forEach((el) => el.classList.remove("clicked"));
};

for (let i = 0; i < allLiTypes.length; i++) {
  allLiTypes[i].addEventListener("click", (e) => {
    clearClicked();
    e.target.classList.add("clicked");
    const type = e.target.textContent;
    if (type === "Todos") {
      show_all_products(data, listOfProducts);
      return;
    }
    let arr = getByType(data, type);
    show_all_products(arr, listOfProducts);
  });
}

const button = getElement("#manage__data");
const containerModal = getElement(".modal_container");
const modal = getElement(".modal");

const classShowModal = "show_modal_container";
const openModal = () => containerModal.classList.add(classShowModal);
const closeModal = () => containerModal.classList.remove(classShowModal);

button.addEventListener("click", openModal);

containerModal.addEventListener("click", (e) => {
  if (e.target.classList.contains("show_modal_container")) closeModal();
});
const exitBTN = getElement(".exitBTN");
const addBTN = getElement(".addBTN");
exitBTN.addEventListener("click", (e) => {
  e.preventDefault();
  clearFields();
  closeModal();
});
const clearFields = () => {
  getElement("#nameItem").value = "";
  getElement("#description").value = "";
  getElement("#img").value = "";
  getElement("#value").value = "";
  getElement("#tag").value = "Acessórios";
};
const isValid = () => {
  return getElement(".modal_form").reportValidity();
};

addBTN.addEventListener("click", () => {
  if (isValid()) {
    data.push({
      nameItem: getElement("#nameItem").value,
      description: getElement("#description").value,
      img: getElement("#img").value,
      value: getElement("#value").value,
      tag: getElement("#tag").value,
      id: data.length + 1,
    });

    clearFields();
    closeModal();
    show_all_products(data, listOfProducts);
  }
});

const addNewProduct = () => {};

show_all_products(data, listOfProducts);
