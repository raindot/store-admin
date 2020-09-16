<template>
  <div class="orders">
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">下單時間</th>
          <th scope="col">購買項目</th>
          <th scope="col">付款方式</th>
          <th scope="col">應付金額</th>
          <th scope="col">是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td scope="row">{{order.created.datetime}}</td>
          <td scope="row">
            <div v-for="(product, idx) in order.products" :key="idx">
              <span class="badge badge-pill badge-light">{{product.product.title}}</span>
              <span>x {{product.quantity}}</span>
            </div>
          </td>
          <td scope="row">{{order.payment}}</td>
          <td scope="row">{{order.amount}}</td>
          <td scope="row">
            <div class="custom-control custom-switch">
              <input type="checkbox" :checked="order.paid" @change="updateOrder(order, $event)" class="custom-control-input" :id="`pay-status${order.id}`">
              <label class="custom-control-label" :for="`pay-status${order.id}`">{{order.paid ? '已付款': '尚未付款'}}</label>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      api: process.env.VUE_APP_APIPATH,
      UUID: process.env.VUE_APP_UUID,
      orders: [],
      pagination: {
        total: 0,
        count: 1,
        per_page: 25,
        current_page: 1,
        total_pages: 1,
        links: []
      }
    }
  },
  created () {
    this.getOrders()
  },
  methods: {
    getOrders (page = 1) {
      this.$bus.$emit('show-overlay', true)
      const ordersPath = `${this.api}/${this.UUID}/admin/ec/orders`
      this.axios
        .get(ordersPath, {
          params: {
            page: page,
            paged: 5
          }
        })
        .then((res) => {
          console.log(res.data)
          this.orders = res.data.data
          this.pagination = res.data.meta.pagination
          this.$bus.$emit('show-overlay', false)
        })
        .catch((err) => {
          console.dir(err)
          this.$bus.$emit('show-overlay', false)
        })
    },
    updateOrder (order, event) {
      console.dir(order)
      console.dir(event)
      const isPaid = event.target.checked ? 'paid' : 'unpaid'
      const updatePayPath = `${this.api}/${this.UUID}/admin/ec/orders/${order.id}/${isPaid}`
      this.axios.patch(updatePayPath).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
