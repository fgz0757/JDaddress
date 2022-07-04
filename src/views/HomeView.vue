<template>
  <div class="home">
    <Header :title="title" />
    <div class="cont">
      <div class="address">
        <div>
          <div class="color">寄</div>
          <div class="perpleCon border">
            <div>
              <div v-if="!activeObj">
                <h3 class="h">新建寄件人</h3>
                <p>复制完整信息,自动智能填写</p>
              </div>
              <div v-else>
                <h3 style="color: #000">
                  {{ activeObj.name }}{{ activeObj.phone }}
                </h3>
                <p>{{ activeObj.address }}</p>
              </div>
            </div>
            <div class="phone" @click="jiAddress">
              <van-icon name="newspaper-o" size="20px" color="#ccc" />
              <p>地址簿</p>
            </div>
          </div>
        </div>
        <div>
          <div class="shou color">收</div>
          <div class="perpleCon">
            <div>
              <div v-if="!activeObj1">
                <h3 class="h">新建收件人</h3>
                <p>复制完整信息,自动智能填写</p>
              </div>
              <div v-else>
                <h3 style="color: #000">
                  {{ activeObj1.name }}{{ activeObj1.phone }}
                </h3>
                <p>{{ activeObj1.address }}</p>
              </div>
            </div>
            <div class="phone" @click="shouAddress">
              <van-icon name="newspaper-o" size="20px" color="#ccc" />
              <p>地址簿</p>
            </div>
          </div>
        </div>
      </div>
      <div class="way">
        <div>
          <van-cell title="寄件方式">
            <div class="wayType">
              <div :class="active ? 'active' : ''" @click="take1">上门取件</div>
              <div
                :class="!active ? 'active' : ''"
                style="margin-left: 10px"
                @click="take2"
              >
                自送服务点
              </div>
            </div>
          </van-cell>
        </div>
        <div class="timer">
          <van-cell title="期待上门时间" is-link>
            <div v-if="tim.con" @click="timerFn">
              <span style="color: #000">{{ tim.con }}</span>
            </div>
            <div v-else @click="timerFn">
              <span>请选择</span>
            </div>
          </van-cell>
        </div>
        <div>
          <van-cell is-link>
            <div>
              <div v-if="!txt">
                <span @click="itemsFn">请填写</span>
              </div>
              <div v-else>
                <span class="txts" @click="itemsFn">{{ txt }}</span>
              </div>
            </div>
            <template #title>
              <span class="custom-title">物品信息</span>
              <van-tag type="danger">必填</van-tag>
            </template>
          </van-cell>
        </div>
      </div>
      <div class="deal">
        <van-checkbox v-model="checked" checked-color="#ee0a24" />
        <p>我已同意<span>《快件服务协议》</span></p>
      </div>
      <p class="btn">
        <van-button
          type="danger"
          :disabled="
            activeObj && activeObj1 && tim && txt && checked ? false : true
          "
          >下单</van-button
        >
      </p>
    </div>
    <van-action-sheet v-model="show" title="期望上门时间">
      <div class="content">
        <div class="content-l">
          <van-sidebar v-model="activeKey">
            <van-sidebar-item title="今天" />
            <van-sidebar-item title="明天" />
            <van-sidebar-item title="后天" />
          </van-sidebar>
        </div>
        <div class="content-r">
          <div v-if="activeKey == 0">
            <div v-if="!dayTime">今天已下班</div>
            <div
              v-for="el in dayTime"
              :key="el.id"
              class="li"
              @click="toggleTm(el.id)"
            >
              <span>{{ el.con }}</span>
              <div>
                <van-icon name="success" color="#ff0000" v-if="el.flg" />
                <van-icon name="success" color="transparent" v-else />
              </div>
            </div>
          </div>
          <div v-if="activeKey == 1">
            <div
              v-for="el in timerList"
              :key="el.id"
              class="li"
              @click="toggleTm(el.id)"
            >
              <span>{{ el.con }}</span>
              <div>
                <van-icon name="success" color="#ff0000" v-if="el.flg" />
                <van-icon name="success" color="transparent" v-else />
              </div>
            </div>
          </div>
          <div v-if="activeKey == 2">
            <div
              v-for="el in timerList"
              :key="el.id"
              class="li"
              @click="toggleTm(el.id)"
            >
              <span>{{ el.con }}</span>
              <div>
                <van-icon name="success" color="#ff0000" v-if="el.flg" />
                <van-icon name="success" color="transparent" v-else />
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>
<script>
import Header from "../components/header.vue";
import { mapMutations, mapState } from "vuex";
export default {
  name: "HomeView",
  data() {
    return {
      title: "京东快递",
      checked: false,
      active: true,
      show: false,
      activeKey: 0,
    };
  },
  components: {
    Header,
  },
  methods: {
    ...mapMutations(["timeFn", "toggleTm"]),
    jiAddress() {
      this.$router.push("/address");
    },
    shouAddress() {
      this.$router.push("/address1");
    },
    take1() {
      this.active = true;
    },
    take2() {
      this.active = false;
    },
    timerFn() {
      this.show = true;
      const data = new Date();
      const hours = data.getHours();
      this.timeFn(hours);
    },
    itemsFn() {
      this.$router.push("/items");
    },
  },
  computed: {
    ...mapState([
      "activeObj",
      "activeObj1",
      "timerList",
      "dayTime",
      "tim",
      "txt",
    ]),
  },
};
</script>
<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100vh;
  background: #f4f4f4;
  .cont {
    padding: 10px;
    & > div {
      margin-bottom: 5px;
      background: #fff;
    }
    .address {
      & > div {
        height: 69px;
        padding-left: 10px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        .color {
          width: 30px;
          height: 30px;
          font-size: 16px;
          line-height: 30px;
          text-align: center;
          color: #fff;
          border-radius: 50%;
          background: #000;
        }
        .shou {
          background: red;
        }
        .perpleCon {
          flex: 1;
          padding: 15px 10px;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .phone {
            text-align: center;
            color: #ccc;
            padding-left: 10px;
            border-left: 1px solid #ccc;
          }
          p {
            color: #ccc;
          }
          .h {
            color: #ccc;
          }
        }
        .border {
          border-bottom: 1px solid #ccc;
        }
      }
    }
    .way {
      margin: 10px 0;
      box-sizing: border-box;
      & > div {
        min-height: 42px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .timer {
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
      }
      .wayType {
        display: flex;
        align-items: center;
        div {
          height: 22px;
          padding: 0 5px;
          border: 1px solid #000;
          border-radius: 11px;
          font-size: 12px;
          line-height: 22px;
        }
        .active {
          border-color: red;
          background: rgba(255, 0, 0, 0.2);
          color: red;
        }
      }
    }
    .deal {
      background: transparent;
      display: flex;
      align-items: center;
      color: #999;
      span {
        color: #000;
        font-weight: 700;
      }
    }
  }
  .content {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-top: 1px solid #000;
    padding: 16px;
    display: flex;
    & > div {
      flex: 1;
    }
    .content-l {
      height: 100%;
      background: #f7f8fa;
      .van-sidebar {
        width: auto;
      }
    }
    .content-r {
      height: 300px;
      padding-left: 30px;
      padding-right: 10px;
      box-sizing: border-box;
      overflow: scroll;
      .li {
        height: 60px;
        line-height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    .content-r::-webkit-scrollbar {
      display: none;
    }
  }
}
.txts {
  display: inline-block;
  width: 120px;
  color: #000;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
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