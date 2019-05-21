class Dep{
    constructor(){
        /** 观察列表 */
        this.observes = [];
    }
    addObserve(watcher){
        this.observes.push(watcher);
    }
    notify(){
        for(const watcher of this.observes){
            console.log(watcher);
            watcher.upData();
        }
    }
}