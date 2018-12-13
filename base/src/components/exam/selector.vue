<template>
  <section class="selector-wrap">
    <group>
      <selector :class="disabled?'disabled':''" :ref="'selectorCom'+index" placeholder="请选择选项"
                v-model="item.Answer.OptionSn"
                :readonly="disabled"
                :options="SelectOptions"
                @on-change="selectChange"></selector>
      <!--<selector :ref="'selectorCom'+index" placeholder="请选择选项"-->
      <!--v-model="item.Answer.OptionSn"-->
      <!--:readonly="disabled"-->
      <!--::value-map="['Sn', 'Sn']"-->
      <!--:options="item.Options"></selector>-->
    </group>
    <!--其他输入-->
    <div class="other-wrap" :class="disabled ?'disabled':''" v-if="item.Answer.IsAllowInput||IsCanInput">
      <group>
        <x-input :disabled="disabled"
                 label-width="38px" title=""
                 v-model="item.Answer.OptionValue"
                 :placeholder="disabled&&!item.Answer.OptionValue?'无':''"
                 show-clear></x-input>
      </group>
    </div>
  </section>
</template>
<script>
  import {Group, XInput, XTextarea, Selector, Confirm} from 'vux'

  export default{
    components: {
      Group,
      Selector,
      XInput,
      XTextarea,
      Confirm
    },
    props: {
      index: {default: 0, type: Number},
      item: {default: {}, type: Object},
      disabled: {default: false, type: Boolean},
    },
    data(){
      return {
        /*
         是否显示Input框，：
         1. 默认未选择选项时，IsCanInput = false
         2. 如果选择了选项，且当前选项的IsAllowInput = true，则 IsCanInput = true
         */
        IsCanInput: false,
        SelectOptions: []
      }
    },
    created(){
      let self = this;
      for (var i = 0; i < self.item.Options.length; i++) {
        let op = self.item.Options[i]
        self.SelectOptions.push({key: op.Sn, value: op.Name});
      }
      if (self.disabled) {
        if (!self.item.Answer || !self.item.Answer.OptionSn) {
          self.SelectOptions.push({key: '', value: '请选择选项'});
          self.item.Answer={
            OptionSn:'',
            IsAllowInput:false
          }
        } else {
          self.SelectOptions.push({key: self.item.Answer.OptionSn, value: self.item.Answer.Name});
          self.selectChange(self.item.Answer.OptionSn);
        }
      }
    },
    methods: {
      selectChange(val, o){
        let self = this;
        if(self.item.Answer && self.item.Answer.OptionSn){
          //如果是disabled，则不可以输入
          self.IsCanInput = false;
          self._.each(self.item.Options, function (d, i) {
            if (d.Sn == val && d.IsAllowInput) {
              self.IsCanInput = true;
            }
          });

          self.item.IsNotAnswer = !self.item.Answer.OptionSn;
        }else{
          self.item.IsNotAnswer =true;
        }
      },
    }
  }


</script>


<style scoped lang="less" rel="stylesheet/less">

  .other-wrap {
    margin: 0px 10px 10px 10px;
  }

</style>
