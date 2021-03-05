<template>
<b-overlay :show="loading" rounded="sm">

  <div>
    <div class="container">
      <b-navbar toggleable="lg">
        <b-navbar-brand href="#">Y＆J Pâtisserie</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/products">Shopping</b-nav-item>
            <b-nav-item to="/about">About</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto d-flex align-items-center">
            <b-nav-item :to="{ name: 'cart'}">
              <cart-count></cart-count>
            </b-nav-item>
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em>Admin</em>
              </template>
              <b-dropdown-item to="/admin/products">Login</b-dropdown-item>
              <!-- <b-dropdown-item href="#"> </b-dropdown-item> -->
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <section class="position-relative">
      <img class="img-fluid" src="../assets/img/main-bg.jpeg" alt="" />
      <div class="position-absolute home-slogan">
        <h1 class="home-slogan-h1">Y＆J Pâtisserie</h1>
        <p class="home-description">
          給你最溫暖的味道
        </p>
        <p>
          <b-button to="/products" class="mr-4" variant="primary" size="lg">Contact</b-button>
        </p>
      </div>
      <!-- <div class="home-slogan2 text-center mx-auto position-absolute">
        Everything you need for your creative projects.
      </div> -->
    </section>
    <section class="container bg-transparent mt-5">
      <div class="row py-4">
        <div class="col-lg-4 col-md-6">
          <div
            class="home-icon mx-auto border border-dark rounded-circle text-center text-primary"
          >
            <i class="fas fa-heart"></i>
          </div>
          <h4 class="my-3 text-center">嚴選的天然食材</h4>
          <p class="text-muted">
            讓您每一口吃得安心又健康！
            選用來自法國國家食品金牌獎的頂級原料，以吹毛求疵的研發精神，終於造就堆疊出極致的美味。
          </p>
        </div>
        <div class="col-lg-4 col-md-6">
          <div
            class="home-icon mx-auto border border-dark rounded-circle text-center text-primary"
          >
            <i class="far fa-star"></i>
          </div>
          <h4 class="my-3 text-center">多樣化的甜點選擇</h4>
          <p class="text-muted">
            滿足顧客不同需求的味蕾
            包括乳源的鮮甜、巧克力的苦甜，盡在其中
          </p>
        </div>
        <div class="col-lg-4 col-md-6">
          <div
            class="home-icon mx-auto border border-dark rounded-circle text-center text-primary"
          >
            <i class="fas fa-shipping-fast"></i>
          </div>
          <h4 class="my-3 text-center">訂後製造99.8%的新鮮</h4>
          <p class="text-muted">
            新鮮的甜點是最美味的保證，採用下訂後製造。
讓您輕鬆享受來自大師手藝的上乘滋味。
          </p>
        </div>
      </div>
    </section>
    <section class="container mt-5">
      <h1 class="text-center">法式甜點</h1>
      <p class="text-muted text-center">
        Pâtisserie
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
              style="max-height: 210px; overflow: hidden;"
            ></b-card-img>
            <b-card-body>
              <b-card-title class="mt-3">{{ product.title }}</b-card-title>
              <b-card-sub-title>{{ product.category }}</b-card-sub-title>
              <b-card-text>
                {{ product.description.substring(0, 90) + '...' }}
              </b-card-text>
              <p class="d-flex justify-content-between">
                <b-button
                  href="#"
                  variant="primary"
                  @click="goProductDetail(product.id)"
                  >Detail</b-button
                >
                <add-cart :id="product.id"></add-cart>
                <!-- <b-button variant="light"><i class="fas fa-cart-plus "></i></b-button> -->
              </p>
            </b-card-body>
          </b-card>
        </div>
      </div>
    </section>
    <section id="contactus" class="px-5 py-4 mt-5" style="background-color: #dd4b69">
      <h2>Contact us</h2>
      <b-form @submit="onSubmit" @reset="onReset" v-if="showForm">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Message:" label-for="input-2">
        <b-form-textarea
          id="textarea"
          v-model="form.message"
          placeholder="How can we help you?"
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-form-group>
      <b-button type="reset" class="mr-2" variant="secondary">Reset</b-button>
      <b-button type="submit" variant="light">Submit</b-button>
    </b-form>
    <b-card v-else title="Thank you">
      <b-card-body>
        Thank you for your message, we'll contact you soon.
      </b-card-body>
    </b-card>
    </section>
    <the-footer></the-footer>
  </div>
</b-overlay>
</template>

<script>
import CartCount from '@/components/CartCount.vue'
import AddCart from '@/components/AddCart.vue'
import TheFooter from '@/components/TheFooter.vue'
export default {
  data () {
    return {
      displayProductId: [
        'SxhXskX2pmJaqhFQ6F4KjwQcB8goMNYtJZXv7IBYCOdxXKHls1gWCMLF0WNONW0B',
        'JWmZtR6SvnXfhRyrVDeXXjTxKCwZWoXANGac3fHROsZLiWGhzggfwx8VLrmAXeyy',
        'dGBIBgtFgnIZjOlL7F5lrMPQGioZysrUgLBO6cv7DN6pzXup6TT1arklff4pJlni',
        '53XXgNQgoEY2clcu358vQCI78SFio0SCJANRHO3F59hGKcVuRHSUjlxMhsV3qkAj',
        'dLy2xr0m0GbrbuDxvSlA0qhVKRqN5kGHily9IV9h4lJPL7VSEOzoCGxk4I5KiK3N',
        'I8vZDg7L31M6gAX7pajbxgAJmi0Ss9Yq44mGvmMISMPfnemcZiDVCBmJlj6mPBWb'
      ],
      displayProduct: [],
      form: {
        email: '',
        name: '',
        message: ''
      },
      showForm: true,
      loading: false
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
        // console.log(res)
        const product = res.data.data
        this.displayProduct.push(product)
      })
    },
    goProductDetail (id) {
      this.$router.push({ name: 'product-detail', params: { id: id } })
    },
    onSubmit (evt) {
      evt.preventDefault()
      this.showForm = false
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

.bg-layer1 {
    left: -17%;
    top: -2%;
    width: 24%;
}

.home-slogan {
  top: 25%;
  left: 4%;
}

.home-slogan-h1 {
  background: white;
  transform: rotate(-3deg) translate(10px,-25px);
}

.home-description {
  background: white;
  transform: rotate(-1deg) translate(5px,-20px);
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
