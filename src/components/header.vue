<template>
  <div class="header">
    <van-icon name="arrow-left" size="22px" @click="fn" />
    <div class="con">
      <span>{{ title }}</span>
      <div class="attention">
        <van-icon name="like-o" size="13px" />
        <span>关注</span>
      </div>
    </div>
    <van-icon name="ellipsis" size="22px" />
  </div>
</template>
<script>
export default {
  props: ["title"],
  name: "Header",
  data() {
    return {};
  },
  methods: {
    fn() {
      this.$router.back();
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  height: 50px;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  background: #fff;
  .con {
    position: relative;
    .attention {
      height: 20px;
      width: 50px;
      padding: 0 5px;
      box-sizing: border-box;
      border-radius: 10px;
      font-size: 12px;
      background: #e5e5e5;
      position: absolute;
      left: 150%;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>