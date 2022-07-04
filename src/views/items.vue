<template>
  <div class="box">
    <Header :title="title" />
    <div class="con">
      <div class="weight">
        <div>
          <strong>重量</strong>
          <van-stepper v-model="value" />
        </div>
        <p>注:重量以快递员称重为准，快件'虚胖'要按体积收费哦~</p>
      </div>
      <div class="type">
        <van-cell value="寄件违禁品查询" is-link>
          <template #title>
            <strong class="custom-title">物品类型</strong>
            <van-tag type="danger">必填</van-tag>
          </template>
        </van-cell>
        <div class="list">
          <template v-for="el in count">
            <button :class="el.flg ? 'active' : ''" @click="fn(el.id)">
              {{ el.text }}
            </button>
          </template>
        </div>
      </div>
      <div class="message">
        <div class="title">
          <van-cell-group>
            <van-cell title="给快递捎话" value="纸箱需要额外收费哦~" />
          </van-cell-group>
          <van-field
            v-model="val"
            rows="2"
            autosize
            label="留言"
            type="textarea"
            maxlength="100"
            placeholder="请输入留言"
            show-word-limit
          />
          <div class="txts">
            <span :key="i" v-for="(el, i) in list" @click="addFn">{{
              el
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="btn">
      <van-button type="danger" @click="btnFn">确定</van-button>
    </div>
  </div>
</template>
<script>
import Header from "../components/header.vue";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      title: "物品信息",
      value: 1,
      count: [
        { id: 1, text: "文件证照", flg: true },
        { id: 2, text: "数码产品", flg: false },
        { id: 3, text: "珠宝首饰", flg: false },
        { id: 4, text: "美妆日用", flg: false },
        { id: 5, text: "服装鞋帽", flg: false },
        { id: 6, text: "特产", flg: false },
        { id: 7, text: "年货", flg: false },
        { id: 8, text: "易碎物品", flg: false },
        { id: 9, text: "其它", flg: false },
      ],
      val: "",
      list: ["带文件封", "带防水袋", "带纸箱", "要爬梯", "上门前联系"],
    };
  },
  components: {
    Header,
  },
  methods: {
    ...mapMutations(["addItem"]),
    fn(id) {
      this.count.map((el) => (el.flg = false));
      const el = this.count.find((el) => el.id == id);
      el.flg = true;
    },
    addFn(e) {
      let txt = e.target.innerText;
      if (this.val) {
        if (this.val.search(txt) == -1) {
          this.val = this.val.concat(txt);
        }
      } else {
        this.val = this.val.concat(txt);
      }
    },
    btnFn() {
      this.addItem(this.val);
      this.$router.push("/");
    },
  },
};
</script>
<style lang="scss" scoped>
.con {
  height: calc(100vh - 50px);
  width: 100%;
  background: #f6f6f6;
  padding: 15px;
  box-sizing: border-box;
  & > div {
    margin-bottom: 15px;
    background: #fff;
    padding: 8px;
    box-sizing: border-box;
  }
  .weight {
    height: 66px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    div {
      display: flex;
      justify-content: space-between;
    }
    p {
      font-size: 12px;
      color: #999;
    }
  }
  .type {
    height: 156px;
    .van-cell {
      padding: 0;
    }
    .list {
      margin-top: 5px;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-content: center;
      button {
        width: 32%;
        height: 26px;
        text-align: center;
        line-height: 26px;
        border: 1px solid #666;
        border-radius: 13px;
        margin-top: 10px;
      }
      .active {
        border-color: red;
        background: rgba(255, 0, 0, 0.2);
        color: red;
      }
    }
  }
  .message {
    .van-cell {
      padding: 0;
      font-weight: 700;
    }
    .txts {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      span {
        height: 26px;
        padding: 0 8px;
        border-radius: 13px;
        border: 1px solid #000;
        margin-top: 7px;
      }
    }
  }
}
.btn {
  width: 100%;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  .van-button {
    width: 80%;
    border-radius: 22px;
  }
}
</style>