class Watcher{
    constructor(data,key,callback){
        this.data = data
        this.key = key;
        this.callback = callback;
        Dep.target = this;
        this.oldVale = util.getValueByKeyFromData(this.key,data);
        Dep.target = null;
    }
    upData(){
        let newValue = util.replaceValueByoldData(this.key,this.data)
        this.callback ? this.callback(newValue) : '';
    }
}