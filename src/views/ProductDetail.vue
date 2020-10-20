<template>
  <div class="container products mt-5">
    <div>All items / <router-link to="/products">Web Templates</router-link> / <router-link :to="`/product-detail/${id}`">{{product.category}}</router-link></div>
    <div class="row mt-3">
      <div class="col-sm-12 col-md-6">
        <div class="product-pic-zoom position-relative">
          <img v-b-modal.large-img v-for="(image, idx) in product.imageUrl" :key="idx" class="product-big-img img-fluid" :src="image" alt />
          <b-button v-b-modal.large-img variant="light" pill class="text-dark position-absolute" style="bottom: 0; right: 0;">
            <i class="fas fa-search-plus"></i>
          </b-button>
          <b-modal id="large-img" size="xl" centered ok-only :title="product.title">
            <b-carousel
              id="carousel-fade"
              style="text-shadow: 0px 0px 2px #000"
              fade
              indicators
              controls
            >
              <b-carousel-slide
                v-for="img in product.imageUrl"
                :key="img"
                :img-src="img"
              ></b-carousel-slide>
            </b-carousel>
          </b-modal>
        </div>
        <!-- <div class="product-thumbs">
          <div class="product-thumbs-track ps-slider owl-carousel">
            <div class="pt active" data-imgbigurl="img/product-single/product-1.jpg">
              <img src="img/product-single/product-1.jpg" alt />
            </div>
            <div class="pt" data-imgbigurl="img/product-single/product-2.jpg">
              <img src="img/product-single/product-2.jpg" alt />
            </div>
            <div class="pt" data-imgbigurl="img/product-single/product-3.jpg">
              <img src="img/product-single/product-3.jpg" alt />
            </div>
            <div class="pt" data-imgbigurl="img/product-single/product-3.jpg">
              <img src="img/product-single/product-3.jpg" alt />
            </div>
          </div>
        </div> -->
      </div>
      <div class="col-sm-12 col-md-6">
        <div class="product-details">
          <div class="pd-title">
            <span>{{product.category}}</span>
            <h3>{{product.title}}</h3>
            <a href="#" class="heart-icon">
              <i class="icon_heart_alt"></i>
            </a>
          </div>
          <div class="pd-desc">
            <p>
              {{product.content}}
            </p>
            <div class="d-flex align-items-center">
              <h4>${{product.price}}</h4>
              <del style="font-size: 0.8rem;" class="ml-3 text-muted">${{product.origin_price}}</del>
            </div>
          </div>
          <div class="quantity">
            <!-- <div class="pro-qty">
              <input v-model="quantity" type="number"/>
            </div> -->
            <a v-show="loading" href="#" class="primary-btn">
              <div class="spinner-border text-light" role="status">
                    <span class="sr-only"></span>
                  </div>
                  Loading...
            </a>
            <b-button @click.prevent="addCart" variant="primary" class="btn-block my-3">Add To Cart</b-button>
            <!-- <b-button variant="secondary" class="btn-block my-3">Buy Now</b-button> -->

          </div>
          <ul class="pd-tags">
          </ul>
          <div class="pd-share">
            <div class="pd-social">
              <a href="#">
                <i class="ti-facebook"></i>
              </a>
              <a href="#">
                <i class="ti-twitter-alt"></i>
              </a>
              <a href="#">
                <i class="ti-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <b-alert
      :show="dismissCountDown"
      dismissible
      fade
      variant="warning"
      @dismiss-count-down="countDownChanged"
      class="mt-3"
      style="position:fixed; bottom:70%; right:15%; width: 70%; z-index: 999;"
    >
      已加入購物車
    </b-alert>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
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
      loading: false,
      dismissCountDown: 0
    }
  },
  created () {
    this.getProductDetail()
  },
  methods: {
    getProductDetail () {
      const apiProduct = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/product/${this.id}`
      this.axios.get(apiProduct).then((res) => {
        console.log(res)
        this.product = res.data.data
        this.loading = false
      })
    },
    modifyCount (count) {
      const subtotal = this.quantity + count
      if (subtotal > 0) {
        this.quantity = subtotal
      } else {
        this.quantity = 0
      }
    },
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
        }).then((res) => {
          console.log(res)
          this.showAlert()
          this.getCartList().then((newList) => {
            console.log(newList)
            this.$bus.$emit('show-overlay', false)
          })
        }).catch(err => {
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
