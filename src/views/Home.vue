<template>
  <div>
    <div>
      <b-navbar toggleable="lg">
        <b-navbar-brand href="#">Y's</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/products">Showcase</b-nav-item>
            <b-nav-item to="/about">About</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto d-flex align-items-center">
            <cart-count></cart-count>
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em>User</em>
              </template>
              <b-dropdown-item to="/admin/products">Admin</b-dropdown-item>
              <!-- <b-dropdown-item href="#"> </b-dropdown-item> -->
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <section class="position-relative" style="overflow: hidden">
      <img
        class="position-absolute bg-layer2"
        src="../assets/img/parallax-layer2.png"
        alt=""
      />
      <img class="img-fluid" src="../assets/img/main-bg.png" alt="" />
      <div class="position-absolute home-slogan">
        <h1>Creative multi-purpose shopify theme</h1>
        <p class="home-description">
          Gorgeous designed for your store. Monthly Theme Added.
        </p>
        <p>
          <b-button class="mr-4" variant="primary" size="lg">Contact</b-button>
          <b-button variant="outline-primary" to="/products" size="lg"
            >Discover</b-button
          >
        </p>
      </div>
      <div class="home-slogan2 text-center mx-auto position-absolute">
        <strong>SIX YEARS Of WOW</strong> for going through in Shopify platform,
        listening all of customers’ desires as well as catching up the trends to
        combine everything what clients need.
      </div>
    </section>
    <section class="container bg-transparent">
      <div class="row py-4">
        <div class="col-lg-4 col-md-6">
          <div
            class="home-icon mx-auto border border-dark rounded-circle text-center text-primary"
          >
            <i class="fas fa-heart"></i>
          </div>
          <h4 class="my-3 text-center">New Monthly Theme</h4>
          <p class="text-muted">
            New shopify theme will be monthly released, so that satisfying your
            clients is not so rough anymore & keep your store looking fresh.
          </p>
        </div>
        <div class="col-lg-4 col-md-6">
          <div
            class="home-icon mx-auto border border-dark rounded-circle text-center text-primary"
          >
            <i class="far fa-star"></i>
          </div>
          <h4 class="my-3 text-center">Stunning Design</h4>
          <p class="text-muted">
            Want to increase your sales just in the first visit. Come to us &
            you will see how miracle our flagship shopify themes are.
          </p>
        </div>
        <div class="col-lg-4 col-md-6">
          <div
            class="home-icon mx-auto border border-dark rounded-circle text-center text-primary"
          >
            <i class="fas fa-cog"></i>
          </div>
          <h4 class="my-3 text-center">Easy to Use and Implement</h4>
          <p class="text-muted">
            We analyze, then support you the best methods for any necessary
            processes or features make your website operate stably and smoothly.
          </p>
        </div>
      </div>
    </section>
    <section class="container">
      <h1 class="text-center">Gorgeous Child Themes</h1>
      <p class="text-muted text-center">
        Gorgeous Child Themes. Monthly New Theme Added.
      </p>
      <div class="row">
        <div
          v-for="product in displayProduct"
          :key="product.id"
          class="col-lg-4 col-md-6 col-sm-12"
        >
          <b-card
            no-body
            tag="article"
            class="mb-2 overflow-hidden cursor-pointer"
          >
            <b-card-img
              :src="product.imageUrl[0]"
              @click="goProductDetail(product.id)"
              class="rounded-0"
            ></b-card-img>
            <b-card-body>
              <b-card-title class="mt-3">{{ product.title }}</b-card-title>
              <b-card-sub-title>{{ product.category }}</b-card-sub-title>
              <b-card-text>
                {{ product.description }}
              </b-card-text>
              <p class="d-flex justify-content-between">
                <b-button
                  href="#"
                  variant="primary"
                  @click="goProductDetail(product.id)"
                  >Detail</b-button
                >
                <add-cart></add-cart>
                <!-- <b-button variant="light"><i class="fas fa-cart-plus "></i></b-button> -->
              </p>
            </b-card-body>
          </b-card>
        </div>
      </div>
    </section>
    <section class="px-5 py-4 mt-5" style="background-color: #dd4b69">
      <h2>Contact me</h2>

    </section>
    <the-footer></the-footer>
  </div>
</template>

<script>
import CartCount from '@/components/CartCount.vue'
import AddCart from '@/components/AddCart.vue'
import TheFooter from '@/components/TheFooter.vue'
export default {
  data () {
    return {
      displayProductId: [
        'Qq2mUr8DuelvR2Ffu6SqeclezK27BQ17DXpCLLRWmmm9WtXcbcFAG7tOM8dTbqsM',
        'J015FOZcDC6f7hwkqoQo368vRgzOw4h9IuXg553hTDnoXwThc6kx6SHmyBRQtkpk'
      ],
      displayProduct: [],
      form: {
        email: '',
        name: '',
        message: ''
      },
      showForm: true
    }
  },
  components: {
    CartCount,
    AddCart,
    TheFooter
  },
  created () {
    this.displayProductId.forEach((id) => {
      this.getProductDetail(id)
    })
    this.$bus.$on('show-overlay', (status) => {
      this.loading = status
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
    },
    goProductDetail (id) {
      this.$router.push({ name: 'product-detail', params: { id: id } })
    },
    onSubmit (evt) {
      evt.preventDefault()
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.message = ''
      // Trick to reset/clear native browser form validation state
      this.showForm = false
      this.$nextTick(() => {
        this.showForm = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-layer2 {
  top: 0%;
  left: 24%;
  transform: scale(1);
  z-index: -1;
}

.home-slogan {
  top: 31%;
  left: 4%;
}

.home-description {
  color: #8b919f;
  font-size: 24px;
}
.home-slogan2 {
  bottom: 50px;
  left: 25%;
  font-size: 24px;
  width: 60%;
}
.home-icon {
  width: 50px;
  height: 50px;
  line-height: 50px;
}
</style>
