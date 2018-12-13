<template>
  <div class="lc-main exchange-main wrap">
    <!--personalInfo-->
    <div class="headWrap">
      <div class="personWrap">
        <div class="fl">
          <img :src=this.userInfo.HeadImgUrl class="personGroup_img">
        </div>
        <div class="jifen fr">
          <div class="myintegral">我的积分:&nbsp; {{ this.userInfo.Integral }}</div>
          <router-link to="/exchange/rule" append>
            <span class="rule">积分规则</span>
          </router-link>
        </div>
      </div>
    </div>

    <!--tip-->
    <grid class="grid">
      <img class="round1" src="../../assets/images/register/round1.png" alt="">
      <p class="gridTitle">温馨提示</p>
      <p class="gridtxt fontsize14">
        <span></span>您兑换成功后，我们将会在一个月内为您寄出。如果一个月内未收到，请拨打我们的热线询问，我们会尽快回复您。
      </p>
    </grid>

    <!--商品区域-->
    <section class="commodity">
      <ul class="commodity_ul">
        <li class="commodity_li" v-for="(item,index) in page.exchangeGoods">
          <div class="commodity_info">
            <div>{{ item.Name }}</div>
            <div class="jifen_txt">所需积分: <span class="integral_txt">{{ item.Integral }}</span></div>
          </div>
          <router-link :to="'/personal/present/'+item.ID" append>
            <img class="commodity_img" :src="item.ImageUrl" alt="">
          </router-link>
          <div class="numBox">
            <div v-if="item.Num==0" class="addRound" @click="addRound(item,item.ID)">+</div>
            <div v-if="item.Num>0" class="calculateBox">
              <span class="reduce" @click="reduce(item)">-</span>
              <span class="content">{{ item.Num }}</span>
              <span class="add" @click="add(item)">+</span>
            </div>
          </div>
        </li>
      </ul>
      <div class="car" @click="enterCar()">
        <img src="../../assets/images/register/icon-car.png" alt="">
      </div>
    </section>
    <!--列表loading-->
    <loading :loading="page.loading"></loading>
  </div>
</template>

<script>
  import {Grid} from 'vux'
  import {mapState,mapMutations,mapActions} from 'vuex'
  import loading from '../../components/loading/loading4.vue'
  export default {
    components: {
      Grid,
      loading
    },
    data() {
      return {
        page: {
          // loading组件
          loading: true,
          // 商品数组
          exchangeGoods: [],
        }

      }
    },
    mounted() {
      this.initPage();
    },
    computed: {
      ...mapState([
        'userInfo',
        'shoppingList'
      ])
    },
    methods: {
      ...mapMutations([
        'recordUserInfo',
        'updataShoppingList'
      ]),

      /*
       * 点击圆圈加号
       * params (Object) item 当前单品的信息
       * params (Number) id 当前单品的id
       * */
      addRound(item, id) {
        item.Num = 1;
      },

      /*
       * 减少单品数量
       * params (Object) item 当前单品信息
       * */
      reduce(item) {
        item.Num = item.Num - 1;
        if (item.Num <= 0) {
          item.Num = 0;
        }
      },

      /*
       * 增加单品数量
       * params (Object) item 当前单品信息
       * */
      add(item) {
        item.Num = item.Num + 1;
      },

      /*
       * 页面列表初始化
       * */
      initPage() {
        this.$http('/mobile/api/ExchangeGoods', {}, (ret) => {
          if (ret.status) {
            //遍历共享仓库数组,返回一个新数组,新数组里包含仓库中已有的商品ID
            for (let i = 0; i < ret.data.length; i++) {
              let selectedItems = this._.where(this.shoppingList, {
                ID: ret.data[i].ID
              });
              //仓库中已有商品的话 默认为展开状态 且数量=仓库中已有的当前单品的数量
              if (selectedItems.length > 0) {
                ret.data[i].Num = selectedItems[0].Num;
              } else {
                ret.data[i].Num = 0;
              }
            }
            this.page.exchangeGoods = ret.data;
            this.page.loading = false;
          }
        })
      },

      /*
       * @synopsis 点击购物车
       * */
      enterCar() {
        let arr = [];
        for (let i = 0; i < this.page.exchangeGoods.length; i++) {
          // Num>0 既然选择了就把选择的单品放入共享仓库中
          if (this.page.exchangeGoods[i].Num > 0) {
            arr.push(this.page.exchangeGoods[i]);
          }
        }
        //没有商品提示
        if (arr.length == 0) {
          this.alert.show('请添加商品');
        } else {
          //用户添加的商品当作参数传递到仓库且页面跳转
          this.updataShoppingList(arr);
          this.$router.push({
            path: '/personal/exchange/clearing'
          });
        }
      },
    }
  }

