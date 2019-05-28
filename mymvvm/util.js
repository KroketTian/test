const util = {
    /**
     * 通过key获取data中的响应数据
     * @param {string} content 数据的key，例如"name"、"animal.cat"
     * @param {object} data 数据集
     */
    getValueByKeyFromData(content,data){
        let keys = content.split('.');
        return keys.reduce((pre,next,index) => {
            return data[next]
        },data)
    },
    /**
     * 解析content中带有双括号绑定的内容，返回替换后的内容
     * @param {string} content 要替换的字符串，例如"{{name}}"、"{{animal.cat}}-----{{name}}"
     * @param {object} data 数据集
     */
    replaceValueByoldData(content,data){
        let newRes = content.replace(/\{\{([^}]+)\}\}/g,(word,p1,i,str) => {
            return util.getValueByKeyFromData(p1,data);
        });
        return newRes;
    },
    /**
     * 更新data中的值
     * @param {object} data 数据集
     * @param {string} key 数据的key，例如"name"、"animal.cat"
     * @param {string} newValue 替换值
     */
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