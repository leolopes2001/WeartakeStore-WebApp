const getElement = (...queries) => document.querySelector(...queries);
const createElement = (...queries) => document.createElement(...queries);
const getAllElements = (...queries) => document.querySelectorAll(...queries);

let cart = [];

const inputText = getElement(".options__inputtext");
const buttonsearch = getElement(".options__search");
const allLiTypes = getAllElements(".type");
const exitBTN = getElement(".exitBTN");
const addBTN = getElement(".addBTN");
const listOfProducts = getElement(".products__list");
const button = getElement("#manage__data");
const containerModal = getElement(".modal_container");
const modal = getElement(".modal");
const classShowModal = "show_modal_container";

const getDataBase = (database) => {
  if (database === "database")
    return JSON.parse(localStorage.getItem(database)) ?? data;
  if (database === "databasecart")
    return JSON.parse(localStorage.getItem(database)) ?? cart;
};

const postDataBase = (nameDB, database) => {
  localStorage.setItem(nameDB, JSON.stringify(database));
};

const createRemoveBtn = () => {
  const btn = createElement("button");
  btn.classList.add("cart__btn");
  btn.textContent = "Remover produto";
  btn.addEventListener("click", (e) => {
    const id = Number(e.composedPath()[3].id);
    let newCart = [];
    for (let i = 0; i < getDataBase("databasecart").length; i++) {
      if (getDataBase("databasecart")[i].id !== id) {
        newCart.push(getDataBase("databasecart")[i]);
      }
    }

    postDataBase("databasecart", newCart);

    updateCart(getDataBase("databasecart"));
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
  const newN = Number(num).toFixed(2);
  return newN.replace(".", ",");
};

const getQuantityAndTotal = () => {
  let total = 0;
  let quantity = 0;
  getDataBase("databasecart").forEach((product) => {
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

const updateAbout = (cart) => {
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

    const newCartUpdate = [];
    for (let i = 0; i < getDataBase("databasecart").length; i++) {
      if (getDataBase("databasecart")[i].id === id) {
        newCartUpdate.push({
          ...getDataBase("databasecart")[i],
          ["quantity"]: value,
        });
      } else {
        newCartUpdate.push(getDataBase("databasecart")[i]);
      }
    }

    postDataBase("databasecart", newCartUpdate);
    updateAbout(getDataBase("databasecart"));
  });

  return select;
};

const updateCart = (cart) => {
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
                    alt=${cart[i].nameItem}
                    class="cart__img" />
            </div>
            <div>
                <h1 class="cart__name">${cart[i].nameItem}</h1>
                <p class="cart__price">R$ ${formatNum(cart[i].value)}</p>
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

  updateAbout(getDataBase("databasecart"));
};

const getProduct = (id) => {
  for (let i = 0; i < getDataBase("database").length; i++) {
    if (getDataBase("database")[i].id === id) return getDataBase("database")[i];
  }
};

const checkExistence = (id) => {
  for (let i = 0; i < getDataBase("databasecart").length; i++) {
    if (getDataBase("databasecart")[i].id === id) return true;
  }
};
const addCart = (e) => {
  const id = Number(e.composedPath()[2].id);

  if (checkExistence(id)) {
    alert("Esse produto já existe no carrinho!");
    return;
  }

  const { id: objId, img, nameItem, value } = getProduct(id);

  const newCartArray = getDataBase("databasecart");

  newCartArray.push({
    id: objId,
    img,
    nameItem,
    value,
    quantity: 1,
  });

  postDataBase("databasecart", newCartArray);
  updateCart(getDataBase("databasecart"));
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
          <p class="products__price">R$ ${formatNum(arr[i].value)}</p>
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

const clearClicked = () => {
  allLiTypes.forEach((el) => el.classList.remove("clicked"));
};
const clearFields = () => {
  getElement("#nameItem").value = "";
  getElement("#description").value = "";
  getElement("#img").value = "";
  getElement("#value").value = "";
  getElement("#tag").value = "Acessórios";
};

const isValid = () => getElement(".modal_form").reportValidity();

const openModal = () => containerModal.classList.add(classShowModal);
const closeModal = () => containerModal.classList.remove(classShowModal);

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

button.addEventListener("click", openModal);

exitBTN.addEventListener("click", (e) => {
  e.preventDefault();
  clearFields();
  closeModal();
});

buttonsearch.addEventListener("click", (e) => {
  e.preventDefault();
  const text = inputText.value.toLowerCase().trim();

  let arrFilter = data.filter((product) => {
    const name = product.nameItem.toLowerCase().trim();
    if (name.includes(text)) return true;
  });

  show_all_products(arrFilter, listOfProducts);
});

containerModal.addEventListener("click", (e) => {
  if (e.target.classList.contains("show_modal_container")) closeModal();
});

addBTN.addEventListener("click", () => {
  if (isValid()) {
    data.push({
      nameItem: getElement("#nameItem").value,
      description: getElement("#description").value,
      img: getElement("#img").value,
      value: getElement("#value").value,
      tag: [getElement("#tag").value],
      id: data.length + 1,
    });

    postDataBase("database", data);

    console.log(getDataBase("database"));
    clearFields();
    closeModal();
    show_all_products(getDataBase("database"), listOfProducts);
  }
});

updateCart(getDataBase("databasecart"));
show_all_products(getDataBase("database"), listOfProducts);
