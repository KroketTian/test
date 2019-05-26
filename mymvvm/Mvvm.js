class Mvvm{
    constructor(dom,per){
        this.$dom = dom;
        this.$per = per;
        new Observe(this.$per.data);
        new Compile(this.$dom,this.$per.data)
    }
}