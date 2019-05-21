class Observe{
    constructor(val){
        this.val = val;
        // 劫持数据
        this.observe(val);
    }
    observe(val){
        if (!val || Object.prototype.toString.call(val).match(/\[object (.+)\]/)[1] !== 'Object') {
            return;
        }
        let keys = Object.keys(val);
        for(const key of keys){
            this.observe(val[key]);
            this.setDefine(val,key);
        }
    }
    setDefine(val,key){
        let oldValue = val[key];
        let dep = new Dep();
        Object.defineProperty(val,key,{
            // 可配置，可以修改以及删除等
            configurable: true,
            // 可枚举
            enumerable: true,
            get:() => {
                return oldValue;
            },
            set: (newValue) => {
                if(oldValue !== newValue){
                    this.observe(newValue);
                    oldValue = newValue;
                    // 通知更新
                }
            }
        })
    }
}