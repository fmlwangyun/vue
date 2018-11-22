<template>
  <section class="barrage">
    <div class="title-box clearfix">
      <div class="logo-l fl">
        <img src="../../assets/images/logo-l.png" alt="">
      </div>
      <div class="title fl">
        <img src="../../assets/images/title.png" alt="">
      </div>
      <div class="logo-r fr">
        <img src="../../assets/images/logo-r.png" alt="">
      </div>
    </div>
    <div class="main" v-show="show">
      <barrage-item :linecount="4" :data="textlist" :speed="18" :isMove="isMove"></barrage-item>
    </div>
    <input type="hidden" >
  </section>
</template>
<script>
var timer;
import { mapState, mapMutations, mapActions } from "vuex";
import barrageItem from "./barrage-item.vue";
import { AjaxPost } from "../../common/utils/ajax";
export default {
  data() {
    return {
      ScreenWidth: null,
      textlist: [],
      search: {
        pageIndex: 1,
        lastDateTime: ""
      },
      show: true,
      isMove:false
    };
  },
  components: {
    barrageItem
  },
  beforeCreate() {
    window.RAF = (function() {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000/60);
        }
      );
    })();
  },
  mounted() {
    document.onkeyup = this.keyup;
    this.setTimer();
  },
  methods: {
    ...mapMutations(["setBarrage"]),
    setTimer() {
      window.clearInterval(timer);
      var _this = this;
      timer = window.setInterval(() => {
        _this.getData();
      }, 5000);
    },
    getData() {
      const _this = this;
      AjaxPost(
        "/admin/screen/getinteract",
        _this.search,
        ret => {
          if (ret.status) {
            _this.search.lastDateTime = ret.data.lastDateTime;
            ret.data.list.PageList.map((v, i) => {
              _this.textlist.push(v);
            });
          } else {
            _this.$message.error(ret.errmsg);
          }
        },
        err => {
          _this.$message.error(err);
        }
      );
    },
    keyup(e) {
      console.log(e.keyCode)
      if(e.keyCode == 32 || e.keyCode == 13){
        this.isMove = !this.isMove
      }
    }
  },
  computed: {}
};
</script>
<style scoped lang="less">
.barrage {
  padding-bottom: 20px;
  height: 100%;
  width: 100%;
  background: url("../../assets/images/bg2.png") no-repeat center 0;
  background-size: 100% 100%;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}
.title-box {
  width: 1200px;
  margin: 0 auto;
  padding: 25px 0 20px 0;

  .logo-l,
  .logo-r {
    width: 10%;
  }

  .logo-r {
    text-align: right;
  }

  .title {
    width: 80%;
    text-align: center;
  }
}
.main {
  padding: 20px 30px;
  width: 100%;
  height: 505px;
  border-radius: 5px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  top: 0;
  .item {
    color: #fff;
    animation: move 5s linear;
    position: absolute;
    left: -100px;
  }
}
.btn {
  width: 100px;
  height: 30px;
  margin: 0 auto;
  display: block;
}
</style>
