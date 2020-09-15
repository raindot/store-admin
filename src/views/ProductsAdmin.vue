<template>
  <div>
    <dash-board
      @open-modal="openModal"
      @delete-item="deleteProduct"
      :loading="loading"
      :btn-loading="btnLoading"
      btn-create="新增產品"
    >
      <template v-slot:list>
        <list-table
          :items="products"
          :columns="columns"
          @open-modal="openModal"
          @comfirm-delete=";(function(){productIdToBeDelete = $event; $bvModal.show('confirm-delete')})()">
        </list-table>
        <pagination :pagination="pagination" @emit-page="getProducts"></pagination>
        <product-modal
          ref="productModal"
          :loading="loading"
          @save-product="saveProduct">
        </product-modal>
      </template>
    </dash-board>
    <!-- <div class="container mt-3">
      <div v-if="loading" class="d-flex">
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
          <b-button v-show="btnLoading" variant="primary" disabled>
            <b-spinner small></b-spinner>
            <span>Loading...</span>
          </b-button>
          <b-button v-show="!btnLoading" variant="primary" class="mt-3" @click="$bvModal.hide('confirm-delete')">取消</b-button>
          <b-button v-show="!btnLoading" variant="primary" class="mt-3 ml-3" @click="deleteProduct">確定</b-button>
        </div>
      </b-modal>
    </div> -->
  </div>
</template>

<script>
import DashBoard from '@/components/DashBoard.vue'
import ListTable from '@/components/ListTable.vue'
import ProductModal from '@/components/ProductModal.vue'
// import Products from '@/components/Products.vue'
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
      productIdToBeDelete: '',
      btnLoading: false,
      loading: false,
      columns: [
        {
          name: 'category',
          label: '分類'
        },
        {
          name: 'title',
          label: '產品名稱'
        },
        {
          name: 'origin_price',
          label: '原價'
        },
        {
          name: 'price',
          label: '售價'
        }
      ]
    }
  },
  created () {
    this.getProducts()
  },
  components: {
    DashBoard,
    ListTable,
    ProductModal,
    Pagination
  },
  methods: {
    getProducts (page = 1) {
      this.loading = true
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
          this.loading = false
        })
        .catch(err => {
          console.dir(err)
          if (err.request.status === 401) {
            alert('請先登入')
          }
          this.loading = false
        })
    },
    openModal ({ item: product, isNew }) {
      this.$bvModal.show('product-modal')
      if (isNew) {
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
      this.btnLoading = true
      const deleteProductPath = `${this.api}/${this.UUID}/admin/ec/product/${this.productIdToBeDelete}`
      this.axios
        .delete(deleteProductPath)
        .then(res => {
          this.$bvModal.hide('confirm-delete')
          this.btnLoading = false
          this.getProducts()
        })
        .catch(err => {
          this.$bvModal.hide('confirm-delete')
          this.btnLoading = false
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
