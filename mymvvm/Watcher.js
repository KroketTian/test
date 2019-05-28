class Watcher{
    constructor(data,key,callback){
        this.data = data
        this.key = key;
        this.callback = callback;

        Dep.target = this;
        // 这一步会触发Observe劫持到的set方法
        this.oldVale = util.getValueByKeyFromData(this.key,data);
        Dep.target = null;
    }
    upData(){
        let newValue = util.replaceValueByoldData(this.key,this.data)
        this.callback ? this.callback(newValue) : '';
    }
}