<template>
  <div class="clearing-main">
    <ul class="merchandise">
      <li v-for="(item,index) in page.goods.exchangeGoods" class="li clearfix">
        <div class="left">
          <!--初始化单品的默认按钮-->
          <img v-if="item.check" class="elect" src="../../assets/images/register/icon-elect.png" @click="checkBtn(item)" alt="">

          <img v-if="!item.check" @click="checkBtnFalse(item)" class="elect" src="../../assets/images/register/icon-electCcc.png" alt="">

        </div>
        <div class="content">
          <img class="commodityImg" :src="item.ImageUrl" alt="">
        </div>

        <div class="right">
          <div class="title">{{ item.Name }}</div>
          <div class="fontsize13 tips">所需积分: <span>{{ item.Integral }}</span>
          </div>
          <div class="fontsize13 tips">
            剩余可兑换数量: <span>{{ item.RemainingAmount }}</span>
          </div>
          <div style="position: relative">
            <div class="NumBox">
              <div class="calculateBox">
                <span class="reduce" @click="reduce(item)">-</span>
                <span class="content">{{ item.Num }}</span>
                <span class="add" @click="add(item)">+</span>
              </div>

            </div>

            <span class="delete" @click="deleteBtn(item,item.ID)">
                  <img src="../../assets/images/register/icon-delete.png" alt="">
                </span>
          </div>
        </div>
      </li>
    </ul>
    <!--tip-->
    <div class="prompt">
      <div class="left">
        <img v-if="page.goods.ischeckAll" class="elect" @click="checkAllBtn()" src="../../assets/images/register/icon-checkAll.png" alt="">

        <img v-if="!page.goods.ischeckAll" class="elect" @click="checkAllBtnFalse()" src="../../assets/images/register/icon-electCcc.png" alt="">
      </div>
      <div class="content">
        <div class="title">
          兑换所需积分: {{ page.goods.aggregateScore }}
        </div>
        <div class="tips">
          <span>当前账户积分: {{ page.goods.currentScore }}</span>
          <em class="kong"></em>
          <span class="residue">兑换后账户剩余积分: <span id="residue" class="red1">{{ page.goods.residue }}</span></span>
        </div>
      </div>
    </div>
    <!--page.personalInfo-->
    <section class="personalInfo">
      <group>
        <x-input title="联系人" v-model="page.personalInfo.Name" :show-clear="false" label-width="74px" name="name" v-validate="'required|name'"></x-input>
        <i v-show="veeErrors.has('name')" class="fa fa-warning"></i>

        <x-input title="联系方式" :show-clear="false" v-model="page.personalInfo.Mobile" :max="11" name="mobile" v-validate="'required|mobile'" type="tel"></x-input>
        <i v-show="veeErrors.has('mobile')" class="fa fa-warning"></i>

        <x-input title="邮寄地址" v-model="page.personalInfo.Address" :show-clear="false" name="address" v-validate="'required'"></x-input>
        <i v-show="veeErrors.has('address')" class="fa fa-warning"></i>

        <x-input title="备注信息" v-model="page.personalInfo.Remark" :show-clear="false"></x-input>
      </group>
    </section>
    <div class="btnBox">
      <div class="confirmBtn" @click="dosave()">确定兑换</div>
    </div>
  </div>
</template>

