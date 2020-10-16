<template>
  <span>
    <b-button variant="light" @click.prevent="addCart">
      <i class="fas fa-cart-plus"></i>
    </b-button>
    <b-alert
      :show="dismissCountDown"
      dismissible
      fade
      variant="warning"
      @dismiss-count-down="countDownChanged"
      class="mt-3"
      style="position:fixed; bottom:70%; right:15%; width: 70%; z-index: 999;"
    >已加入購物車</b-alert>
  </span>
</template>

<script>
export default {
  data () {
    return {
      product: {
        imageUrl: [],
        options: {
          author: ''
        }
      },
      quantity: 1,
      cartList: [],
      dismissCountDown: 0
    }
  },
  methods: {
    addCart () {
      this.$bus.$emit('show-overlay', true)
      this.getCartList().then((cartList) => {
        console.log(cartList)
        const found = this.foundItem(cartList)
        let quantity
        let method = ''
        if (found) {
          quantity = this.quantity + found.quantity
          method = 'patch'
        } else {
          quantity = this.quantity
          method = 'post'
        }
        const apiCart = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`
        this.axios({
          method: method,
          url: apiCart,
          data: {
            product: this.id,
            quantity: quantity
          }
        })
          .then((res) => {
            console.log(res)
            this.showAlert()
            this.getCartList().then((newList) => {
              console.log(newList)
              this.$bus.$emit('show-overlay', false)
            })
          })
          .catch((err) => {
            this.showAlert()
            this.$bus.$emit('show-overlay', false)
            console.log(err)
          })
      })
    },
    getCartList () {
      return new Promise((resolve, reject) => {
        const apiCartList = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`
        this.axios
          .get(apiCartList)
          .then((res) => {
            console.log(res)
            const newList = res.data.data
            const count = newList.reduce((acc, crr) => {
              return acc + crr.quantity
            }, 0)
            this.$bus.$emit('updateCart', count)
            resolve(newList)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    foundItem (cartList) {
      return cartList.find((product) => {
        return product.product.id === this.id
      })
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = 2
    }
  }
}
</script>
