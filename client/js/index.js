const shopContent = document.getElementById("shopContent");


const cart = JSON.parse(localStorage.getItem("cart")) || []; //Get item ... Convierte el string del LocalStorage a Array nuevamente

productos.forEach((product) =>{
    const content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    <img src="${product.img}"></br>
    <h3>${product.productName}</h3></br>
    <h3>$${product.price}.</h3>
    `;
    shopContent.append(content);


    const buyButton = document.createElement("button");
    buyButton.innerText = "Comprar";
    
    content.append(buyButton);

    buyButton.addEventListener("click", ()=>{
        const repeat = cart.some((repeatProduct) => repeatProduct.id === product.id);

        if (repeat) {
          cart.map((prod) => {
            if (prod.id === product.id) {
              prod.quanty++;
              displayCartCounter();
            }
          });
        } else {
          cart.push({
                id: product.id,
                productName: product.productName,
                price: product.price,
                quanty:product.quanty,
                img: product.img,
          });  
          displayCartCounter();
          saveLocal();
        }
    });
});


//LOCAL STORAGE

//set item
const saveLocal = () => {
  localStorage.setItem("cart", JSON.stringify(cart)); //localstorage solo recibe Strings, y el cart es un array, por eso necesita stringify
};
