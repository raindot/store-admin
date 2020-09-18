<template>
  <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 bg-white py-5" style="min-height: calc(100vh - 56px - 76px);">
          <div class="d-flex justify-content-between">
            <h2 class="mt-2">Cart Detail</h2>
          </div>
          <div v-for="(item, idx) in cartList" :key="idx" class="d-flex mt-4 bg-light">
            <img :src="item.product.imageUrl[0]" alt="" style="width: 120px; height: 120px; object-fit: cover;">
            <div class="w-100 p-3 position-relative">
              <a @click.prevent="deleteItem(item)" href="#" class="position-absolute" style="top: 16px; right: 16px;"><i class="fas fa-times"></i></a>
              <p class="mb-0 font-weight-bold">{{item.product.title}}</p>
              <p class="mb-1 text-muted" style="font-size: 14px;">{{item.product.category}}</p>
              <div class="d-flex justify-content-between align-items-center w-100">
                <div class="input-group w-50 align-items-center">
                  <div @click="modifyCount(item, -1)" class="input-group-prepend pr-1">
                    <a href="#"> <i class="fas fa-minus"></i></a>
                  </div>
                  <input v-model="item.quantity" type="text" class="form-control border-0 text-center my-auto shadow-none bg-light px-0" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1">
                  <div @click="modifyCount(item, 1)" class="input-group-append pl-1">
                    <a href="#"><i class="fas fa-plus"></i></a>
                  </div>
                </div>
                <p class="mb-0 ml-auto">NT${{item.product.price}}</p>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between mt-4">
            <p class="mb-0 h4 font-weight-bold">總計</p>
            <p class="mb-0 h4 font-weight-bold">NT${{total}}</p>
          </div>
          <router-link to="/order" class="btn btn-dark btn-block mt-4 rounded-0 py-3">結帳</router-link>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      cartList: [],
      apiCart: `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`
    }
  },
  created () {
    this.getCartList().then(list => {
      this.cartList = list
    })
  },
  methods: {
    getCartList () {
      return new Promise((resolve, reject) => {
        this.axios.get(this.apiCart).then(res => {
          const newList = res.data.data
          const count = res.data.meta.pagination.total
          this.$bus.$emit('updateCart', count)
          resolve(newList)
        }).catch(err => {
          reject(err)
        })
      })
    },
    modifyCount (item, count) {
      const quantity = item.quantity + count
      if (quantity >= 0) {
        this.axios.patch(this.apiCart, {
          product: item.product.id,
          quantity: quantity
        }).then(res => {
          this.getCartList().then(list => {
            this.cartList = list
          })
        })
      }
    },
    deleteItem (item) {
      this.axios.delete(`${this.apiCart}/${item.product.id}`).then(res => {
        this.getCartList().then(list => {
          this.cartList = list
        })
      })
    }
  },
  computed: {
    total () {
      return this.cartList.reduce((acc, crr) => {
        const price = crr.product.price * crr.quantity
        return acc + price
      }, 0)
    }
  }
}
</script>
