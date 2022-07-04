<template>
  <div class="box">
    <van-field v-model="obj.name" label="姓名" />
    <van-field v-model="obj.phone" type="tel" label="手机号" />
    <van-field v-model="obj.address" label="地址" />
    <van-button type="danger" round @click="add">保存</van-button>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      obj: {
        name: "",
        phone: "",
        address: "",
      },
    };
  },
  methods: {
    ...mapMutations(["addFn"]),
    add() {
      this.addFn(this.obj);
      this.$router.back();
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
  width: 100vw;
  height: 100vh;
  background: #fff;
  text-align: center;
  .van-field {
    margin-bottom: 10px;
  }
  .van-button {
    width: 80%;
  }
}
</style>