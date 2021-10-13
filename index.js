// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

console.log("Running...")

let carts = document.querySelectorAll('.add-cart');
let products = [
  {
    name: 'Whisper Ultra Clean',
    tag: 'Whisper-Ultra-Clean',
    price: 80,
    inCart: 0
  },
  {
    name: 'Whisper Ultra Softs Airfresh',
    tag: 'Whisper-Ultra-Softs-Airfresh',
    price: 175,
    inCart: 0
  },
  {
    name: 'Whisper Bindazzz Nights',
    tag: 'Whisper-Bindazzz-Nights',
    price: 125,
    inCart: 0
  },
  {
    name: 'Whisper Bindazzz Nights Koala Soft',
    tag: 'Whisper-Bindazzz-Nights-Koala-Soft',
    price: 175,
    inCart: 0
  },
  {
    name: 'Whisper Choice Ultra',
    tag: 'Whisper-Choice-Ultra',
    price: 40,
    inCart: 0
  },
  {
    name: 'Stayfree Dry-Max® All Night XL',
    tag: 'Stayfree-Dry-Max-All-Night-XL',
    price: 340,
    inCart: 0
  },
  {
    name: 'Stayfree Advanced® All Night XL',
    tag: 'Stayfree-Advanced-All-Night-XL',
    price: 290,
    inCart: 0
  },
  {
    name: 'Stayfree Dry-Max® XL',
    tag: 'Stayfree-Dry-Max-XL',
    price: 340,
    inCart: 0
  },
  {
    name: 'Stayfree Advanced® XL',
    tag: 'Stayfree-Advanced-XL',
    price: 230,
    inCart: 0
  },
  {
    name: 'Stayfree Dry-Max® Regular',
    tag: 'Stayfree-Dry-Max-Regular',
    price: 160,
    inCart: 0
  },
  {
    name: 'Stayfree Secure® XL Ultra Thin',
    tag: 'Stayfree-Secure-XL-Ultra-Thin',
    price: 170,
    inCart: 0
  },
  {
    name: 'Stayfree Secure® Dry XL',
    tag: 'Stayfree-Secure-Dry-XL',
    price: 110,
    inCart: 0
  },
  {
    name: 'Stayfree Secure® Cottony Soft XL',
    tag: 'Stayfree-Secure-Cottony-Soft-XL',
    price: 190,
    inCart: 0
  },
  {
    name: 'Stayfree Secure® Dry Regular',
    tag: 'Stayfree-Secure-Dry-Regular',
    price: 30,
    inCart: 0
  },
  {
    name: 'Stayfree® Secure® Cottony Regular',
    tag: 'Stayfree-Secure-Cottony-Regular',
    price: 70,
    inCart: 0
  },
  {
    name: 'Cool Super XL+ -323MM',
    tag: 'Cool-Super-XL+-323MM',
    price: 85,
    inCart: 0
  },
  {
    name: 'Cool Extra Long - 290MM',
    tag: 'Cool-Extra-Long-290MM',
    price: 75,
    inCart: 0
  },
  {
    name: 'AntiBacteria Super XL+ - 323MM',
    tag: 'AntiBacteria-Super-XL+-323MM',
    price: 165,
    inCart: 0
  },
  {
    name: 'AntiBacteria Extra Long 290 MM',
    tag: 'AntiBacteria-Extra-Long-290MM',
    price: 200,
    inCart: 0
  },
  {
    name: 'BodyFit',
    tag: 'BodyFit',
    price: 40,
    inCart: 0
  },
  {
    name: 'Soft Tampons - Regular',
    tag: 'Soft-Tampons-Regular',
    price: 180,
    inCart: 0
  },
  {
    name: 'Soft Tampons - Super',
    tag: 'Soft-Tampons-Super',
    price: 180,
    inCart: 0
  }

]
for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalCost(products[i])
  });
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');
  if (productNumbers) {
    document.querySelector('.cart span').textContent = productNumbers;
  }
}
function cartNumbers(product) {
  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.cart .bag-num').textContent = productNumbers + 1;
  }
  else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.cart .bag-num').textContent = 1;
  }
  console.log(cartNumbers)
  setItems(product);
}


function setItems(product) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems)

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product
      }
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product
    }
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems))
}

function totalCost(product) {
  let cartCost = localStorage.getItem('totalCost');
  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart(){
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".cart-products");
  let CartTotal = document.querySelector(".Subtotal");
  
  let cartCost = localStorage.getItem('totalCost');

  if(cartItems && productContainer){
    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
      <div class="align-by-flex">
       <div class = "product"> 
        <img src="./images/${item.tag}.jpg">
        <span>${item.name}</span>
       </div>
      <div class="price">Rs ${item.price}.00</div>
       <div class="quantity"> 
        <ion-icon name="caret-back-outline"></ion-icon><span>
        ${item.inCart}</span>
        <ion-icon name="caret-forward-outline"></ion-icon>
       </div>
       <div class = "total">${item.inCart * item.price}.00</div>
      </div>
      `;
    });

    CartTotal.innerHTML += `
    Rs ${cartCost}
    `
  }
}

let clearCartItems = document.querySelector('.clearCart');
  clearCartItems.addEventListener('click', () => {
    localStorage.clear();
    window.location.reload();
  });


onLoadCartNumbers();
displayCart();