</script>

<style lang="less" scoped="scoped">
  .car {
    position: absolute;
    top: 46%;
    right: 0px;
  img {
    width: 60px;
    height: 55px;
  }
  }

  .numBox {
    width: 50%;
    height: 50px;
    margin: 0 auto;
    position: relative;
  .addRound {
    width: 30px;
    height: 30px;
    background-color: #35a5f3;
    border-radius: 50%;
    position: absolute;
    right: 0px;
    top: 5px;
    color: #fff;
    line-height: 30px;
    text-align: center;
  }
  .calculateBox {
    width: 100%;
    height: 30px;
    line-height: 30px;
    margin: 0 auto;
    padding-top: 8px;
  span {
    display: inline-block;
  }
  .reduce {
    width: 25%;
    height: 30px;
    background: #fcfbfe;
    float: left;
    color: #9d9d9d;
  }
  .content {
    width: 50%;
    height: 30px;
    background: #f6f5f8;
    color: #444444;
  }
  .add {
    width: 25%;
    height: 30px;
    background: #fcfbfe;
    float: right;
    color: #444444;
  }
  }
  }

  .exchange-main {
    background-color: #fff;
  }

  .headWrap {
    height: 115px;
    width: 100%;
    background-image: url("../../assets/images/register/personalheadBg3.png");
    background-size: cover;
    position: relative;
    z-index: 1;
  .personWrap {
    position: absolute;
    top: 50%;
    left: 3%;
    width: 100%;
    font-size: 15px;
    transform: translate(-3%, -50%);
  .personGroup_img {
    margin-left: 15px;
    margin-right: 15px;
    width: 80px;
    border-radius: 50%;
    display: inline-block;
    box-shadow: 0px 2px 17px -4px #000;
  }
  .myintegral {
    color: #fff;
    text-shadow: #000 0px 1px 2px;
  }
  .rule {
    color: #fff554;
    text-shadow: blue 0px 1px 2px;
  }
  .rule::after {
    content: "";
    width: 18px;
    height: 17px;
    background-image: url("../../assets/images/register/icon-wenh1.png");
    background-size: 100%, 100%;
    display: inline-block;
    margin-left: 5px;
    vertical-align: initial;
    position: relative;
    top: 4px;
  }
  .personGroup_name {
    margin-left: 15px;
    line-height: 60px;
    display: inline-block;
  }
  .jifen {
    padding-top: 19px;
  }
  }
  }

  .round1 {
    width: 100%;
  }

  .grid {
    margin: 0 auto;
    background-color: #fff;
    border-bottom: 1px solid #ebebeb;
  .gridTitle {
    text-align: center;
    font-size: 18px;
    position: relative;
    top: -32px;
    left: 4px;
  }
  .gridTitle::after {
    content: '';
    display: inline-block;
    background: url("../../assets/images/register/round.png") no-repeat;
    background-size: 30%, 100%;
  }
  .gridtxt {
    padding: 0px 40px;
    color: #9d9d9d;
    position: relative;
    top: -18px;
  span {
    width: 30px;
    display: inline-block
  }
  }
  }

  .commodity_info {
    text-align: left;
    padding-left: 10px;
    padding-top: 10px;
    font-size: 15px;
  .jifen_txt {
    color: #9d9d9d;
    font-size: 13px;
  .integral_txt {
    font-size: 13px;
    color: #35a5f3;
  }
  }
  }

  .commodity {
    position: relative;
    overflow: hidden;
  &::after {
     content: "";
     display: inline-block;
     width: 1px;
     height: 100%;
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
     background-color: #ebebeb;
   }
  .commodity_ul {
  .commodity_li {
    width: 50%;
    float: left;
    background-color: #fff;
    text-align: center;
    border-bottom: 1px solid #ebebeb;
  .commodity_img {
    width: 80px;
    height: 80px;
    margin-top: 6px;
  }
  }
  }
  }

</style>
