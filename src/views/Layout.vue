<template>
  <div>
    <b-overlay :show="loading" rounded="sm">
      <div class="container">
        <b-navbar toggleable="lg">
          <b-navbar-brand to="/">Y＆J Pâtisserie</b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item :to="{ name: 'products'}">Shopping</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav>
              <b-nav-item :to="{ name: 'about'}">About</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
              <b-nav-item :to="{ name: 'cart'}">
                <cart-count></cart-count>
              </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
        <router-view></router-view>
      </div>
      <the-footer></the-footer>
    </b-overlay>
  </div>
</template>
<script>
import TheFooter from '@/components/TheFooter.vue'
import CartCount from '@/components/CartCount.vue'

export default {
  data () {
    return {
      // cartList: [],
      // cartCount: 0,
      loading: false
      // apiCart: `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`
    }
  },
  components: {
    CartCount,
    TheFooter
  },
  created () {
    // this.getCartList().then(list => {
    //   this.cartList = list
    //   this.cartCount = this.cartList.reduce((acc, crr) => {
    //     return acc + crr.quantity
    //   }, 0)
    // })
    this.$bus.$on('show-overlay', status => {
      this.loading = status
    })
    // this.$bus.$on('updateCart', count => {
    //   this.cartCount = count
    // })
  }
  // methods: {
  //   getCartList () {
  //     return new Promise((resolve, reject) => {
  //       this.axios.get(this.apiCart).then(res => {
  //         const newList = res.data.data
  //         resolve(newList)
  //       }).catch(err => {
  //         reject(err)
  //       })
  //     })
  //   }
  // }
}
</script>
