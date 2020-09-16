<template>
  <div class="files">
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">圖片縮圖</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="file in storage" :key="file.id">
          <td scope="row">
            <img :src="file.path" alt="" style="width: 150px;">
          </td>
          <td scope="row">
            <button @click=";(function(){fileIdToDelete = file.id; $bvModal.show('confirm-delete')})()" data-toggle="modal" data-target="#confirm-delete" type="button" class="btn btn-outline-danger btn-sm">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :pagination="pagination" @emit-page="getFiles"></pagination>
    <confirm-delete :btnLoading="btnLoading" @delete-item="deleteFile"></confirm-delete>
  </div>
</template>

<script>
import ConfirmDelete from '@/components/ConfirmDelete.vue'
import Pagination from '@/components/Pagination.vue'

export default {
  data () {
    return {
      api: process.env.VUE_APP_APIPATH,
      UUID: process.env.VUE_APP_UUID,
      storage: [],
      pagination: {
        total: 0,
        count: 1,
        per_page: 5,
        current_page: 1,
        total_pages: 1,
        links: []
      },
      btnLoading: false,
      fileIdToDelete: ''
    }
  },
  created () {
    this.getFiles()
  },
  components: {
    ConfirmDelete,
    Pagination
  },
  methods: {
    getFiles (page = 1) {
      this.$bus.$emit('show-overlay', true)
      const storagePath = `${this.api}/${this.UUID}/admin/storage`
      this.axios
        .get(storagePath, {
          params: {
            page: page,
            paged: 5
          }
        })
        .then((res) => {
          console.log(res.data)
          this.storage = res.data.data
          this.pagination = res.data.meta.pagination
          this.$bus.$emit('show-overlay', false)
        })
        .catch((err) => {
          console.dir(err)
          this.$bus.$emit('show-overlay', false)
        })
    },
    deleteFile () {
      this.btnLoading = true
      const deletePath = `${this.api}/${this.UUID}/admin/storage/${this.fileIdToDelete}`
      this.axios
        .delete(deletePath)
        .then(res => {
          this.$bvModal.hide('confirm-delete')
          this.btnLoading = false
          this.getFiles()
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
