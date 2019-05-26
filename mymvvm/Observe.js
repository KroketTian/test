class Observe{
    constructor(data){
        this.$data = data;
        // 劫持数据
        this.observe(this.$data);
    }
    observe(data){
        if (!data || Object.prototype.toString.call(data).match(/\[object (.+)\]/)[1] !== 'Object') {
            return;
        }
        let keys = Object.keys(data);
        for(const key of keys){
            this.observe(data[key]);
            this.setDefine(data,key);
        }
    }
    setDefine(data,key){
        let oldValue = data[key];
        let dep = new Dep();
        Object.defineProperty(data,key,{
            // 可配置，可以修改以及删除等
            configurable: true,
            // 可枚举
            enumerable: true,
            get:() => {
                Dep.target ? dep.addObserve(Dep.target) : '';
                return oldValue;
            },
            set: (newValue) => {
                if(oldValue !== newValue){
                    this.observe(newValue);
                    oldValue = newValue;
                    // 通知更新
                    dep.notify();
                }
            }
        })
    }
}