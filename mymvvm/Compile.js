class Compile{
    constructor(el,data){
        this.$data = data;
        this.$el = Compile.isElementNode(el) ? el : document.querySelector(el);
        if(this.$el){
            this.compile(this.$el);
        }
    }
    /**
     * 递归每个元素，解析含有指令的元素
     * @param {object} el dom节点
     */
    compile(el){
        let text = el.textContent;
        let child = el.childNodes;
        for(const node of Array.from(child)){
            // 如果是element节点，则进行attributes的解释，并进行下一步递归
            if(Compile.isElementNode(node)){
                this.compileElement(node);
                this.compile(node);
            }else if(Compile.isTextNode(node)){
                // 如果是text节点，则进行t-text的处理
                this.compileText(node);
            }
        }
    }
    /**
     * 判断是否是元素节点
     * @param {*} node  dom节点
     */
    static isElementNode(node){
        return node.nodeType === 1;
    }
    /**
     * 判断是否是文本节点
     * @param {*} node dom节点
     */
    static isTextNode(node){
        return node.nodeType === 3;
    }
    /**
     * 编译文本节点
     * @param {*} node dom节点
     */
    compileText(node){
        let allContent = node.textContent;
        let newRes = allContent.replace(/\{\{([^}]+)\}\}/g,(word,content,i,str) => {
            let watcher = new Watcher(this.$data,content,(newValue) => {
                node.textContent = util.replaceValueByoldData(allContent,this.$data);
            })
            return util.getValueByKeyFromData(content,this.$data);
        });
        node.textContent = newRes;
    }
    /**
     * 编译元素节点（遍历编译attribt）
     * @param {*} node dom节点
     */
    compileElement(node){
        let reg = /^t-/;
        for(const attr of node.attributes){
            if(reg.test(attr.nodeName)){
                let key = attr.nodeValue;
                switch(attr.nodeName){
                    case 't-text':
                        new Watcher(this.$data,key,(newValue) => {
                            node.textContent = util.getValueByKeyFromData(key,this.$data);
                        })
                        node.textContent = util.getValueByKeyFromData(key,this.$data);
                        break;
                    case 't-model':
                        let that = this;
                        node.value = util.getValueByKeyFromData(attr.nodeValue,this.$data);
                        new Watcher(this.$data,key,(newValue) => {
                            node.value = util.getValueByKeyFromData(attr.nodeValue,this.$data);
                        })
                        node.addEventListener('input',function(e){
                            util.setDataByKey(that.$data,key,e.target.value)
                        })

                }
            }
        }
    }
}