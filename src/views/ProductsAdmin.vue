<template>
  <div>
    <dash-board
      @open-modal="openModal"
      @delete-item="deleteProduct"
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
          :loading="btnLoading"
          @save-product="saveProduct">
        </product-modal>
      </template>
    </dash-board>
  </div>
</template>

<script>
import DashBoard from '@/components/DashBoard.vue'
import ListTable from '@/components/ListTable.vue'
import ProductModal from '@/components/ProductModal.vue'
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
      this.$bus.$emit('show-overlay', true)
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
          this.$bus.$emit('show-overlay', false)
        })
        .catch(err => {
          console.dir(err)
          if (err.request.status === 401) {
            alert('請先登入')
          }
          this.$bus.$emit('show-overlay', false)
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
      this.btnLoading = true
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
        this.$refs.productModal.isNew = false
        this.btnLoading = false
        this.getProducts()
        this.$bvModal.hide('product-modal')
      }).catch(err => {
        console.log(err)
        this.$refs.productModal.isNew = false
        this.btnLoading = false
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
