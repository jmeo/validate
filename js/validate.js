/**
 * Created by jmeo on 15/8/4.
 * v1.0
 */
(function($){
    /** 校验属性 **/
    var checkAttr = "data-validate";
    /**
     * 展示提示信息 --
     * @param message
     * @param option
     */
    function showMessage(message,option){
        var showEl = option.showEl;
        var $sel = $("#"+showEl);
        //展示元素存在
        if($sel.length>0){
            $sel.html(message);
            option.el.on('focus',function(){
                $sel.html('');
            });
        }else{
            //popover
            //检测插件是否存在
            var $el = option.el;
            $el.popover({
                content:message,
                trigger:'manual'
            });
            $el.popover('show');
            $el.on('focus',function(){
                $el.popover('hide');
            });
        }

    }
    /**
     * 校验单个元素
     * 校验属性参数 ： type(text/number)、required、maxLength、minLength、pattern
     * 展现信息： message、showEl(id)、showType(text,popover) -- if showType null then text and showEl must be need
     *            if showEl is not null , then text , else popover -- need boostrap popover
     * @param $el
     * @param option
     * @returns {boolean}
     */
    function checkElWithOption($el,option){
        var isPass = true;
        if(!option){
            option = $($el).attr(checkAttr);
            if(option){
                option = eval("("+option+")");
            }else{
                return isPass;
            }
        }
        option.el = $el;
        var temMes = null;
        var value = $el.val();
        if(option.required && !value){
            temMes = "该元素为必填项！";
            isPass = false;
        }else if(option.type && option.type=='number' && !/^\d+$/.test(value)){
            temMes = "必须为数字！";
            isPass = false;
        }else if(option.maxLength && option.maxLength > 0 && value.length > option.maxLength){
            temMes = "最大长度为"+option.maxLength;
            isPass = false;
        }else if(option.minLength && option.minLength > 0 && value.length < option.minLength){
            temMes = "最小长度为"+option.minLength;
            isPass = false;
        }else if(option.pattern && !option.pattern.test(value)){
            temMes = "输入格式不正确";
            isPass = false;
        }

        // confirm
        if(isPass){
            var confirm = option.confirm;
            if(confirm){
                confirm = $("#"+confirm);
                var cValue = confirm.val();
                if(cValue && value && cValue == value){
                    return isPass;
                }else{
                    isPass = false;
                    temMes = "请确认是否一致！";
                }
            }
        }

        if(!isPass && option.message && option.message.length>0){
            temMes = option.message;
            showMessage(temMes,option)
        }else if(!isPass){
            showMessage(temMes,option);
        }
        return isPass;
    }
    /**
     * 校验表单
     * @param $el
     * @returns {boolean}
     */
    function checkEl($el){
        var items = $el.find("["+checkAttr+"]");
        var isPass = true;
        items.each(function(){
            var item = $(this);
            var optionStr = item.attr(checkAttr);
            var option = eval("("+optionStr+")");
            if(!checkElWithOption(item,option)){
                isPass = false;
            }
        });
        return isPass;
    }
    /**
     * 表单校验
     * @returns {*}
     */
    function validate(){
        var tagName = this[0].tagName.toLocaleLowerCase();
        if(tagName == 'form' || tagName == 'div'){
            return checkEl(this);
        }else{
            return true;
        }
    }
    $.checkElWithOption = checkElWithOption;
    $.checkEl = checkEl;
    $.fn.validate = validate;
})(jQuery);
