Vue.component('product', {
  template: `
  <div class="product">
   
  <div class="product-image">
    <img :src="image" :alt="altText">
  </div>

  <div class="product-info">
    
    <h1>{{ title }}</h1>
    <p v-if="inStock">In Stock</p>
    <p v-else="inStock" :class="{ outOfStock: !inStock }">Out of Stock</p>
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>

    <div v-for="(variant, index) in variants" 
        :key="variant.variantId"
        class="color-box"
        :style="{ backgroundColor: variant.variantColor }"
        @mouseover="updateProduct(index)">
    </div>

    <button v-on:click="addToCart" 
            :disabled="!inStock"
            :class="{ disabledButton: !inStock }" >Add to Cart</button>

    <div class="cart">
      <p>Cart({{cart}})</p>
    </div>

  </div>

 </div>
  `,
  data() {
    return {
      brand: 'Vue Mastery',
      product: 'Socks',
      selectedVariant: 0,
      altText: 'A pair of socks',
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      variants: [
        {
          variantId: 2234,
          variantColor: "green",
          variantImage: "./assets/sock-green.png",
          variantQuantity: 10
        },
        {
          variantId: 2235,
          variantImage: "./assets/sock-blue.png",
          variantColor: "blue",
          variantQuantity: 0
        }
      ],
      cart: 0
    }
  } ,

  methods: {
    addToCart() {
      this.cart += 1
    },
    updateProduct(index) {
      this.selectedVariant = index;
      console.log(index);
    }
  },

  computed: {
    title() {
      return this.brand + ' ' + this.product
    },
    image() {
      return this.variants[this.selectedVariant].variantImage
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity
    }
  }
})

var app = new Vue({
  el: '#app', 
})