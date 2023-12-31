const modalOverlay = document.getElementById("modal-overlay");
const modalContainer = document.getElementById("modal-container");
const cartBtn = document.getElementById("cart-btn");
const cartCounter = document.getElementById("cart-counter");

const displayCart = () => {
    modalContainer.innerHTML = '';
    modalContainer.style.display = 'block';
    modalOverlay.style.display = 'block';
    //modal header
    const modalHeader = document.createElement('div');
    const modalClose = document.createElement('div');
    modalClose.innerHTML = '<i class="btn-close fa-solid fa-x"></i>';
    modalClose.className = 'modal-close';
    modalHeader.append(modalClose);

    modalClose.addEventListener('click', () => {
        modalContainer.style.display = 'none';
        modalOverlay.style.display = 'none';
    });

    const modalTitle = document.createElement('div');
    modalTitle.innerText = 'Carrito';
    modalTitle.className = 'modal-title';
    modalHeader.append(modalTitle);

    modalContainer.append(modalHeader);

    //modal body
    if(cart.length > 0){
    cart.forEach((product) => {
        const modalBody = document.createElement('div');
        modalBody.className = 'modal-body';
        modalBody.innerHTML = `
        <div class="producto">
                <img class="producto-img" src="${product.img}"/>
                <div class="producto-info">
                    <h4>${product.name}</h4>
                </div>
                <div class="quantity">
                <span class="quantity-btn-decrease">-</span>
                <span class="quantity-input">${product.quantity}</span>
                <span class="quantity-btn-increse">+</span>
                </div>
                <div class="price">$${(product.price * product.quantity).toFixed(1)}</div>
                <div class="delete-producto"><i class="trash fa-solid fa-trash"></i></div>

        </div>
        `;
        modalContainer.append(modalBody);

        const decrese = modalBody.querySelector('.quantity-btn-decrease');
        decrese.addEventListener('click',()=>{
            if(product.quantity!== 1){
                product.quantity--;
                displayCart();
                displayCartCounter();
            }
        });

        const increse = modalBody.querySelector('.quantity-btn-increse');
        increse.addEventListener('click',()=>{
                product.quantity++;
                displayCart();
                displayCartCounter();
        });

        //delete
        const deletProduct = modalBody.querySelector('.delete-producto');
        deletProduct.addEventListener('click', ()=>{
            deleteCartProduct(product.id);
        });
    });

    //modal footer
    const total = cart.reduce((acc, el) => acc + el.price * el.quantity,0);
    const modalFooter = document.createElement('div');
    modalFooter.className = 'modal-footer';
    modalFooter.innerHTML = `
    <div class="total-price">Total: $${total.toFixed(1)}</div>
    `;

    modalContainer.append(modalFooter);
}
else{
    const modalText = document.createElement('h2');
    modalText.className = 'modal-body';
    modalText.innerText = 'Tu carrito está vacío.';
    modalContainer.append(modalText);
}
};

cartBtn.addEventListener('click',displayCart);

const deleteCartProduct = (id) =>{
    const foundId = cart.findIndex((element)=> element.id === id);
    cart.splice(foundId,1);
    displayCart();
    displayCartCounter();
};

const displayCartCounter = () =>{
    const cartLength = cart.reduce((acc, el) => acc + el.quantity,0);

    if(cartLength > 0){
        cartCounter.style.display = 'block';
        cartCounter.innerText = cartLength;
    }
    else{
        cartCounter.style.display = 'none';
    }
    

}
