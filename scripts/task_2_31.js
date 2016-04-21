function $(id) {
    return document.getElementById(id);
}
// 模拟绑定事件函数
function on(element,eventName,func) {
    if (element.addEventListener) {
        element.addEventListener(eventName, func, false);
    }
    else if (element.attachEvent) {
        element.attachEvent('on' + eventName, func);
    }
    else {
        element['on' + eventName] = func;
    }
}
// 获取dom
var data_select = {
    // 创建
    create: $('data_create'),
    // 类型选择区
    type: {
        ele: $('type_box'),
        class: 'className'
    },
    // 配置区
    basic: {
        ele: $('basic_box'),
        class: 'className'
    },
    // label名称
    label: {
        ele: $('label_box'),
        value: 'value'
    },
    // style切换下拉菜单
    styles: {
        ele: $('select_box'),
        value: 'value'
    },
    // 规则区
    rule: {
        ele: $('rule_input'),
        class: 'className'
    },
    // 最小长度
    minLength: {
       ele: $('min_length'),
       value: 'value'
    },
    // 最大长度
    maxLength: {
        ele: $('max_length'),
        value: 'value'
    },
    // add按钮
    add_btn: $('add_btn'),
    // 生成表单展示区域
    result: $('result'),
    // tag展示区
    item: [
        $('box_item_input'),
        $('box_item_show'),
        document.getElementsByClassName('item')
    ]
};
// 数据表单配置和生成模块
function dataProduct(data_select){
   this.select = data_select;
};
dataProduct.prototype = {
    init: function(){
        this.addEvent();
    },
    addEvent: function(){
        on(this.select.create,'change',this.showTable.bind(this));
    },
    showTable: function(e){
        if (e.target.getAttribute('type') == 'radio'){
            e.target.parentNode.className = e.target.id;
            if (!/necessary/.test(e.target.id)){
                //同步输入框中名字的设置
                this.select.label.ele.value = e.target.nextElementSibling.textContent;
            }
        }
    },
};

var dataProduct = new dataProduct(data_select);
dataProduct.init();
