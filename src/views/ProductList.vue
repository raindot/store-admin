<template>
  <div>
    <!-- <div class="position-relative d-flex align-items-center justify-content-center" style="min-height: 400px;">
      <div class="position-absolute" style="top:0; bottom: 0; left: 0; right: 0; background-image: url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80); background-position: center center; opacity: 0.1;"></div>
      <h2 class="font-weight-bold">Lorem ipsum.</h2>
    </div> -->
    <div class="container mt-md-5 mt-3 mb-7">
      <div class="row">
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
        <div class="col-md-10">
          <div class="row">
            <div v-for="product in products" :key="product.id" class="col-md-6">
              <div @click="goDetail(product.id)" class="cursor-pointer card border-0 mb-4 position-relative position-relative">
                <img :src="product.imageUrl[1]" class="card-img-top rounded-0" alt="...">
                <a href="#" class="text-dark">
                  <!-- <i class="far fa-heart position-absolute" style="right: 16px; top: 16px"></i> -->
                </a>
                <div class="card-body p-0">
                  <h4 class="mb-0 mt-3"><router-link :to="`/product-detail/${product.id}`">{{product.title}}</router-link></h4>
                  <p class="card-text mb-0">NT${{product.price}} <span class="text-muted "><del>NT${{product.origin_price}}</del></span></p>
                  <p class="text-muted mt-3"></p>
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
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      products: {},
      loading: false,
      click: null,
      dismissCountDown: 0
    }
  },
  created () {
    this.getProducts()
  },
  methods: {
    getProducts () {
      this.loading = true
      const apiProducts = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products`
      this.axios.get(apiProducts).then((res) => {
        this.products = res.data.data
        this.loading = false
      })
    },
    goDetail (id) {
      this.$router.push(`product-detail/${id}`)
    },
    addCart (id, idx) {
      this.loading = true
      this.click = idx
      const apiAddCart = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`
      this.axios
        .post(apiAddCart, {
          product: id,
          quantity: 1
        })
        .then((res) => {
          console.log(res)
          this.loading = false
        }).catch(err => {
          this.loading = false
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
    }
  }
}
</script>

<style lang="scss">
  .cursor-pointer {
    cursor: pointer;
  }
</style>
