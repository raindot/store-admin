<template>
  <div>
    <b-modal id="confirm-delete" hide-footer>
      <template v-slot:modal-title>
        刪除確認
      </template>
      <div class="d-block text-center">
        <h3>確認刪除這個項目嗎？</h3>
      </div>
      <div class="d-flex justify-content-end">
        <b-button v-show="btnLoading" variant="primary" disabled>
          <b-spinner small></b-spinner>
          <span>Loading...</span>
        </b-button>
        <b-button v-show="!btnLoading" variant="primary" class="mt-3" @click="$bvModal.hide('confirm-delete')">取消</b-button>
        <b-button v-show="!btnLoading" variant="primary" class="mt-3 ml-3" @click="$emit('delete-item')">確定</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: ['btnLoading']
}
</script>
