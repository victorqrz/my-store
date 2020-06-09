Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
  <div class="product">
   
    <div class="top-information">
      
      <div class="product-image">
        <img :src="image" :alt="altText">
      </div>

      <div class="product-info">
    
        <h1>{{ title }}</h1>
        <p v-if="inStock">In Stock</p>
        <p v-else="inStock" :class="{ outOfStock: !inStock }">Out of Stock</p>
        <p>Shipping: {{ shipping }}</p>

        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>

        <div v-for="(variant, index) in variants" 
            :key="variant.variantId"
            class="color-box"
            :style="{ backgroundColor: variant.variantColor }"
            @mouseover="updateProduct(index)">
        </div>

        <button @click="addToCart" 
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }">
                Add to Cart
        </button>
      </div>
    </div>

    <div>
      <h2>Reviews</h2>
      <p v-if="!reviews.length">No reviews yet</p>
      <ul>
        <li v-for="review in reviews">
          <p>{{ review.name }}</p>
          <p>Comment: {{ review.review }}</p>
          <p>Rating: {{ review.rating }}</p>
        </li>
      </ul>
    </div>
    
    <product-review @review-submitted="addReview"></product-review>
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
      reviews: []
    }
  } ,

  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
    },
    updateProduct(index) {
      this.selectedVariant = index;
    },
    addReview(productReview) {
      this.reviews.push(productReview)
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
    },
    shipping() {
      if (this.premium) {
        return "Free"
      } 
      
      return 2.99
    }
  }
})

Vue.component('product-review',{
  template: `
    <form class="review-form" @submit.prevent="onSubmit">

      <p v-if="errors.length">
        <b>Please correct the following errors:</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>

      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name"/>
      </p>

      <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
      </p>

      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>

      <p>
        <div class="buttonForm">
          <input type="submit" value="Submit"/>
        </div>
      </p>

    </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      errors: []
    }
  },

  methods: {
    onSubmit() {
      if(this.name && this.review && this.rating) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating
        }
  
        this.$emit('review-submitted', productReview)
  
        this.name = null,
        this.review = null,
        this.rating = null
      } 
    else {
      if(!this.name) 
        this.errors.push("Name required !")
      if(!this.review) 
        this.errors.push("Review required !")
      if(!this.rating) 
        this.errors.push("Rating required !")
    }
      
  }
}

})

var app = new Vue({
  el: '#app', 
  data: {
    premium: true,
    cart: [],
  },

  methods: {
    updateCart(id) {
      this.cart.push(id)
    }
  }
})