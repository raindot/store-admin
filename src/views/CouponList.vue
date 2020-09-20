<template>
  <div>
    <dash-board
      @open-modal="openModal"
      @delete-item="deleteCoupon"
      :btn-loading="btnLoading"
      btn-create="新增優惠券"
    >
      <template v-slot:list>
        <list-table
          :items="coupons"
          :columns="columns"
          @open-modal="openModal"
          @comfirm-delete=";(function(){couponIdToBeDelete = $event; $bvModal.show('confirm-delete')})()">
        </list-table>
        <pagination :pagination="pagination" @emit-page="getCoupons"></pagination>
        <coupon-modal
          ref="CouponModal"
          :loading="btnLoading"
          @save-coupon="saveCoupon">
        </coupon-modal>
      </template>
    </dash-board>
  </div>
</template>

<script>
import DashBoard from '@/components/DashBoard.vue'
import ListTable from '@/components/ListTable.vue'
import CouponModal from '@/components/CouponModal.vue'
import Pagination from '@/components/Pagination.vue'
export default {
  data () {
    return {
      api: process.env.VUE_APP_APIPATH,
      UUID: process.env.VUE_APP_UUID,
      coupons: {},
      pagination: {
        total: 0,
        count: 1,
        per_page: 25,
        current_page: 1,
        total_pages: 1,
        links: []
      },
      couponIdToBeDelete: '',
      btnLoading: false,
      columns: [
        {
          name: 'title',
          label: '名稱'
        },
        {
          name: 'percent',
          label: '折扣百分比'
        },
        {
          name: 'deadline',
          label: '到期日'
        }
      ]
    }
  },
  created () {
    this.getCoupons()
  },
  components: {
    DashBoard,
    ListTable,
    CouponModal,
    Pagination
  },
  methods: {
    getCoupons (page = 1) {
      this.$bus.$emit('show-overlay', true)
      const couponsPath = `${this.api}/${this.UUID}/admin/ec/coupons`
      this.axios
        .get(couponsPath, {
          params: {
            page: page,
            paged: 5
          }
        })
        .then((res) => {
          console.log(res.data.data)
          this.coupons = res.data.data
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
    openModal ({ item: coupon, isNew }) {
      this.$bvModal.show('coupon-modal')
      if (isNew) {
        this.$refs.CouponModal.tempCoupon = {
          title: '',
          percent: '',
          deadline_at: '',
          code: '',
          enabled: false
        }
        this.$refs.CouponModal.deadlineDate = ''
        this.$refs.CouponModal.deadlineTime = ''
        this.$refs.CouponModal.isNew = true
      } else {
        this.$refs.CouponModal.isNew = false
        this.$refs.CouponModal.tempCoupon = Object.assign({}, coupon)
        const deadline = coupon.deadline.datetime.split(' ')
        console.log(deadline)
        this.$refs.CouponModal.deadlineDate = deadline[0]
        this.$refs.CouponModal.deadlineTime = deadline[1]
      }
    },
    saveCoupon ({ coupon, isNew }) {
      console.log('save coupon', coupon, isNew)
      this.btnLoading = true
      let apiPath = ''
      let httpMethod = ''
      if (isNew) {
        httpMethod = 'post'
        apiPath = `${this.api}/${this.UUID}/admin/ec/coupon`
      } else {
        httpMethod = 'patch'
        apiPath = `${this.api}/${this.UUID}/admin/ec/coupon/${coupon.id}`
      }
      this.axios({ method: httpMethod, url: apiPath, data: coupon }).then(res => {
        console.log(res)
        this.btnLoading = false
        this.getCoupons()
        this.$bvModal.hide('coupon-modal')
      }).catch(err => {
        console.dir(err)
        this.btnLoading = false
        this.$bvModal.hide('coupon-modal')
        alert('儲存失敗，請洽管理員')
      })
    },
    deleteCoupon () {
      this.btnLoading = true
      const deleteProductPath = `${this.api}/${this.UUID}/admin/ec/coupon/${this.couponIdToBeDelete}`
      this.axios
        .delete(deleteProductPath)
        .then(res => {
          this.$bvModal.hide('confirm-delete')
          this.btnLoading = false
          this.getCoupons()
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
