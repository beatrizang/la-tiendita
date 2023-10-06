const shopContent = document.getElementById("shopContent");
const cart = [];

products.forEach((product) => {
    const content = document.createElement('div');
    content.className = 'product';
    content.innerHTML = `
    <img src="${product.img}" alt="">
    <h3 class="product-name">${product.name}</h3>
    <p class="product-price">$ ${product.price}</p>
    `;

    shopContent.append(content);
    const buyButton = document.createElement('button');
    buyButton.className = 'product-btn';
    buyButton.innerText = 'comprar';
    content.append(buyButton);

    buyButton.addEventListener('click', () => {
        const repeat = cart.some((repeatProduct) => repeatProduct.id === product.id);
        if(repeat){
            cart.map((prod) => {
                if(prod.id === product.id){
                    prod.quantity++;
                    displayCartCounter();
                }
            })
        }
        else{
            cart.push({
                id:product.id,
                name:product.name,
                price:product.price,
                quantity:product.quantity,
                img:product.img,
            });
            displayCartCounter();
        }
    })
});