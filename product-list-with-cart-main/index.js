const products = [
  {
    "image": {
      "thumbnail": "./assets/images/image-waffle-thumbnail.jpg",
      "mobile": "./assets/images/image-waffle-mobile.jpg",
      "tablet": "./assets/images/image-waffle-tablet.jpg",
      "desktop": "./assets/images/image-waffle-desktop.jpg"
    },
    "name": "Waffle with Berries",
    "category": "Waffle",
    "price": 6.50
  },
  {
    "image": {
      "thumbnail": "./assets/images/image-creme-brulee-thumbnail.jpg",
      "mobile": "./assets/images/image-creme-brulee-mobile.jpg",
      "tablet": "./assets/images/image-creme-brulee-tablet.jpg",
      "desktop": "./assets/images/image-creme-brulee-desktop.jpg"
    },
    "name": "Vanilla Bean Crème Brûlée",
    "category": "Crème Brûlée",
    "price": 7.00
  },
  {
    "image": {
      "thumbnail": "./assets/images/image-macaron-thumbnail.jpg",
      "mobile": "./assets/images/image-macaron-mobile.jpg",
      "tablet": "./assets/images/image-macaron-tablet.jpg",
      "desktop": "./assets/images/image-macaron-desktop.jpg"
    },
    "name": "Macaron Mix of Five",
    "category": "Macaron",
    "price": 8.00
  },
  {
    "image": {
      "thumbnail": "./assets/images/image-tiramisu-thumbnail.jpg",
      "mobile": "./assets/images/image-tiramisu-mobile.jpg",
      "tablet": "./assets/images/image-tiramisu-tablet.jpg",
      "desktop": "./assets/images/image-tiramisu-desktop.jpg"
    },
    "name": "Classic Tiramisu",
    "category": "Tiramisu",
    "price": 5.50
  },
  {
    "image": {
      "thumbnail": "./assets/images/image-baklava-thumbnail.jpg",
      "mobile": "./assets/images/image-baklava-mobile.jpg",
      "tablet": "./assets/images/image-baklava-tablet.jpg",
      "desktop": "./assets/images/image-baklava-desktop.jpg"
    },
    "name": "Pistachio Baklava",
    "category": "Baklava",
    "price": 4.00
  },
  {
    "image": {
      "thumbnail": "./assets/images/image-meringue-thumbnail.jpg",
      "mobile": "./assets/images/image-meringue-mobile.jpg",
      "tablet": "./assets/images/image-meringue-tablet.jpg",
      "desktop": "./assets/images/image-meringue-desktop.jpg"
    },
    "name": "Lemon Meringue Pie",
    "category": "Pie",
    "price": 5.00
  },
  {
    "image": {
      "thumbnail": "./assets/images/image-cake-thumbnail.jpg",
      "mobile": "./assets/images/image-cake-mobile.jpg",
      "tablet": "./assets/images/image-cake-tablet.jpg",
      "desktop": "./assets/images/image-cake-desktop.jpg"
    },
    "name": "Red Velvet Cake",
    "category": "Cake",
    "price": 4.50
  },
  {
    "image": {
      "thumbnail": "./assets/images/image-brownie-thumbnail.jpg",
      "mobile": "./assets/images/image-brownie-mobile.jpg",
      "tablet": "./assets/images/image-brownie-tablet.jpg",
      "desktop": "./assets/images/image-brownie-desktop.jpg"
    },
    "name": "Salted Caramel Brownie",
    "category": "Brownie",
    "price": 4.50
  },
  {
    "image": {
      "thumbnail": "./assets/images/image-panna-cotta-thumbnail.jpg",
      "mobile": "./assets/images/image-panna-cotta-mobile.jpg",
      "tablet": "./assets/images/image-panna-cotta-tablet.jpg",
      "desktop": "./assets/images/image-panna-cotta-desktop.jpg"
    },
    "name": "Vanilla Panna Cotta",
    "category": "Panna Cotta",
    "price": 6.50
  }
];



const itemsContainer = document.querySelector(".left")
const cartItemsContainer = document.querySelector(".cart-items")
const cartCountEl = document.querySelector(".cart-count")
const cartTotalValueEl = document.querySelector(".cart-total-value")
const cartConfirmBtn = document.querySelector(".cart-confirm-btn")
const cartMessage = document.querySelector(".cart-message")

const cart = {}

