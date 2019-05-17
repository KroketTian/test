class Compile{
    constructor(el){
        this.$el = Compile.isElementNode(el) ? el : document.querySelector(el);
        if(this.$el){
            this.compileElement(this.$el);
        }
    }
    compileElement(el){
        let text = el.textContent;
        let child = el.childNodes;
        for(const node of Array.from(child)){
            // 如果是element节点，则递归到下一步进行解析
            if(Compile.isElementNode(node)){
                this.compileElement(node)
            }else if(Compile.isTextNode(node)){
                // 如果是text节点，则进行t-text的处理
                this.compileText(node);
            }
            // 如果是model节点，则进行t-model的处理
            // if(this.isModelNode(node)){
            //     this.compileModel(node);
            // }
        }
    }
    /**
     * 判断是否是元素节点
     * @param {*} node  元素
     */
    static isElementNode(node){
        return node.nodeType === 1;
    }
    /**
     * 判断是否是文本节点
     * @param {*} node 
     */
    static isTextNode(node){
        return node.nodeType === 3;
    }
    /**
     * 编译文本节点
     * @param {*} node 
     */
    compileText(node){
        let reg = /\{\{((?:.|\n)+?)\}\}/;
        
    }
}

















// function Compile (el, value) {
//     this.$val = value;
//     this.$el = this.isElementNode(el) ? el : document.querySelector(el);
//     if (this.$el) {
//       this.compileElement(this.$el);
//     }
//   }
//   Compile.prototype = {
//     compileElement: function (el) {
//       let self = this;
//       let childNodes = el.childNodes;
//       [].slice.call(childNodes).forEach(node => {
//         let text = node.textContent;
//         let reg = /\{\{((?:.|\n)+?)\}\}/;
//         // 如果是element节点
//         if (self.isElementNode(node)) {
//           self.compile(node);
//         }
//         // 如果是text节点
//         else if (self.isTextNode(node) && reg.test(text)) {
//           // 匹配第一个选项
//           self.compileText(node, RegExp.$1.trim());
//         }
//         // 解析子节点包含的指令
//         if (node.childNodes && node.childNodes.length) {
//           self.compileElement(node);
//         }
//       })
//     },
//     // 指令解析
//     compile: function (node) {
//       let nodeAttrs = node.attributes;
//       let self = this;
  
//       [].slice.call(nodeAttrs).forEach(attr => {
//         var attrName = attr.name;
//         if (self.isDirective(attrName)) {
//           var exp = attr.value;
//           node.innerHTML = typeof this.$val[exp] === 'undefined' ? '' : this.$val[exp];
//           node.removeAttribute(attrName);
//         }
//       });
//     },
//     // {{ test }} 匹配变量 test
//     compileText: function (node, exp) {
//       node.textContent = typeof this.$val[exp] === 'undefined' ? '' : this.$val[exp];
//     },
//     // element节点
//     isElementNode: function (node) {
//       return node.nodeType === 1;
//     },
//     // text纯文本
//     isTextNode: function (node) {
//       return node.nodeType === 3
//     },
//     // x-XXX指令判定
//     isDirective: function (attr) {
//       return attr.indexOf('x-') === 0;
//     }
//   }