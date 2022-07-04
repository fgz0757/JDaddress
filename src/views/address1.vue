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
        <div class="addressCon" v-if="address1.length >= 1">
          <p><span @click="deleFn1">管理</span></p>
          <div class="all">
            <div v-for="el in address1" :key="el.id" @click="toggle1(el.id)">
              <div class="oneAddress">
                <div>
                  <strong>
                    <span>{{ el.name }}</span>
                    <span style="margin-left: 7px">{{ el.phone }}</span>
                  </strong>
                </div>
                <div>{{ el.address }}</div>
              </div>
              <div v-if="flg1">
                <div @click="deFn1(el.id)">
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
          description="没有收件人信息,添加"
          v-if="address1.length < 1"
        />
      </div>
    </div>
    <div class="addAddress">
      <van-button type="danger" round @click="addFn1">新增收件人</van-button>
    </div>
    <van-dialog
      v-model="show"
      title="收件人信息"
      show-cancel-button
      v-if="searchCon1"
    >
      <p style="margin: 15px 0; text-align: center">
        <strong>{{ searchCon1.name }}</strong>
        <span>{{ searchCon1.phone }}</span>
      </p>
      <p style="text-align: center">{{ searchCon1.address }}</p>
    </van-dialog>
  </div>
</template>
<script>
import Header from "../components/header.vue";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      title: "收件人地址",
      value: "",
      show: false,
      timer: null,
    };
  },
  components: {
    Header,
  },
  computed: {
    ...mapState(["address1", "flg1", "searchCon1"]),
  },
  methods: {
    ...mapMutations(["deleFn1", "deFn1", "toggle1", "searchFn1"]),
    addFn1() {
      this.$router.push("/addAddress1");
    },
    search(e) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.value = e;
        if (this.value) {
          this.searchFn1(this.value);
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