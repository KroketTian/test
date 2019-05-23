class Watcher{
    constructor(vm,key,callback){
        this.key = key;
        this.callback = callback;
        Dep.target = this;
        this.oldVale = getValueByKeyFromData(key,vm.data);
        Dep.target = null;
    }
    upData(){
        this.callback ? this.callback() : '';
    }
}