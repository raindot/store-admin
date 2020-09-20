<template>
  <div class="container products mt-5">
    <div class="row">
      <div class="col-5">
        <div class="product-pic-zoom">
          <img v-for="(image, idx) in product.imageUrl" :key="idx" class="product-big-img img-fluid" :src="image" alt />
          <div class="zoom-icon">
            <i class="fa fa-search-plus"></i>
          </div>
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
      <div class="col-5">
        <div class="product-details">
          <div class="pd-title">
            <span>{{product.category}}</span>
            <h3>{{product.title}}</h3>
            <a href="#" class="heart-icon">
              <i class="icon_heart_alt"></i>
            </a>
          </div>
          <!-- <div>{{product.options.author}} 著</div> -->
          <!-- <div class="pd-rating">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star-o"></i>
            <span>(5)</span>
          </div> -->
          <div class="pd-desc">
            <p>
              {{product.content}}
            </p>
            <h4>
              ${{product.price}}
              <del>{{product.origin_price}}</del>
            </h4>
          </div>
          <!-- <div class="pd-color">
            <h6>Color</h6>
            <div class="pd-color-choose">
              <div class="cc-item">
                <input type="radio" id="cc-black" />
                <label for="cc-black"></label>
              </div>
              <div class="cc-item">
                <input type="radio" id="cc-yellow" />
                <label for="cc-yellow" class="cc-yellow"></label>
              </div>
              <div class="cc-item">
                <input type="radio" id="cc-violet" />
                <label for="cc-violet" class="cc-violet"></label>
              </div>
            </div>
          </div> -->
          <!-- <div class="pd-size-choose">
            <div class="sc-item">
              <input type="radio" id="sm-size" />
              <label for="sm-size">pdf</label>
            </div>
            <div class="sc-item">
              <input type="radio" id="md-size" />
              <label for="md-size">epub</label>
            </div>
            <div class="sc-item">
              <input type="radio" id="lg-size" />
              <label for="lg-size">mobi</label>
            </div>
          </div> -->
          <div class="quantity">
            <div class="pro-qty">
              <input v-model="quantity" type="text"/>
            </div>
            <a v-show="loading" href="#" class="primary-btn">
              <div class="spinner-border text-light" role="status">
                    <span class="sr-only"></span>
                  </div>
                  Loading...
            </a>
            <button v-show="!loading" @click.prevent="addCart" href="#" class="btn btn-dark btn-block py-2">Add To Cart</button>

          </div>
          <ul class="pd-tags">
            <!-- <li>
              <span>CATEGORIES</span>: More Accessories, Wallets & Cases
            </li> -->
            <!-- <li>
              <span>TAGS</span>:Learning
            </li> -->
          </ul>
          <div class="pd-share">
            <!-- <div class="p-code">Sku : 00012</div> -->
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
    <!-- <div class="container">
      <div class="row">
        <div class="col-md-4 agileinfo_single_left">
          <img id="example" :src="product.imageUrl[0]" alt=" " class="img-fluid" />
        </div>
        <div class="col-md-8 agileinfo_single_right">
          <h2>{{product.title}}</h2>
          <div class="rating1">
            <span class="starRating">
              <input id="rating5" type="radio" name="rating" value="5" />
              <label for="rating5">5</label>
              <input id="rating4" type="radio" name="rating" value="4" />
              <label for="rating4">4</label>
              <input id="rating3" type="radio" name="rating" value="3" checked />
              <label for="rating3">3</label>
              <input id="rating2" type="radio" name="rating" value="2" />
              <label for="rating2">2</label>
              <input id="rating1" type="radio" name="rating" value="1" />
              <label for="rating1">1</label>
            </span>
          </div>
          <div class="w3agile_description">
            <h4>Description :</h4>
            <p>
              {{product.description}}
            </p>
          </div>
          <div class="snipcart-item block">
            <div class="snipcart-thumb agileinfo_single_right_snipcart">
              <h4 class="m-sing">
                ${{product.price}}
                <span>${{product.origin_price}}</span>
              </h4>
            </div>
            <div class="snipcart-details d-flex align-items-center">
              <div class="flex-fill">
                <button @click="modifyCount(-1)" class="btn btn-outline-primary btn-sm">-</button>
                <span class="px-2">{{ quantity }}</span>
                <button @click="modifyCount(1)" class="btn btn-outline-primary btn-sm">+</button>
              </div>
              <input @click="addCart" style="width: 150px" type="submit" name="submit" value="Add to cart" class="button" />
            </div>
          </div>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>-->
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
      this.loading = true
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
            this.loading = false
          })
        }).catch(err => {
          this.showAlert()
          this.loading = false
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
            const count = res.data.meta.pagination.total
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
