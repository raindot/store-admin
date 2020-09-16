<template>
<b-overlay :show="loading">
  <div class="container">
    <b-navbar toggleable="lg" variant="light">
        <b-navbar-brand href="#">後台</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item :to="{ name: 'products-admin'}">產品列表</b-nav-item>
            <b-nav-item :to="{ name: 'order-list'}">訂單列表</b-nav-item>
            <b-nav-item :to="{ name: 'coupon-list'}">優惠券列表</b-nav-item>
            <b-nav-item :to="{ name: 'file-list'}">圖片列表</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    <router-view></router-view>
  </div>
</b-overlay>
</template>
<script>
export default {
  data () {
    return {
      token: '',
      loading: false
    }
  },
  created () {
    this.$bus.$on('show-overlay', status => {
      this.loading = status
    })
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)AUTH_TOKEN\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.axios.defaults.headers.common.Authorization = `Bearer ${token}`
  }
}
</script>
