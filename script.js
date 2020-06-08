var app = new Vue({
  el: '#app',
  data: {
    brand: 'Vue Mastery',
    product: 'Socks',
    description: 'Very nice socks in diferents sizes and styles, check it out',
    image: "./assets/sock-green.png",
    altText: 'A pair of socks',
    inStock: true,
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    variants: [
      {
        variantId: 2234,
        variantColor: "green",
        variantImage: "./assets/sock-green.png"
      },
      {
        variantId: 2235,
        variantImage: "./assets/sock-blue.png",
        variantColor: "blue"
      }
    ],
    cart: 0
  },

  methods: {
    addToCart() {
      this.cart += 1
    },
    updateProduct(variantImage) {
      this.image = variantImage
    }
  },

  computed: {
    title() {
      return this.brand + ' ' + this.product
    }
  }
})