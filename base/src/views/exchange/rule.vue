<template>
  <section class="contener lc-main">
    <div class="head">
      <h3 class="title">积 分 规 则</h3>
    </div>
    <div>
      <ul class="intRuleCont wrap">
        <li style="margin-top:0px;padding-top:10px">
          <span>签到积分</span>
          <p>- 每日上线后进入签到页面进行签到+1分</p>
          <p>- 如连续签到5天额外+1分,连续签到10天额外+1分,连续签到30天额外+1分</p>
        </li>

        <li>
          <span>录入积分</span>
          <p>在病人不重复的情况下,既录入每日1例可获得10分</p>
        </li>

        <li>
          <span>筛查积分</span>
          <p>在病人不重复的情况下,所以暂定每列1分,每日录入10例,即录入每日最多可获得10分</p>
        </li>

        <li>
          <span>DM积分</span>
          <p>DM积分: 为管辖所有代表积分/代表人数</p>
        </li>

        <li>
          <span>RM积分</span>
          <p>RM积分: 为管辖所有DM积分</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {}
    },
    mounted() {

    },

    methods: {

    },
    components: {},
  }

</script>

<style lang="less" scoped="scoped">
  .contener {
    width: 100%;
    height: 100%;
    color: #373737!important;
    .head {
      height: 100px;
      line-height: 100px;
    }
    .title {
      text-align: center;
    }
    .intRuleCont {
      color: #000;
      background: rgba(255, 255, 255, 0.4);
      li {
        margin: 15px 15px;
        color: #373737!important;
      }
      span {
        font-size: 16px;
        padding-top: 10px;
      }
      p {
        padding-top: 10px;
        padding-left: 20px;
        font-size: 15px;
      }
    }
  }

</style>
