<template>
  <div class="container mt-3">
    <div v-if="getingData" class="d-flex">
      <div class="spinner-border mx-auto" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else class="col mx-auto text-center mx-auto">
      <div class="text-right">
        <button @click="openModal(null, 'isNew')" class="add-new-product btn btn-primary" data-toggle="modal" data-target="#product-modal">新增商品</button>
      </div>
      <products
        :products="products"
        @open-modal="openModal"
        @delete-product=";(function(){productIdToBeDelete = $event; $bvModal.show('confirm-delete')})()">
      </products>
      <pagination :pagination="pagination" @emit-page="getProducts"></pagination>
    </div>
    <product-modal
      ref="productModal"
      :loading="loading"
      @save-product="saveProduct">
    </product-modal>
    <b-modal id="confirm-delete" hide-footer>
      <template v-slot:modal-title>
        刪除確認
      </template>
      <div class="d-block text-center">
        <h3>確認刪除這個商品嗎？</h3>
      </div>
      <div class="d-flex justify-content-end">
        <b-button v-show="deleting" variant="primary" disabled>
          <b-spinner small></b-spinner>
          <span>Loading...</span>
        </b-button>
        <b-button v-show="!deleting" variant="primary" class="mt-3" @click="$bvModal.hide('confirm-delete')">取消</b-button>
        <b-button v-show="!deleting" variant="primary" class="mt-3 ml-3" @click="deleteProduct">確定</b-button>
      </div>
    </b-modal>
    <!-- <confirm-delete :deleting="deleting" @cancel-delete="productToBeDelete = ''" @delete-product="deleteProduct"></confirm-delete> -->
  </div>
</template>

<script>
import ProductModal from '@/components/ProductModal.vue'
import Products from '@/components/Products.vue'
import Pagination from '@/components/Pagination.vue'
export default {
  data () {
    return {
      api: process.env.VUE_APP_APIPATH,
      UUID: process.env.VUE_APP_UUID,
      products: {},
      pagination: {
        total: 0,
        count: 1,
        per_page: 25,
        current_page: 1,
        total_pages: 1,
        links: []
      },
      getingData: false,
      productIdToBeDelete: '',
      deleting: false,
      loading: false
    }
  },
  created () {
    this.getProducts()
  },
  components: {
    Products,
    ProductModal,
    Pagination
  },
  methods: {
    getProducts (page = 1) {
      this.getingData = true
      const productsPath = `${this.api}/${this.UUID}/admin/ec/products`
      this.axios
        .get(productsPath, {
          params: {
            page: page,
            paged: 5
          }
        })
        .then((res) => {
          console.log(res.data.meta.pagination)
          this.products = res.data.data
          this.pagination = res.data.meta.pagination
          this.getingData = false
        })
        .catch(err => {
          console.dir(err)
          if (err.request.status === 401) {
            alert('請先登入')
          }
          this.getingData = false
        })
    },
    openModal (product, isNew) {
      this.$bvModal.show('product-modal')
      if (isNew === 'isNew') {
        this.$refs.productModal.tempProduct = {
          title: '',
          category: '',
          unit: '',
          origin_price: '',
          price: '',
          content: '',
          description: '',
          imageUrl: ['']
        }
        this.$refs.productModal.isNew = true
      } else {
        this.$refs.productModal.isNew = false
        this.$refs.productModal.tempProduct = Object.assign({}, product)
      }
    },
    saveProduct ({ product, isNew }) {
      this.loading = true
      let apiPath = ''
      let httpMethod = ''
      if (isNew) {
        httpMethod = 'post'
        apiPath = `${this.api}/${this.UUID}/admin/ec/product`
      } else {
        httpMethod = 'patch'
        apiPath = `${this.api}/${this.UUID}/admin/ec/product/${product.id}`
      }
      this.axios({ method: httpMethod, url: apiPath, data: product }).then(res => {
        // $('#product-modal').modal('hide')
        this.loading = false
        this.getProducts()
        this.$bvModal.hide('product-modal')
      }).catch(err => {
        console.log(err)
        this.loading = false
        this.$bvModal.hide('product-modal')
        alert('儲存失敗，請洽管理員')
      })
    },
    deleteProduct () {
      this.deleting = true
      const deleteProductPath = `${this.api}/${this.UUID}/admin/ec/product/${this.productIdToBeDelete}`
      this.axios
        .delete(deleteProductPath)
        .then(res => {
          this.$bvModal.hide('confirm-delete')
          this.deleting = false
          this.getProducts()
        })
        .catch(err => {
          this.$bvModal.hide('confirm-delete')
          this.deleting = false
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss">
  .pointer {
    cursor: pointer;
  }
</style>