<script>
  import {XNumber,XInput,Group,Confirm} from 'vux'
  import {mapState,mapMutations,mapActions} from 'vuex'
  export default {
    components: {
      XNumber,
      XInput,
      Group,
      Confirm
    },
    data() {
      return {
        page: {
          // 商品各元素
          goods: {
            // 全选
            ischeckAll: false,
            // 剩余积分
            residue: 0,
            // 所需积分
            aggregateScore: 0,
            // 当前账户积分
            currentScore: 0,
            // 商品列表
            exchangeGoods: [],
          },
          // 个人信息
          personalInfo: {
            Name: '',
            Mobile: '',
            Address: '',
            Remark: ''
          }
        }
      }
    },
    computed: {},
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
      ...mapActions([
        'changeAccess'
      ]),
      ...mapMutations([
        'recordUserInfo',
        'updataShoppingList'
      ]),

      /*
       * @synopsis 页面列表初始化
       * */
      initPage() {
        this.$http('/mobile/api/getexchageuserInfo', {userid:28}, (ret) => {
          if (ret.status) {
            this.page.personalInfo.Name = ret.data.Name?ret.data.Name:"";
            this.page.personalInfo.Mobile = ret.data.Mobile?ret.data.Mobile:"";
            this.page.personalInfo.Address = ret.data.Address?ret.data.Address:"";
            this.page.personalInfo.Remark = ret.data.Remark?ret.data.Remark:"";
            this.page.goods.currentScore = this.userInfo.Integral;
            this.computeIntegral();
          }
        })

        let self = this;
        this._.each(this.shoppingList, function (v, k) {
          self.page.goods.exchangeGoods.push({
            check: true,
            Num: v.Num,
            ImageUrl: v.ImageUrl,
            Name: v.Name,
            Integral: v.Integral,
            RemainingAmount: v.RemainingAmount,
            ID: v.ID
          });
        })
        this.checkAllBtnFalse();
      },

      // 减单品&计算积分
      // 商品数量 <= 0 页面显示为0 && 单品的选中状态为false
      reduce(item) {
        item.Num = item.Num - 1;
        if (item.Num <= 0) {
          item.Num = 0;
        }
        this.computeIntegral(item);
        this.updateStoreShoppingList();
      },

      // 更新共享仓库
      updateStoreShoppingList() {
        let self = this;
        let newShoppingList = [];
        this._.each(this.page.goods.exchangeGoods, function (v, k) {
          newShoppingList.push({
            Num: v.Num,
            ImageUrl: v.ImageUrl,
            Name: v.Name,
            Integral: v.Integral,
            RemainingAmount: v.RemainingAmount,
            ID: v.ID
          });
        });
        this.updataShoppingList(newShoppingList);
      },

      // 加单品&计算积分
      add(item) {
        item.Num = item.Num + 1;
        this.computeIntegral(item);
        this.updateStoreShoppingList();
      },

      // 删除商品 重新计算商品兑换所需积分 & 全选状态
      // 商品兑换所需积分 = 商品兑换所需积分 - 商品数量 * 商品单价
      deleteBtn(item, id) {
        this.page.goods.exchangeGoods.splice(id - 1, 1);
        if (item.Num != 0) {
          this.computeIntegral(item);
          this.updateStoreShoppingList();
        }
        this.isAllBtnStatus();
      },

      // 点击单品灰色状态时 改变单品的选中状态 & 只要选中一个单品 全选按钮为绿色
      checkBtnFalse(item) {
        item.check = true;
        this.page.goods.ischeckAll = true;
        this.computeIntegral(item);
      },

      // 点击单品黑色状态时 改变单品的选中状态(取消为灰色)重新计算积分
      checkBtn(item) {
        item.check = false;
        this.computeIntegral(item);
        this.isAllBtnStatus();
      },

      // 取消全选
      checkAllBtn() {
        this.page.goods.ischeckAll = false;
        this.forexchangeGoods(false);
        this.computeIntegral();
      },

      // 全选
      checkAllBtnFalse() {
        this.page.goods.ischeckAll = true;
        this.forexchangeGoods(true);
        this.computeIntegral();
      },

      // 遍历所有商品的选中状态函数
      // 兑换所需积分大于0 全选按钮为绿色
      isAllBtnStatus() {
        this.page.goods.aggregateScore > 0 ? this.page.goods.ischeckAll = true : this.page.goods.ischeckAll = false;
      },

      // 计算兑换所需积分函数
      computeIntegral(item) {
        let Sum = 0;
        this.page.goods.exchangeGoods.forEach((val, idx) => {
          if (val.check) {
            Sum += val.Num * val.Integral;
          }
        })
        this.page.goods.aggregateScore = Sum;
        this.page.goods.residue = this.page.goods.currentScore - this.page.goods.aggregateScore;
        if (this.page.goods.residue < 0) {
          this.page.goods.residue = '不足'
          document.getElementById("residue").classList.add("red");
        } else {
          document.getElementById("residue").classList.remove("red");
        }
      },

      // 循环遍历数组&清掉商品数量&所需积分
      forexchangeGoods(status) {
        for (let i = 0; i < this.page.goods.exchangeGoods.length; i++) {
          this.page.goods.exchangeGoods[i].check = status;
          this.Num = this.page.goods.exchangeGoods[i].Num;
          !this.page.goods.exchangeGoods[i].check ? this.page.goods.aggregateScore = 0 : this.computeIntegral();
        }
      },

      // 确定兑换
      dosave() {
        this.$validator.validateAll().then((result) => {
          // 验证
          if (!result) {
            this.alert.show('请完善信息');
            return false
          }

          let goodList = [];
          this._.each(this.page.goods.exchangeGoods, function (v, k) {
            if(v.check == true && v.Num > 0){
              goodList.push({
                Count: v.Num,
                Name: v.Name,
                ID: v.ID
              });
            }
          })

          let detail = {
            Contact: this.page.personalInfo.Name,
            ContactPhone: this.page.personalInfo.Mobile,
            Address: this.page.personalInfo.Address,
            Remark: this.page.personalInfo.Remark
          };

          // 发送Ajax
          this.$http('/mobile/api/saveexchange', {
            goodList: goodList,
            detail: detail
          }, (ret) => {
            if (ret.status) {
              this.alert.show(ret.data.msg);
              //更新用户积分及购物车
              this.changeAccess({
                userInfo: ret.data.user
              })
              this.updataShoppingList([]);
            } else {
              this.alert.show('兑换失败了');
            }
          })
        })
      },

      // 弹框(确认之后跳转)
      onHide() {
        this.$router.push({
          path: '/personal/exchange'
        })
      }
    }
  }

