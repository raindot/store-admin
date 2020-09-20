<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-10">
        <h3 class="font-weight-bold mb-4 pt-3">Checkout</h3>
      </div>
    </div>
    <div class="row flex-row-reverse justify-content-center pb-5">
      <div class="col-md-5">
        <div class="border p-4 mb-4">
          <div v-for="(item, idx) in cartList" :key="idx" class="d-flex">
            <img
              :src="item.product.imageUrl[1]"
              alt
              class="mr-2"
              style="width: 48px; height: 48px; object-fit: cover"
            />
            <div class="w-100">
              <div class="d-flex justify-content-between">
                <p class="mb-0 font-weight-bold">{{item.product.title}}</p>
                <p class="mb-0">NT${{item.product.price}}</p>
              </div>
              <p class="mb-0 font-weight-bold">x{{item.quantity}}</p>
            </div>
          </div>
          <!-- <div class="d-flex mt-2">
            <img
              src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80"
              alt
              class="mr-2"
              style="width: 48px; height: 48px; object-fit: cover"
            />
            <div class="w-100">
              <div class="d-flex justify-content-between">
                <p class="mb-0 font-weight-bold">Lorem ipsum</p>
                <p class="mb-0">NT$12,000</p>
              </div>
              <p class="mb-0 font-weight-bold">x1</p>
            </div>
          </div> -->
          <table class="table mt-4 border-bottom text-muted">
            <tbody>
              <!-- <tr>
                <th scope="row" class="border-0 px-0 pt-4 font-weight-normal">Subtotal</th>
                <td class="text-right border-0 px-0 pt-4">NT$24,000</td>
              </tr> -->
              <tr>
                <th scope="row" class="border-0 px-0 pt-0 pb-4 font-weight-normal">Payment</th>
                <td class="text-right border-0 px-0 pt-0 pb-4">{{orderInfo.payment}}</td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex justify-content-between mt-4">
            <p class="mb-0 h4 font-weight-bold">Total</p>
            <p class="mb-0 h4 font-weight-bold">NT${{total}}</p>
          </div>
        </div>
      </div>
      <div class="col-md-5">
        <validation-observer v-slot="{ invalid }">
          <form @submit.prevent="placeOrder">
            <p>Contact information</p>

            <validation-provider
              immediate
              rules="required"
              class="form-group"
              tag="div"
              v-slot="{ errors, classes }"
            >
              <label for="name">收件人</label>
              <input
                id="name"
                type="text"
                name="收件人姓名"
                v-model="orderInfo.name"
                class="form-control"
                :class="classes"
                required
              />
              <span v-show="invalid" class="invalid-feedback">{{ errors[0] }}</span>
            </validation-provider>
            <validation-provider
              rules="required|email"
              class="form-group"
              tag="div"
              v-slot="{ errors, classes }"
            >
              <label for="email">Email</label>
              <input
                id="email"
                type="email"
                name="E-mail"
                v-model="orderInfo.email"
                class="form-control"
                :class="classes"
              />
              <span v-show="invalid" class="invalid-feedback">{{ errors[0] }}</span>
            </validation-provider>
            <validation-provider
              rules="required"
              class="form-group"
              tag="div"
              v-slot="{ errors, classes }"
            >
              <label for="tel">電話</label>
              <input
                id="tel"
                type="tel"
                name="電話"
                v-model="orderInfo.tel"
                class="form-control"
                :class="classes"
              />
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </validation-provider>
            <validation-provider
              rules="required"
              class="form-group"
              tag="div"
              v-slot="{ errors, classes }"
            >
              <label for="address">收件地址</label>
              <input
                id="address"
                type="text"
                name="收件地址"
                v-model="orderInfo.address"
                class="form-control"
                :class="classes"
              />
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </validation-provider>
            <validation-provider rules="required" class="form-group" tag="div" v-slot="{ errors }">
              <label for="pay">付款方式</label>
              <select id="pay" v-model="orderInfo.payment" class="custom-select">
                <option value="ATM">ATM</option>
                <option value="Credit">信用卡</option>
                <option value="ApplePay">Apple Pay</option>
              </select>
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </validation-provider>
            <div class="form-group">
              <label for="message">留言</label>
              <textarea v-model="orderInfo.message" class="form-control" id="message" rows="3"></textarea>
            </div>
            <!-- <button v-show="loading" class="btn btn-primary" type="button" disabled>
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Loading...
        </button>
            <button v-show="!loading" type="submit" class="btn btn-primary" :disabled="invalid">送出訂單</button>-->
        <div
          class="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end"
        >
          <router-link to="/cart" class="text-dark mt-md-0 mt-3">
            <i class="fas fa-chevron-left mr-2"></i>Back
          </router-link>
          <button type="submit" class="btn btn-dark py-3 px-7">結帳</button>
        </div>
          </form>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orderInfo: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: '',
        message: ''
      },
      cartList: []
    }
  },
  created () {
    this.getCartList().then(list => {
      this.cartList = list
    })
  },
  methods: {
    getCartList () {
      const apiCart = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`
      return new Promise((resolve, reject) => {
        this.axios.get(apiCart).then(res => {
          const newList = res.data.data
          resolve(newList)
        }).catch(err => {
          reject(err)
        })
      })
    },
    placeOrder () {
      const apiOrder = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/orders`
      this.axios.post(apiOrder, this.orderInfo).then(res => {
        console.log(res, 'order created')
        this.$router.push('checkout-success')
      }).catch(err => console.dir(err))
    }
  },
  computed: {
    total () {
      const total = this.cartList.reduce((acc, crr) => {
        return acc + crr.product.price * crr.quantity
      }, 0)
      return total
    }
  }
}
</script>

<style lang="scss">
.is-invalid {
  color: red;
}
</style>
