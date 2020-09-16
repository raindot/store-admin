<template>
  <div class="container mt-3">
    <div class="col mx-auto text-center mx-auto">
      <div class="text-right">
        <button @click="$emit('open-modal', { item: null, isNew: true})" class="add-new-product btn btn-primary" data-toggle="modal" data-target="#product-modal">
          {{btnCreate}}
        </button>
      </div>
      <slot name="list"></slot>
    </div>
    <confirm-delete :btnLoading="btnLoading" @delete-item="$emit('delete-item')"></confirm-delete>
  </div>
</template>

<script>
import ConfirmDelete from '@/components/ConfirmDelete.vue'

export default {
  props: ['btnLoading', 'btnCreate'],
  components: {
    ConfirmDelete
  }
}
</script>
