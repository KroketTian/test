class Dep{
    static target = null;
    constructor(){
        /** 观察列表，用于存储多个warcher */
        this.observes = [];
    }
    addObserve(watcher){
        this.observes.push(watcher);
    }
    notify(){
        for(const watcher of this.observes){
            watcher.upData();
        }
    }
}