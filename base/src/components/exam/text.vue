<template>
  <section class="answer-wrap">
    <group v-if="item.InputType==3">
      <x-input title="答：" :disabled="disabled" v-model="item.Answer.OptionValue"
               :placeholder="item.Answer.OptionValue.length==0&&!disabled?'请回答':''"
               @change.native="changeAnswer(item)"></x-input>
    </group>
    <group v-else>
      <x-textarea :readonly="disabled" title="答：" :disabled="disabled" v-model="item.Answer.OptionValue"
                  :placeholder="item.Answer.OptionValue.length==0&&!disabled?'请回答':''"
                  @change.native="changeAnswer(item)"></x-textarea>
    </group>
    <div style="color:#4343d8">
      <cell
        title="答题结果" is-link
        :border-intent="false"
        :arrow-direction="showContent ? 'up' : 'down'"
        @click.native="showContent = !showContent"
        v-if="item.IsCanSeeResult&&disabled"></cell>
      <template v-if="showContent">
        <cell-form-preview :border-intent="false"
                           :stylecell="stylecell"
                           :list="item.ResultList"></cell-form-preview>
      </template>
    </div>
  </section>
</template>
<script>
  import {Group, XInput, XTextarea, Confirm, CellFormPreview, Cell} from 'vux'
  export default{
    components: {
      Group,
      XInput,
      XTextarea,
      Confirm,
      CellFormPreview,
      Cell
    },
    props: {
      index: {default: 0, type: Number},
      item: {default: {}, type: Object},
      disabled: {default: false, type: Boolean},
    },
    data(){
      return {
        showContent: false,
        labelClass: 'color-cell',
        stylecell: {color: '#4343d8'}
      }
    },
    created(){
      //如果是非必填题目，用户没有填写任何内容，则给Answer赋值空的OptionValue
      if (!this.item.Answer) {
        this.item.Answer = {
          OptionValue: ''
        }
      }
    },
    methods: {
      changeAnswer(item){
        item.Answer.OptionValue.length > 0 ? item.IsNotAnswer = false : item.IsNotAnswer = true;
      }
    }
  }


</script>


<style scoped lang="less" rel="stylesheet/less">
  *:not(div,input,textarea) {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -o-user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }

  .vux-cell-primary .vux-label {
    color: #4343d8;
  }

  .answer-wrap {
    padding: 0 5px;
  }

</style>
