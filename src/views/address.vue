<template>
  <div class="about">
    <Header :title="title" />
    <div class="cont">
      <van-search
        v-model="value"
        shape="round"
        placeholder="请输入姓名/电话/地址关键字/地址别名"
        @input="search"
      />
      <div>
        <div class="addressCon" v-if="address.length >= 1">
          <p><span @click="deleFn">管理</span></p>
          <div class="all">
            <div v-for="el in address" :key="el.id" @click="toggle(el.id)">
              <div class="oneAddress">
                <div>
                  <strong>
                    <span>{{ el.name }}</span>
                    <span style="margin-left: 7px">{{ el.phone }}</span>
                  </strong>
                </div>
                <div>{{ el.address }}</div>
              </div>
              <div v-if="flg">
                <div @click="deFn(el.id)">
                  <van-icon name="delete-o" color="#ff0000" />
                </div>
              </div>
              <div v-else>
                <van-icon name="success" color="#ff0000" v-if="el.flag" />
                <van-icon name="success" color="transparent" v-else />
              </div>
            </div>
          </div>
        </div>
        <van-empty
          description="没有寄件人信息,添加"
          v-if="address.length < 1"
        />
      </div>
    </div>
    <div class="addAddress">
      <van-button type="danger" round @click="addFn">新增寄件人</van-button>
    </div>
    <van-dialog
      v-model="show"
      title="寄件人信息"
      show-cancel-button
      v-if="searchCon"
    >
      <p style="margin: 15px 0; text-align: center">
        <strong>{{ searchCon.name }}</strong> <span>{{ searchCon.phone }}</span>
      </p>
      <p style="text-align: center">{{ searchCon.address }}</p>
    </van-dialog>
  </div>
</template>
<script>
import Header from "../components/header.vue";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      title: "寄件人地址",
      value: "",
      show: false,
      timer: null,
    };
  },
  components: {
    Header,
  },
  computed: {
    ...mapState(["address", "flg", "searchCon"]),
  },
  methods: {
    ...mapMutations(["deleFn", "deFn", "toggle", "searchFn"]),
    addFn() {
      this.$router.push("/addAddress");
    },
    search(e) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.value = e;
        if (this.value) {
          this.searchFn(this.value);
          this.show = true;
        }
      }, 1000);
    },
  },
};
</script>
<style lang="scss" scoped>
.about {
  width: 100vw;
  height: 100vh;
  background: #f6f6f6;
}
.addressCon {
  p {
    height: 34px;
    line-height: 34px;
    text-align: right;
    padding: 0 20px;
    font-weight: 700;
  }
  .all {
    height: calc(100vh - 138px);
    overflow: scroll;
    & > div {
      height: 58px;
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      margin-bottom: 15px;
    }
  }
}
.addAddress {
  width: 100%;
  height: 15vh;
  padding-top: 15px;
  box-sizing: border-box;
  background: #fff;
  text-align: center;
  position: fixed;
  left: 0;
  bottom: 0;
  .van-button {
    width: 70%;
  }
}
</style>