function buildProductCards() {
  const items = products.map((item, index) => {
    return `
      <div class="card" data-index="${index}">
        <div class="image">
          <img src="${item.image.desktop}" />
        </div>
        <div class="text">
          <div class="interactions">
            <button type="button" class="cart-add-btn" data-index="${index}">
              <img src="assets/images/icon-add-to-cart.svg" />
              Add to Cart
            </button>
            <div class="quantity-box hidden" data-index="${index}">
              <button type="button" class="qty-decrement" data-index="${index}"><img src="assets/images/icon-decrement-quantity.svg"></button>
              <p class="qty-value">0</p>
              <button type="button" class="qty-increment" data-index="${index}"><img src="assets/images/icon-increment-quantity.svg"></button>
            </div>
          </div>
          <p class="item">${item.category}</p>
          <p class="item-title">${item.name}</p>
          <p class="item-price">$${item.price.toFixed(2)}</p>
        </div>
      </div>
    `
  }).join("")

  itemsContainer.innerHTML = items
}

function updateCartDisplay() {
  const cartEntries = Object.entries(cart).filter(([, quantity]) => quantity > 0)
  const total = cartEntries.reduce((sum, [index, quantity]) => {
    return sum + products[index].price * quantity
  }, 0)

  cartCountEl.textContent = cartEntries.reduce((sum, [, quantity]) => sum + quantity, 0)
  cartTotalValueEl.textContent = total.toFixed(2)
  updateConfirmButton()

  if (cartEntries.length === 0) {
    cartItemsContainer.innerHTML = '<div class="cart-empty">Your added items will appear here</div>'
    return
  }

  cartItemsContainer.innerHTML = cartEntries.map(([index, quantity]) => {
    const product = products[index]
    const lineTotal = (product.price * quantity).toFixed(2)
    return `
      <div class="cart-item">
        <div>
          <p class="cart-item-name">${product.name}</p>
          <p class="cart-item-details">${quantity} × $${product.price.toFixed(2)}</p>
        </div>
        <div class="cart-item-total">$${lineTotal}</div>
      </div>
    `
  }).join("")
}

function showQuantityControls(index, quantity) {
  const addBtn = itemsContainer.querySelector(`.cart-add-btn[data-index='${index}']`)
  const quantityBox = itemsContainer.querySelector(`.quantity-box[data-index='${index}']`)
  const qtyValue = quantityBox?.querySelector(".qty-value")

  if (quantity > 0) {
    addBtn?.classList.add("hidden")
    quantityBox?.classList.remove("hidden")
    if (qtyValue) qtyValue.textContent = quantity
  } else {
    addBtn?.classList.remove("hidden")
    quantityBox?.classList.add("hidden")
    if (qtyValue) qtyValue.textContent = 0
  }
}

function updateProductControls(index) {
  const quantity = cart[index] ?? 0
  showQuantityControls(index, quantity)
}

function handleAddClick(index) {
  const itemIndex = Number(index)
  cart[itemIndex] = (cart[itemIndex] ?? 0) + 1
  updateProductControls(itemIndex)
  updateCartDisplay()
}

function handleQuantityChange(index, delta) {
  const itemIndex = Number(index)
  const newQuantity = Math.max(0, (cart[itemIndex] ?? 0) + delta)

  if (newQuantity > 0) {
    cart[itemIndex] = newQuantity
  } else {
    delete cart[itemIndex]
  }

  updateProductControls(itemIndex)
  updateCartDisplay()
}

function updateConfirmButton() {
  const hasItems = Object.keys(cart).length > 0
  cartConfirmBtn.disabled = !hasItems
}

function confirmOrder() {
  const cartEntries = Object.entries(cart)
  if (cartEntries.length === 0) {
    cartMessage.textContent = "Add items to your cart before confirming."
    return
  }

  const totalItems = cartEntries.reduce((sum, [, quantity]) => sum + quantity, 0)
  const totalAmount = cartEntries.reduce((sum, [index, quantity]) => sum + products[index].price * quantity, 0)

  cartMessage.textContent = `Order confirmed! You ordered ${totalItems} item${totalItems === 1 ? "" : "s"} for $${totalAmount.toFixed(2)}.`
  Object.keys(cart).forEach(key => delete cart[key])
  cartEntries.forEach(([index]) => updateProductControls(Number(index)))
  updateCartDisplay()
}

function attachListeners() {
  itemsContainer.querySelectorAll(".cart-add-btn").forEach(button => {
    button.addEventListener("click", () => {
      handleAddClick(button.dataset.index)
    })
  })

  itemsContainer.querySelectorAll(".qty-increment").forEach(button => {
    button.addEventListener("click", () => {
      handleQuantityChange(button.dataset.index, 1)
    })
  })

  itemsContainer.querySelectorAll(".qty-decrement").forEach(button => {
    button.addEventListener("click", () => {
      handleQuantityChange(button.dataset.index, -1)
    })
  })

  cartConfirmBtn.addEventListener("click", confirmOrder)
}

buildProductCards()
attachListeners()
updateCartDisplay()