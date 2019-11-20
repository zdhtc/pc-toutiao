<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>素材管理</span>
      <el-upload
        style="float: right;padding: 3px 0"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="uploadHeader"
        name="image"
        :on-success="onUploadSuccess"
        :show-file-list="true"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </div>
    <div>
      <el-radio-group v-model="type" @change="onFilter" style="margin-bottom: 20px">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="收藏"></el-radio-button>
      </el-radio-group>
      <el-row :gutter="10">
        <el-col
          :xs="24" :sm="12" :md="6"
          v-for="item in images"
          :key="item.id"
          class="col-item"
        >
          <el-card :body-style="{padding: '20px'}">
            <img :src="item.url" height="200" alt="">
            <div class="action">
              <i
                :class="{
                  'el-icon-star-on': item.is_collected,
                  'el-icon-star-off': !item.is_collected
                }"
                @click="isCollect(item)"
              ></i>
              <i class="el-icon-delete-solid" @click="onDelete(item)"></i>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'material',
  data () {
    return {
      images: [],
      type: '全部',
      uploadHeader: {
        Authorization: `Bearer ${window.localStorage.getItem('toutiao-token')}`
      }
    }
  },
  created () {
    this.loadImages()
  },
  methods: {
    loadImages (isCollect = false) {
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
      this.loadImages(this.type === '收藏')
    },

    isCollect (item) {
      this.$axios({
        method: 'put',
        url: `user/images/${item.id}`,
        data: {
          collect: !item.is_collected
        }
      }).then(res => {
        this.$message({
          type: 'success',
          message: '操作成功'
        })
        // 更新视图显示
        item.is_collected = !item.is_collected
      }).catch(() => {
        this.$message.error('操作失败')
      })
    },

    onDelete (item) {
      this.$confirm('你确认要删除此条收藏', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确认删除
        this.$axios({
          method: 'DELETE',
          url: `/user/images/${item.id}`
        }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        }).catch(() => {
          this.$message.error('删除失败')
          this.loadImages(this.type === '收藏')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    },

    onUploadSuccess () {
      this.loadImages(this.type === '收藏')
    }
  }

}
</script>

<style lang="less" scoped>
.action{
  display: flex;
  justify-content: space-around;
  padding: 15px 0;
  font-size: 22px;
}
</style>
