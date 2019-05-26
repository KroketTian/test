const util = {
    getValueByKeyFromData(content,data){
        let keys = content.split('.');
        return keys.reduce((pre,next,index) => {
            return data[next]
        },data)
    },
    replaceValueByoldData(content,data){
        let newRes = content.replace(/\{\{([^}]+)\}\}/g,(word,p1,i,str) => {
            return util.getValueByKeyFromData(p1,data);
        });
        return newRes;
    },
    setDataByKey(data,key,newValue){
        let keys = key.split('.');
        let setData =  keys.reduce((pre,next,index) => {
            if(index === keys.length - 1){
                return data[next] = newValue;
            }
            return data[next]
        },data)
    }
};