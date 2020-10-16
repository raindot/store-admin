<template>
  <div>
    <i class="fas fa-shopping-cart"></i>
    <b-badge pill variant="success" style="transform: scale(0.8);">{{cartCount}}</b-badge>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cartList: [],
      cartCount: 0,
      apiCart: `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`
    }
  },
  created () {
    this.getCartList().then(list => {
      this.cartList = list
      this.cartCount = this.cartList.reduce((acc, crr) => {
        return acc + crr.quantity
      }, 0)
    })
    this.$bus.$on('updateCart', count => {
      this.cartCount = count
    })
  },
  methods: {
    getCartList () {
      return new Promise((resolve, reject) => {
        this.axios.get(this.apiCart).then(res => {
          const newList = res.data.data
          resolve(newList)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
</script>
