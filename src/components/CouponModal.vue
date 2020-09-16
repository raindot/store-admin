<template>
  <b-modal id="coupon-modal" hide-footer>
    <template v-slot:modal-title>
      {{isNew? '新增優惠券': '編輯優惠券'}}
    </template>
      <div class="modal-content">
        <div class="modal-body">
          <div class="form-group">
            <label for="title">標題</label>
            <input
              id="title"
              v-model="tempCoupon.title"
              type="text"
              class="form-control"
              placeholder="請輸入標題"
              required
            />
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="code">優惠碼</label>
              <input
                id="code"
                v-model="tempCoupon.code"
                type="text"
                class="form-control"
                placeholder="請輸入優惠碼"
                required
              />
            </div>
            <div class="form-group col-md-6">
              <label for="percent">折扣百分比</label>
              <input
                id="percent"
                v-model="tempCoupon.percent"
                type="number"
                class="form-control"
                placeholder="折扣百分比"
                required
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="deadlineDate">到期日</label>
              <input
                id="deadlineDate"
                v-model="deadlineDate"
                type="date"
                class="form-control"
                placeholder="到期日"
                required
              />
            </div>
            <div class="form-group col-md-6">
              <label for="deadlineTime">到期時間</label>
              <input
                id="deadlineTime"
                v-model="deadlineTime"
                type="time"
                class="form-control"
                placeholder="到期日"
                required
                step="1"
              />
            </div>
          </div>
          <hr />
          <div class="form-group">
            <div class="form-check">
              <input
                id="enabled"
                v-model="tempCoupon.enabled"
                class="form-check-input"
                type="checkbox"
              />
              <label class="form-check-label" for="enabled">是否啟用</label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            :disabled="loading"
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="$bvModal.hide('coupon-modal')"
          >取消</button>
          <button v-if="loading" type="button" class="btn btn-primary">
            <i class="fas fa-spinner fa-spin"/>
            儲存中...
          </button>
          <button v-else @click="saveCoupon" type="button" class="btn btn-primary">確認</button>
        </div>
      </div>
  </b-modal>
</template>

<script>
export default {
  props: ['loading'],
  data: function () {
    return {
      deadlineDate: '',
      deadlineTime: '',
      tempCoupon: {
        title: '',
        percent: '',
        deadline_at: '',
        code: '',
        enabled: false
      },
      isNew: false
    }
  },
  created () {},
  methods: {
    saveCoupon () {
      this.$set(this.tempCoupon, 'deadline_at', this.deadline_at)
      this.$emit('save-coupon', {
        coupon: this.tempCoupon,
        isNew: this.isNew
      })
    }
  },
  computed: {
    deadline_at () {
      return this.deadlineDate + ' ' + this.deadlineTime
    }
  }
}
</script>
