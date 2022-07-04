import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    flg:false,
    address:[
      {id:1,name:"李晓华",phone:"15131740768",address:"北京市昌平区南口镇",flag:true}
    ],
    searchCon:null,
    activeObj:null,
    address1:[
      {id:1,name:"李晓华",phone:"15131740768",address:"北京市昌平区南口镇",flag:true}
    ],
    flg1:false,
    searchCon1:null,
    activeObj1:null,
    timerList:[
      {id:1,con:"09:00-10:00",flg:true},
      {id:2,con:"10:00-11:00",flg:false},
      {id:3,con:"11:00-12:00",flg:false},
      {id:4,con:"12:00-13:00",flg:false},
      {id:5,con:"13:00-14:00",flg:false},
      {id:6,con:"14:00-15:00",flg:false},
      {id:7,con:"15:00-16:00",flg:false},
      {id:8,con:"16:00-17:00",flg:false},
      {id:9,con:"17:00-18:00",flg:false},
      {id:10,con:"18:00-19:00",flg:false},
      {id:11,con:"19:00-20:00",flg:false}
    ],
   dayTime:[],
   tim:{},
   txt:""
  },
  getters: {},
  mutations: {
    //新增寄件人
    addFn(state,con){
      const id = state.address.length+1;
      con.id = id,
      con.flag = false,
      state.address.push(con)
    },
    //管理寄件人
    deleFn(state){
        state.flg = !state.flg
    },
    // 删除寄件人
    deFn(state,id){
      const x = state.address.findIndex(el=>el.id==id)
      state.address.splice(x,1)
    },
    //切换选中状态
    toggle(state,id){
      state.address.map(el=>el.flag= false)
      const obj = state.address.find(el=>el.id==id)
      obj.flag = true
      state.activeObj = obj
    },
    //筛选信息
    searchFn(state,value){
        state.searchCon = state.address.find(el=>el.name==value||el.phone==value||el.address==value)
    },
    //新增收件人
    addFn1(state,con){
      const id = state.address1.length+1;
      con.id = id,
      con.flag = false,
      state.address1.push(con)
    },
    //管理收件人
    deleFn1(state){
        state.flg1 = !state.flg1
    },
    // 删除收件人
    deFn1(state,id){
      const x = state.address1.findIndex(el=>el.id==id)
      state.address1.splice(x,1)
    },
    //切换选中状态
    toggle1(state,id){
      state.address1.map(el=>el.flag= false)
      const obj = state.address1.find(el=>el.id==id)
      obj.flag = true
      state.activeObj1 = obj
    },
    //筛选信息
    searchFn1(state,value){
        state.searchCon1 = state.address1.find(el=>el.name==value||el.phone==value||el.address==value)
    },
    //筛选取件时间
    timeFn(state,x){
      state.dayTime = state.timerList.filter(el=>{
        const con = el.con.substr(0,2)
        return con>x+1
      })
    },
    //切换时间
    toggleTm(state,id){
      state.timerList.map(el=>el.flg=false)
      const el = state.timerList.find(el=>el.id==id)
      el.flg = true
      state.tim = el
    },
    //物品信息
    addItem(state,con){
      state.txt = con
    }
  },
  actions: {},
  modules: {},
});
