<template>
  <div class="container wrap">
    <header class="header">
      <div class="bg-color">
        <span class="title" slot="overwrite-left">{{activityInfo.Name}}</span>
      </div>
    </header>
    <section class="main-details">
      <div class="image-text">
        <div class="details">
          <div v-html="activityInfo.Description" class="picture"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        //图文id
        id: 0,
        //活动图文信息
        activityInfo: {},
      }
    },
    mounted() {
      this.initDetailList();
    },
    methods: {
      //初始化详情列表
      initDetailList() {
        this.id = this.$route.params.id;
        this.$http('/mobile/api/activitydetail', {id: this.id}, (ret) => {
          if (ret.status) {
            this.activityInfo = ret.data;
          } else {
            this.toast_warn(ret.errmsg);
          }
        })
      },
    }
  }
</script>

<style scoped lang="less">
  .image-text {
    padding: 10px 10px 10px 10px;
  }
  .details {
    padding-bottom: 50px;
  }
</style>
