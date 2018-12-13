<template>
  <div class="lc-main present-main wrap">
    <div class="giftName bg-white">
      <span>{{ this.page.Goods.Name }}</span>
    </div>
    <div class="giftImg text-center">
      <img class="img" :src=this.page.Goods.ImageUrl alt="">
    </div>
    <section class="section">
      <div class="giftIntroduce">
        <div>所需积分: {{ this.page.Goods.Integral }}</div>
        <div>剩余数量: {{ this.page.Goods.RemainingAmount }}</div>
      </div>
    </section>
    <section class="describe">
      <h4 class="describe-head">商品描述</h4>
      <div class="describe-content">
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;{{ this.page.Goods.Description }}
        </p>
      </div>
    </section>
    <div class="pd15 mt20">
      <x-button type="primary" class="Bgblue fontsize15" @click.native="returnbtn">返 回</x-button>
    </div>
  </div>
</template>

<script>
  import {XButton} from 'vux'
  import {mapState, mapMutations, mapActions} from 'vuex'

  export default {
    components: {
      XButton
    },
    data() {
      return {
        page: {
          GoodsID: 0,
          Goods: {}
        }
      }
    },
    mounted() {
      this.initPage();
    },
    methods: {
      /*
       * @synopsis 页面列表初始化
       * */
      initPage() {
        this.page.GoodsID = this.$route.params.id;
        //todo: 为何重新调用此API获取所有Goods
        this.$http('/mobile/api/ExchangeGoods', {}, (ret) => {
          if (ret.status) {
            this.page.Goods = ret.data[this.page.GoodsID - 1];
          }
        })
      },
      returnbtn() {
        this.$router.push({path: '/personal/exchangeindex'});
      }
    }
  }

</script>

<style lang="less" scoped="scoped">
  .present-main {
    .giftName {
      width: 100%;
      height: 40px;
      line-height: 40px;
      padding-left: 6%;
      box-sizing: border-box;
      background: #fff;
    }

    .section {
      padding-top: 20px;
      background: #fff;
      box-sizing: border-box;
    }

    .giftImg {
      padding-top: 15px;
      padding-left: 6%;
      display: inline-block;
      width: 100%;
      background: #fff;
      box-sizing: border-box;
      .img {
        height: 150px;
      }
    }
    .giftIntroduce {
      width: 43%;
      display: inline-block;
      height: 70px;
      vertical-align: bottom;
      box-sizing: border-box;
      padding-left: 6%;
    }
    .describe {
      .describe-head {
        width: 100%;
        height: 50px;
        line-height: 50px;
        margin: 15px 0;
        padding-left: 6%;
        box-sizing: border-box;
        background-color: #fff;
      }
      .describe-content {
        background-color: #fff;
        p {
          font-size: 14px;
          padding: 2% 6%;
        }
      }
    }
  }

</style>
