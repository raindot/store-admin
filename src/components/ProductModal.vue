<template>
  <b-modal id="product-modal" hide-footer>
    <template v-slot:modal-title>
      {{isNew? '新增產品': '編輯產品'}}
    </template>
      <div class="modal-content">
        <div class="modal-body">
          <div class="form-group">
            <label for="title">標題</label>
            <input
              id="title"
              v-model="tempProduct.title"
              type="text"
              class="form-control"
              placeholder="請輸入標題"
              required
            />
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="category">分類</label>
              <input
                id="category"
                v-model="tempProduct.category"
                type="text"
                class="form-control"
                placeholder="請輸入分類"
                required
              />
            </div>
            <div class="form-group col-md-6">
              <label for="price">單位</label>
              <input
                id="unit"
                v-model="tempProduct.unit"
                type="text"
                class="form-control"
                placeholder="請輸入單位"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="origin_price">原價</label>
              <input
                id="origin_price"
                v-model="tempProduct.origin_price"
                type="number"
                class="form-control"
                placeholder="請輸入原價"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="price">售價</label>
              <input
                id="price"
                v-model="tempProduct.price"
                type="number"
                class="form-control"
                placeholder="請輸入售價"
              />
            </div>
          </div>
          <hr />
          <div class="form-group">
            <label for="description">產品說明</label>
            <textarea
              id="description"
              v-model="tempProduct.description"
              type="text"
              class="form-control"
              placeholder="請輸入產品說明"
              required
            ></textarea>
          </div>
          <div class="form-group">
            <label for="content">產品描述</label>
            <textarea
              id="content"
              v-model="tempProduct.content"
              type="text"
              class="form-control"
              placeholder="請輸入產品描述"
              required
            ></textarea>
          </div>
          <div class="form-group">
              <label for="image-url">產品圖片網址</label>
              <input
                id="image-url"
                v-model="tempProduct.imageUrl[0]"
                type="text"
                class="form-control"
                placeholder="產品圖片"
                required
              />
          </div>
          <div class="form-group">
            <label for="customFile">
              或 上傳圖片
              <i
                v-if="fileUploading"
                class="fas fa-spinner fa-spin"
              />
            </label>
            <input
              id="customFile"
              ref="upload"
              type="file"
              class="form-control"
              @change="uploadFile"
            >
          </div>
          <div v-for="(img, idx) in tempProduct.imageUrl"
              :key="img"
              class="px-2 py-2 mx-2 my-2 d-inline-block position-relative border">
            <b-button pill variant="danger" @click="deleteImage(idx)" class="text-light px-2 py-1 position-absolute" style="left: 10px; bottom: 10px; z-index: 1000;" size="sm"><i class="fas fa-trash-alt"></i></b-button>
            <img
              class="col-md-6 img-fluid"
              :src="img"
            >
          </div>
          <div class="form-group">
            <div class="form-check">
              <input
                id="enabled"
                v-model="tempProduct.enabled"
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
            @click="(function(){$bvModal.hide('product-modal'); $emit('hide-modal')}())"
          >取消</button>
          <button v-if="loading" type="button" class="btn btn-primary">
            <i class="fas fa-spinner fa-spin"/>
            儲存中...
          </button>
          <button v-else @click="saveProduct" type="button" class="btn btn-primary">確認</button>
        </div>
      </div>
    <!-- </div> -->
  </b-modal>
  <!-- </div> -->
</template>

<script>
export default {
  props: ['loading'],
  data: function () {
    return {
      tempProduct: {
        title: '',
        category: '',
        unit: '',
        origin_price: '',
        price: '',
        content: '',
        description: '',
        imageUrl: []
      },
      isNew: false,
      fileUploading: false
    }
  },
  created () {},
  methods: {
    saveProduct () {
      this.$emit('save-product', {
        product: this.tempProduct,
        isNew: this.isNew
      })
    },
    uploadFile () {
      const uploadedFile = this.$refs.upload.files[0]
      const formData = new FormData()
      formData.append('file', uploadedFile)
      const uploadPath = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/storage`
      this.fileUploading = true

      this.axios.post(uploadPath, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        this.fileUploading = false

        if (res.status === 200) {
          if (!this.tempProduct.imageUrl[0]) {
            this.$set(this.tempProduct.imageUrl, '0', res.data.data.path)
          } else {
            this.tempProduct.imageUrl.push(res.data.data.path)
          }
        }
      }).catch((err) => {
        console.log(err)
        // alert('上傳失敗，檔案大小不能超過2MB')
        this.status.fileUploading = false
      })
    },
    deleteImage (idx) {
      this.tempProduct.imageUrl.splice(idx, 1)
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
