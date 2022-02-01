
let carts = document.querySelectorAll('.button');
let products = [
    {
        name: 'Vandal',
        tag: 'vandal',
        price: 999.9,
        inCart: 0
    },
    {
        name: 'Phantom',
        tag: 'phantom',
        price: 999.9,
        inCart: 0
    },
    {
        name: 'R-99 SMG',
        tag: 'r99',
        price: 699.9,
        inCart: 0
    },
    {
        name: 'Scar-L',
        tag: 'scar-l',
        price: 1200,
        inCart: 0
    },
    {
        name: 'Mini M4',
        tag: 'mini-m4',
        price: 500,
        inCart: 0
    },
    {
        name: 'Glock 17',
        tag: 'glock17',
        price: 500,
        inCart: 0
    },
    {
        name: 'Colt .22',
        tag: 'colt22',
        price: 999.9,
        inCart: 0
    },
    {
        name: 'Spectre',
        tag: 'Spectre',
        price: 799.9,
        inCart: 0
    },
    {
        name: 'Operator',
        tag: 'Op',
        price: 2000,
        inCart: 0
    },
    {
        name: 'QQ9',
        tag: 'q99',
        price: 799.9,
        inCart: 0
    },
    {
        name: 'KRM-262',
        tag: 'krm262',
        price: 999.9,
        inCart: 0
    },
    {
        name: 'DL-Q33',
        tag: 'dlq33',
        price: 2000,
        inCart: 0
    }
];


for(let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    
    productNumbers = parseInt(productNumbers);
    if( productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers +1);
        document.querySelector('.cart span').textContent = productNumbers+1;
    }
    else {
        localStorage.setItem('cartNumbers', 1); 
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);

    

    
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems !=null) {

        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }
    else {
        product.inCart = 1;
        cartItems = {
            [product.tag] : product
        }
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
    

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost+product.price);
    }
    else {
        localStorage.setItem("totalCost", product.price);
    }
    
}

function proceed() {
    alert('Payment successful');
}

function showCheck() {
    var check = document.getElementById("checkoutpop");
    if (check.style.display === "none") {
        check.style.display = "block";
      } 
    else {
        check.style.display = "none";
      
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    if(cartItems && productContainer ){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <button class="remove-button">Remove</button>
                <span style="margin-left:100px;">${item.name}</span>
                <div class="price">
                    $${item.price}
                </div>
                <div class="quantity">
                    
                    <span >${item.inCart}</span>
                    
                </div>
                <div class="total">
                    $${item.inCart * item.price}
                </div>
            <div>`
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    $${cartCost}
                </h4>
            </div>`

    }
}


displayCart();