<template>
  <div>
    <div v-if="!file_name">
      <input
        ref="input"
        type="file"
        name="image"
        accept="image/*"
        class="custom-file-input"
        style="visibilty:hidden;opacity:0;height:0;width:0"
        @change="setImage"
      />
      <a href="#" @click.prevent="setBrowse">Browse...</a>
    </div>
    <div v-if="file_name">
      <vue-cropper
        ref="cropper"
        :zoomTo="1"
        :modal="false"
        :background="false"
        :aspect-ratio="4 / 4"
        :src="img"
      >
      </vue-cropper>
      <div class="flex items-center mt-4 justify-end">
        <button
          class="bg-teal-500 hover:bg-teal-600
                font-bold py-1 px-4 rounded
                focus:outline-none focus:shadow-outline"
          @click.prevent="cropImage"
          type="button"
        >
          Speichern
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
import { userInfoService } from '../../services/storageService';

export default {
  name: 'UploadPhoto',
  components: {
    VueCropper,
  },
  data() {
    return {
      img: '',
      photoId: '',
      file_name: '',
    }
  },
  computed: {
    ...mapGetters(['getUser']),
  },
  methods: {
    ...mapActions(['setUser']),
    ...mapActions('mainStore', ['upload']),
    cropImage() {
      this.img = this.$refs.cropper.getCroppedCanvas().toDataURL()
      this.dataURLtoFile()
    },
    setBrowse() {
      this.$refs.input.click()
    },
    setImage(e) {
      const file = e.target.files[0]

      this.file_name = file.name
      if (file.type.indexOf('image/') === -1) {
        return
      }
      if (typeof FileReader === 'function') {
        const reader = new FileReader()
        reader.onload = event => {
          this.img = event.target.result
          this.$refs.cropper.replace(event.target.result)
        }
        reader.readAsDataURL(file)
      } else {
        console.error('Sorry, FileReader API not supported')
      }
    },
    dataURLtoFile() {
      fetch(this.img)
        .then(res => res.blob())
        .then(blob => {
          const mime = this.img.split(',')[0].match(/:(.*?);/)[1]
          const file = new File([blob], this.file_name, { type: mime })
          this.handleProfileUpload(file)
        })
    },
    async handleProfileUpload(file) {
      const formData = new FormData()
      formData.append('avatar', file)
      const uploaded = await this.upload({
        url: 'users/changeavatar',
        method: 'PUT',
        data: formData,
      })
      if (uploaded) {
        const user = { ...this.getUser }
        user.avatar = uploaded.avatar
        this.setUser(user)
        userInfoService.saveUser(user);
        this.$emit('onClose')
      }
    },
  },
}
</script>
