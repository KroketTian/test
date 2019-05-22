class Watcher{
    constructor(vm,key,callback){
        this.key = key;
        this.callback = callback;
        Dep.target = this;
        this.oldVale = getValueByKeyFromData(key,vm.data);
        Dep.terget = null;
    }
    upData(){
        debugger
        this.callback ? this.callback() : '';
    }
}