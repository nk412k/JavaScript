class product {
    title='DEFAULT';
    imageSource;
    description;
    price;
    constructor(title,imagesrc,price,descrip){
        this.title=title;
        this.imageSource=imagesrc;
        this.price=price;
        this.description=descrip;
    }
}

class ProductList{
    products=[
        new product('Iphone 13 Pro Max','assets/images/iphone-13-pro-max-graphite-select.jfif',129000,"Iphone 13 pro max. Storage: 256GB"),
        new product('OnePlus 9 Pro','assets/images/61LvUvbZGlL._SL1500_.jpg',52000,"OnePlus 9 Pro. Storage: 126GB")
        
    ]
    render(){
        
        const prodList=document.createElement('ul');
        prodList.className='product-list';
        for(const prod of this.products)
        {
            const prodItem=new productItem(prod);
            const prodEl=prodItem.render();
            prodList.append(prodEl);
        }
        return prodList;
    }
}

class productItem{
    constructor(product){
        this.product=product;
    }

    addToCart(){
        console.log("Adding product to cart");
        console.log(this.product);
        App.addProductToCart(this.product);
    }
    render(){
        const prodEl=document.createElement('li');
            prodEl.className='product-item';
            prodEl.innerHTML=`
            <div>
                <img src=${this.product.imageSource}
            </div>
            <div class="product-item__content">
            <h2>${this.product.title}</h2>
            <h3>${this.product.price}</h2>
            <p>${this.product.description}</p>
            <button> Add to cart</button>
            </div>
            `
        const btn=prodEl.querySelector('button');
        btn.addEventListener('click',this.addToCart.bind(this));
              
        return prodEl;
    }
}
class ShoppingCart{
    items=[];

    get totalAmount(){
        const sum=this.items.reduce((prevValue,curItem) => prevValue + curItem.price,0);
        return sum;
    }

    addProduct(product){
        this.items.push(product);
        this.totalOutput.innerHTML=`<h2>Total=Rs ${this.totalAmount}</h2>`;

    }
    render(){
        const cartEl=document.createElement('section')
        cartEl.innerHTML=`
        <h2>Total=Rs ${0}</h2>
        <button>Order Now!</button>
        `
        this.totalOutput=cartEl.querySelector('h2');
        cartEl.className='cart';
        return cartEl;
    }
}

class Shop{
    render(){
        const renderHook=document.getElementById('app');
        const productList=new ProductList();
        this.Shoppingcart=new ShoppingCart();
        const cart=this.Shoppingcart.render();
        const prodList=productList.render();

        renderHook.append(cart);
        renderHook.append(prodList);
    }
}

class App{
    static cart;

    static init(){
        const shop=new Shop();
        shop.render();
        this.Shoppingcart=shop.Shoppingcart;
    }

    static addProductToCart(product){
        this.Shoppingcart.addProduct(product);
    }
}

App.init();


