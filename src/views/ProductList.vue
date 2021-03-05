<template>
  <div class="mb-5">
    <!-- <div class="position-relative d-flex align-items-center justify-content-center" style="min-height: 400px;">
      <div class="position-absolute" style="top:0; bottom: 0; left: 0; right: 0; background-image: url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80); background-position: center center; opacity: 0.1;"></div>
      <h2 class="font-weight-bold">Lorem ipsum.</h2>
    </div> -->
    <div class="container mt-md-5 mt-3 mb-7">
      <h5>
        <span v-for="(term, idx) in filter" :key="idx">
          <span @click="filterTerm = term" class="cursor-pointer" :class="filterTerm === term ? 'text-primary': 'text-muted'">{{term}}</span>
          <span v-show="(idx + 1) < filter.length"> | </span>
        </span>
      </h5>
      <!-- <div class="col-md-4">
          <div class="accordion border border-bottom border-top-0 border-left-0 border-right-0 mb-3" id="accordionExample">
            <div class="card border-0">
              <div class="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-left-0 border-right-0" id="headingOne" data-toggle="collapse" data-target="#collapseOne">
                <div class="d-flex justify-content-between align-items-center pr-1">
                  <h4 class="mb-0">
                    Lorem ipsum
                  </h4>
                  <i class="fas fa-chevron-down"></i>
                </div>
              </div>
              <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div class="card-body py-0">
                  <ul class="list-unstyled">
                    <li><a href="#" class="py-2 d-block text-muted">Lorem ipsum</a></li>
                    <li><a href="#" class="py-2 d-block text-muted">Lorem ipsum</a></li>
                    <li><a href="#" class="py-2 d-block text-muted">Lorem ipsum</a></li>
                    <li><a href="#" class="py-2 d-block text-muted">Lorem ipsum</a></li>
                    <li><a href="#" class="py-2 d-block text-muted">Lorem ipsum</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div> -->
      <div class="row">
        <div v-for="product in filteredList" :key="product.id" class="col-md-6 col-lg-4">
          <div
            @click="goDetail(product.id)"
            class="cursor-pointer card border-0 mb-4 position-relative position-relative"
          >

            <b-img-lazy
              :src="product.imageUrl[0]"
              v-bind="mainProps"
              class="card-img-top rounded-0"
              alt="..."
            ></b-img-lazy>
            <a href="#" class="text-dark">
              <!-- <i class="far fa-heart position-absolute" style="right: 16px; top: 16px"></i> -->
            </a>
            <div class="card-body p-0">
              <h4 class="mb-0 mt-3">
                <router-link :to="`/product-detail/${product.id}`">{{
                  product.title
                }}</router-link>
              </h4>
              <p class="card-text mb-0">
                NT${{ product.price }}
                <span class="text-muted"
                  ><del style="font-size: 0.6rem"
                    >NT${{ product.origin_price }}</del
                  ></span
                >
              </p>
              <h6 class="text-muted">{{product.category}}</h6>

              <p class="text-muted mt-3">
                {{ chunckdContent(product.content) }}
              </p>
              <p class="d-flex justify-content-between">
                <b-button
                  href="#"
                  variant="primary"
                  @click="goDetail(product.id)"
                  >Detail</b-button
                >
                <b-button variant="light"
                  ><i class="fas fa-cart-plus"></i
                ></b-button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- <nav class="d-flex justify-content-center">
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li class="page-item active"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav> -->
    </div>
  </div>
</template>

<script>
export default {
  props: ['category'],
  data () {
    return {
      products: [],
      loading: false,
      click: null,
      dismissCountDown: 0,
      mainProps: {
        center: true,
        fluidGrow: true,
        blank: true,
        blankColor: '#bbb',
        width: 600,
        height: 600,
        class: 'my-2'
      },
      filter: ['All', '蛋糕', '小點', '常溫點心'],
      filterTerm: 'All'
    }
  },
  created () {
    this.getProducts().then(data => {
      this.products = data
      if (this.category) this.filterTerm = this.category
    })
  },
  methods: {
    getProducts () {
      this.$bus.$emit('show-overlay', true)
      const apiProducts = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products`
      return new Promise((resolve, reject) => {
        this.axios.get(apiProducts).then((res) => {
          console.log(res.data.data)
          this.$bus.$emit('show-overlay', false)
          resolve(res.data.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    goDetail (id) {
      this.$router.push(`/product-detail/${id}`)
    },
    addCart (id, idx) {
      this.$bus.$emit('show-overlay', true)
      this.click = idx
      const apiAddCart = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`
      this.axios
        .post(apiAddCart, {
          product: id,
          quantity: 1
        })
        .then((res) => {
          console.log(res)
          this.$bus.$emit('show-overlay', false)
        })
        .catch((err) => {
          this.$bus.$emit('show-overlay', false)
          console.log(err)
          this.showAlert()
        })
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = 2
    },
    loadingBtn (idx) {
      return this.loading && this.click === idx
    },
    chunckdContent (content) {
      return content.substring(0, 100) + '...'
    }
  },
  computed: {
    filteredList () {
      if (this.filterTerm === 'All') {
        return this.products
      } else {
        return this.products.filter(product => {
          return product.category === this.filterTerm
        })
      }
    }
  }
}
</script>

<style lang="scss">
.cursor-pointer {
  cursor: pointer;
}
</style>
