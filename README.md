 methods :  checkElWithOption、checkEl、validate； 
      1、checkElWithOption : 对单个元素进行校验, return true/false.
      2、checkEl : 检验表单 , return true/false.
      3、validate : 对表单进行校验，如果元素不是form或者 div，则不进行校验 ，return true/false.

      校验表单元素 属性： data-validate
      检验项： type(text/number)、required(true/false)、maxLength、minLength -- v1.0  ; v2.0 将添加正则及其它校验相关规则
      展示相关项： message、showEl -- message : 校验不通过时的展示信息 ； showEl : 展示不通过校验时信息的元素id ，如果没有该项，则会调用bootstrap 框架的popover进行展示
      eg: 在需要校验的元素中添加 data-validate="{required:true,type:'number',maxLength:10,minLength:5,message:'错误信息',showEl:'error'}"
      依赖： jquery#1.9.0+ ， bootstrap
