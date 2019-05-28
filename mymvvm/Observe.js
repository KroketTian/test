class Observe{
    constructor(data){
        this.$data = data;
        // 劫持数据
        this.observe(this.$data);
    }
    /**
     * 递归对数据进行劫持
     * @param {object} data 要进行劫持的数据对象
     */
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
    /**
     * 对单个数据进行劫持
     * @param {object} data 要进行劫持的数据
     * @param {string} key 要进行劫持的数据的key
     */
    setDefine(data,key){
        let oldValue = data[key];
        // 每个数据对应一个dep，当劫持到数据之后通知dep更新数据
        let dep = new Dep();
        Object.defineProperty(data,key,{
            // 可配置，可以修改以及删除等
            configurable: true,
            // 可枚举
            enumerable: true,
            get:() => {
                //Dep.target为watcher对象，初始化watcher时会给Dep.target赋值并触发这个get
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