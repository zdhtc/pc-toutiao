<template>
  <div style="display: inline-block;">
    <!-- <el-upload
    class="avatar-uploader"
    action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
    :show-file-list="false"
  >
    <img v-if="image" :src="image" alt="" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload> -->
  <div class="avatar-uploader" @click="loadImages()">
    <img v-if="value" :src="value" alt="" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </div>
  <!-- 对话框 -->
  <el-dialog
    :visible.sync="dialogVisible"
    width="50%"
    center
  >
    <template>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="material">
          <el-radio-group v-model="activeType" style="margin-bottom: 20px" @change="onFilter">
            <el-radio-button label="all">全部</el-radio-button>
            <el-radio-button label="collect">收藏</el-radio-button>
          </el-radio-group>
          <el-row :gutter="20">
            <el-col
              :span="8"
              v-for="(item, index) in images"
              :key="item.id"
              :class="{activeItem: activeIndex === index, item}"
              @click.native="activeIndex = index"
            >
              <img :src="item.url" alt="" height="200">
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="uploadHeaders"
            name="image"
            list-type="picture-card"
            :on-preview="onPreview"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
    </template>
    <span slot="footer" class>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button @click="onSelect" type="primary">确定</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'uploadAvatar',
  data () {
    return {
      dialogVisible: false,
      activeName: 'material',
      activeType: 'all',
      activeIndex: '',
      images: [],
      uploadHeaders: {
        Authorization: `Bearer ${window.localStorage.getItem('toutiao-token')}`
      },
      previewImage: ''
    }
  },
  props: {
    value: {
      type: String
    }
  },
  methods: {
    loadImages (isCollect = false) {
      this.dialogVisible = true
      this.$axios({
        method: 'get',
        url: '/user/images',
        params: {
          collect: isCollect // 是否获取收藏图片
        }
      }).then(res => {
        this.images = res.data.data.results
      }).catch(err => {
        console.log(err)
      })
    },

    onFilter () {
      this.loadImages(this.activeType === 'collect')
    },

    onSelect () {
      if (this.activeName === 'material') {
        const img = this.images[this.activeIndex]
        img && this.$emit('input', img.url)
      } else if (this.activeName === 'upload') {
        this.$emit('input', this.previewImage)
      }
      this.dialogVisible = false
    },

    onPreview (file) {
      this.previewImage = file.response.data.url
    }
  }

}
</script>

<style lang="less" scoped>
.activeItem{
  border: 1px dashed red;
}
.item{
  padding: 10px;
  overflow: hidden;
  box-sizing: border-box;
}
.avatar-uploader{
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  width: 178px;
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
