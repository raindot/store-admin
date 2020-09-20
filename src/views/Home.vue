<template>
  <div>
    <div class="container">
      <div class="position-relative">
        <div
          class="position-absolute"
          style="top:0; bottom:0; left:0; right:0; background-image: url(https://images.unsplash.com/photo-1519657635301-68bb60c798f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1346&q=80);
        background-position: center center; opacity: 1;"
        ></div>
        <div class="container d-flex flex-column" style="min-height: 100vh;">
          <nav class="navbar navbar-expand navbar-light">
            <router-link to="/" class="navbar-brand">徜徉水族</router-link>
            <div class="justify-content-end" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <router-link to="/about" class="nav-item nav-link mr-4">About</router-link>
                <router-link to="/products" class="nav-item nav-link mr-4">Product</router-link>
                <router-link to="/cart" class="nav-item nav-link">
                  <i class="fas fa-shopping-cart"></i>
                </router-link>
              </div>
            </div>
          </nav>
          <div class="row justify-content-center my-auto">
            <div class="col-md-4 text-center">
              <h2 class="text-light text-nowrap">打造你的水底小世界</h2>
              <p
                class="text-muted mb-0"
              >我們提供最高品質的水族用品</p>
              <router-link to="/products" class="btn btn-dark rounded-0 mt-6">購物去</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row mt-5">
          <div v-for="product in displayProduct" :key="product.id" class="col-md-4 mt-md-4">
            <div class="card border-0 mb-4">
              <router-link :to="{ name: 'product-detail', params: { id: product.id }}">
                <img
                  :src="product.imageUrl[1]"
                  class="card-img-top rounded-0"
                  alt="..."
                />
              </router-link>
              <div class="card-body text-center">
                <h5>{{product.title}}</h5>
                <div class="d-flex justify-content-between">
                  <p class="card-text text-muted mb-0">
                    {{product.description}}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-light mt-5">
        <div class="container">
          <b-carousel
            id="carousel-1"
            :interval="4000"
            controls
            indicators
            background="#f2f2f2"
            img-width="1024"
            img-height="380"
            style="text-shadow: 1px 1px 2px #333;"
          >
            <b-carousel-slide caption="我們提供更多元化的產品選擇" img-blank img-alt="Blank image">
              <div>
                讓您不必煩惱
              </div>
            </b-carousel-slide>
          </b-carousel>
        </div>
      </div>
      <div class="container my-7">
        <div class="row">
          <div class="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1503449750664-33ec9c22420c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80"
              alt
              class="img-fluid"
            />
          </div>
          <div class="col-md-4 m-auto text-center">
            <h4 class="mt-4">專業的水族材料</h4>
            <p
              class="text-muted"
            >專賣水族材料,提供魚缸設計及特殊訂製,另有定期維護方案，歡迎到店詢問各式問題</p>
          </div>
        </div>
        <div class="row flex-row-reverse justify-content-between mt-4">
          <div class="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1584881460925-be7b0ab68b92?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80"
              alt
              class="img-fluid"
            />
          </div>
          <div class="col-md-4 m-auto text-center">
            <h4 class="mt-4">超白玻璃缸</h4>
            <p
              class="text-muted"
            >全強化玻璃系列-上架中</p>
          </div>
        </div>
      </div>
    <the-footer></the-footer>
    </div>
  </div>
</template>

<script>
import TheFooter from '@/components/TheFooter.vue'
export default {
  data () {
    return {
      displayProductId: [
        '21BTjmxHq99uJbE4Y2OD3EcTWYwmu93imRt1uRX3JU8yBrWgINGrS8KOa9wZXr3G',
        'pVZcbrEpUnyKuaXDX3akiADUUDPT3yN0uK38xpgyKfq2Fa4rUoZRV5hIi9MlqDPI',
        'f5gNTdT0iRspGI6ZVwhNYY36DaMRWAJ7q18pdiRBkpKUu8842kjgxyINw2kpGdMq'
      ],
      displayProduct: []
    }
  },
  components: {
    TheFooter
  },
  created () {
    this.displayProductId.forEach(id => {
      this.getProductDetail(id)
    })
  },
  methods: {
    getProductDetail (id) {
      const apiProduct = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/product/${id}`
      this.axios.get(apiProduct).then((res) => {
        console.log(res)
        const product = res.data.data
        this.displayProduct.push(product)
      })
    }
  }
}
</script>
