const cartlist = document.querySelector('.cart-list');
const emptyCart = document.querySelector('.emptyCart');
let cartData = JSON.parse(localStorage.getItem('cart')) || [];

function renderProduct() {
  // Clear existing cart items before rendering
  cartlist.innerHTML = '';

  if (cartData.length > 0) {
    emptyCart.style.display = 'none';

    cartData.forEach((item, index) => {
      const cartItem = `
        <div class="row mb-2 cart-item bg-light p-3 rounded">
          <div class="col-7 left-info">
            <h5 class="item-name">${item.name}</h5>
            <div class="d-flex flex-wrap">
              <p class="item-detail me-2 mb-1"><strong>ID:</strong> ${item.id}</p>
              <p class="item-detail me-2 mb-1"><strong>Color:</strong> ${item.color}</p>
              <p class="item-detail mb-1"><strong>Size:</strong> ${item.size}</p>
            </div>
          </div>
          <div class="col-4 right-info text-end">
            <p class="mb-1"><strong>Quantity:</strong> ${item.qty}</p>
            <p class="mb-1"><strong>Price:</strong> ${item.price}</p>
          </div>
          <div class="col-1 d-flex align-items-center justify-content-center">
            <button class="btn btn-outline-danger delete-product border-0" data-index="${index}">
              <i class="bi bi-trash fs-4"></i>
            </button>
          </div>
        </div>

      `;
      cartlist.innerHTML += cartItem;
    });

    // Attach event listeners to all delete buttons
    document.querySelectorAll('.delete-product').forEach(button => {
      button.addEventListener('click', function() {
        const index = this.getAttribute('data-index');
        deleteProduct(index);
      });
    });
  } else {
    emptyCart.style.display = 'block';
  }
}

function deleteProduct(index) {
  cart.splice(index, 1); // Remove item from cart array
  localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
  renderProduct(); // Re-render products
}

renderProduct();