</script>

<style lang="less" scoped="scoped">
  html #app,
  body #app {
    background: #fff!important;
  }

  .mask {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
  }

  .clearing-main {
    width: 100%;
    height: 100%;
    background-color: #fff;
    margin: 0 auto;
    max-width: 640px;
    .merchandise {
      width: 90%;
      margin: 0 auto;
      .li {
        width: 100%;
        height: 124px;
        border-bottom: 1px solid #cccccc;
        .left {
          float: left;
          height: 124px;
          line-height: 140px;
          width: 10%;
          .elect {
            width: 25px;
            height: 25px;
          }
        }
        .content {
          float: left;
          height: 124px;
          width: 25%;
          box-sizing: border-box;
          position: relative;
          .commodityImg {
            width: 80px;
            height: 80px;
            position: absolute;
            margin-left: 5px;
            top: 47%;
            left: 50%;
            transform: translate(-50%, -50%);
            border: 1px solid #f6f5f8;
          }
        }
        .right {
          float: left;
          width: 65%;
          height: 124px;
          padding-left: 15px;
          box-sizing: border-box;
          .title {
            font-size: 15px;
            margin-top: 16px;
          }
          .tips {
            color: #9d9d9d;
          }
          .NumBox {
            width: 50%;
            text-align: center;
            font-size: 13px;
            display: inline-block;
            .calculateBox {
              width: 100%;
              height: 28px;
              line-height: 28px;
              margin: 0 auto;
              padding-top: 5px;
              span {
                display: inline-block;
              }
              .reduce {
                width: 25%;
                height: 28px;
                background: #fcfbfe;
                float: left;
                color: #9d9d9d;
              }
              .content {
                width: 50%;
                height: 28px;
                background: #f6f5f8;
                color: #444444;
              }
              .add {
                width: 25%;
                height: 28px;
                background: #fcfbfe;
                float: right;
                color: #444444;
              }
            }
          }
          .delete {
            position: absolute;
            right: 0px;
            top: 10px;
            img {
              width: 22px;
              height: 22px;
            }
          }
        }
      }
    }
  }

  .prompt {
    width: 100%;
    padding-left: 5%;
    background-color: #464646;
    box-sizing: border-box;

    .left {
      width: 10%;
      height: 50px;
      display: table-cell;
      vertical-align: middle;
      line-height: 64px;
      float: left;
      img {
        width: 25px;
        height: 25px;
        line-height: 50px;
      }
    }
    .content {
      padding: 3px 0;
      .title {
        color: #ffffff;
        font-size: 15px;
      }
      .tips {
        color: #989898;
        font-size: 13px;
      }
    }
  }

  .btnBox {
    width: 100%;
    height: 130px;
    background: #fff;
    padding-top: 40px;
    .confirmBtn {
      width: 50%;
      height: 35px;
      background-color: #35a5f3;
      text-align: center;
      line-height: 35px;
      color: #fff;
      font-size: 13px;
      margin: 0 auto;
      border-radius: 5px;
    }
  }

  .fontsize13 {
    font-size: 13px;
  }

  .red {
    color: red;
  }

  .kong {
    margin-left: 3%;
  }
  /* 判断iphone5 */
  /* 横屏竖屏判断方法与ipad一样 */

  @media screen and (device-width: 320px) {
    .residue {
      display: block;
    }
    .prompt .left img {
      position: relative;
      top: 12px;
    }
  }

</style>
