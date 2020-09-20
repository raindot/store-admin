<template>
  <div>
    <div class="container">
      <b-navbar toggleable="lg">
        <b-navbar-brand to="/">徜徉水族</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item :to="{ name: 'products'}">產品列表</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav>
            <b-nav-item :to="{ name: 'about'}">品牌故事</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item :to="{ name: 'cart'}"><i class="fas fa-shopping-cart"></i></b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <router-view></router-view>
    </div>
    <the-footer></the-footer>
  </div>
</template>
<script>
import TheFooter from '@/components/TheFooter.vue'

export default {
  components: {
    TheFooter
  }
}
</script>
