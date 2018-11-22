<template>
  <div id="barrage" class="">
    <div class="line">
      <div class="barrage-item" v-for="(item,index) in linecount" :key="index" :id="'barrage-item'+index">
        
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "barrage-item",
  props: {
    speed: {
      type: Number
    },
    linecount: {
      type: Number
    },
    data: {
      type: Array
    },
    isMove:{
      type:Boolean
    }
  },
  data() {
    return {
      IDList: [], //每个span的id
      lastBox: [], //记录每一行的最后一个span
      ID: "barrage-item",
      currentIndex: -1, //获取span
      barrageItem: null, //每行div
      barrageItemWid: null, //每行div宽 自适应控制span移动距离
      colors:['#e95050','#5078e9','#08080a','#8a23a4','#e71f57'],
    };
  },
  mounted() {
    this.lastBox.length = this.linecount;
    this.barrageItem = document.getElementById('barrage');
    this.$nextTick(() => {
        //获取div宽度 用来判断span移动距离
      this.barrageItemWid = parseInt(
        window.getComputedStyle(this.barrageItem, null)["width"]
      );
      window.RAF(this.loopInter);
      this.loopRoll();
    });
  },
  methods: {
    addBox(val, num) {
      if (!!val) {
        let parm = {},
          box = null;
        //唯一ID 方便动画完成后删除
        let ID = "barrage-item-"  + new Date().getTime();
        parm = {
          ID: ID,
          speed: 2
        };
        box = document.createElement("div");
        box.setAttribute("ID", ID);
        box.setAttribute("class", "barrage-item-box clearfix");
        box.innerHTML ="<div class='barrage-item-box-img'>"+"<img src='"+val.HeadImgUrl+"' alt=''>"+"</div>"+"<span class='barrage-item-box-text'>" +val.UserName+ "："+val.Content + "</span>";
        this.barrageItem = document.getElementById(this.ID + num);
        this.barrageItem.appendChild(box);
        //拿到每个span宽度
        let boxWid = box.clientWidth;
        box.style.right = "-" + (boxWid + this.rnd(100, 350)) + "px";
        box.style.color = this.colors[num];
        box.style.border = '2px solid'+this.colors[num];
        this.IDList.push(parm);
        //记录最后一个span
        this.lastBox[num] = box;
      }
    },
    rnd(n, m) {
      var random = Math.floor(Math.random() * (m - n + 1) + n);
      return random;
    },
    loopInter() {
      window.RAF(this.loopInter);
      var num = Math.floor(Math.random() * this.linecount);
      if (!!this.lastBox[num]) {
        //最后一个spanright < 0 相当于 span没完全展示在页面 此时不添加span
        if (parseInt(this.lastBox[num].style.right) < 0) {
          return;
        }
      }
      if(this.data.length <= 0){
        return;
      }
      this.currentIndex = this.currentIndex + 1;
      if (this.currentIndex >= this.data.length) {
        this.currentIndex = - 1;
        return;
      }

      let _text = this.data[this.currentIndex];
      this.addBox(_text, num);
    },
    loopRoll() {
      window.setInterval(() => {
        this.move();
      }, this.speed);
    },
    move() {
      if (this.isMove) {
        return;
      }
      let ele = null,
        item = null,
        _IDList = [];
      for (let i = 0; i < this.IDList.length; i++) {
        item = this.IDList[i];
        ele = document.getElementById(item.ID);
        if (ele) {
          let _cr = ele.style.right;
          let speed = item.speed;
          _cr = parseInt(_cr) + 1 * speed;
          ele.style.right = _cr + "px";
          if (_cr > this.barrageItemWid + 10) {
            //距离right大于div宽度 跑出屏幕 清除该盒子
            ele.parentNode.removeChild(ele);
          } else {
            //留下没跑出屏幕的span id
            _IDList.push(item);
          }
        }
      }
      this.IDList = _IDList;
    },
  }
};
</script>
<style lang="less">
.barrage-item {
  height: 100%;
  position: relative;
  overflow: hidden;
}
.barrage-item-box {
  position: absolute;
  white-space: nowrap;
  top: 15px;
  right: -100%;
  //height: 100%;
  display: inline-block;
  padding: 2px 5px;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  height: 40px;
  line-height: 40px;
  // border:1px solid #736d6d;
}
.barrage-item-box-text {
  font-size: 20px;
  margin-left: 5px;
}
.barrage-item-box-img{
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  vertical-align: top;
  img{
    width: 100%;
    height: 100%;
  }
}
.barrage {
  height: 100%;
}
.line {
  height: 80px;
}
</style>
