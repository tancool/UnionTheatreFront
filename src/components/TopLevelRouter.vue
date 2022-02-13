<template>
  <div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div class="bottom-btn">
      <div class="btn-wrap">
        <button @click="changePage('Index')">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-indexactive" />
          </svg>
          <h4>首页</h4>
        </button>
        <button @click="changePage('attention')">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-hot" />
          </svg>
          <h4>都在看</h4>
        </button>
        <button @click="changePage('theaters')">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gouwuche" />
          </svg>
          <h4>购票</h4>
        </button>
        <button @click="changePage('MyWallet')">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wallet" />
          </svg>
          <h4>票夹夹</h4>
        </button>
        <button @click="changePage('MyAccount')">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-cool" />
          </svg>
          <h4>我的</h4>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    changePage(pageName) {
      this.$router.push({ name: pageName });
    },
  },
};
</script>

<style scoped>
.bottom-btn {
  position: fixed;
  left: 0px;
  bottom: 0px;
  width: 20rem;
  z-index: 999;
  height: 50px;
  background: var(--primary-bg-color);
  border-top: 1px solid var(--line-color);
}
.bottom-btn .btn-wrap {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.bottom-btn .btn-wrap button {
  flex-basis: 20%;
  flex-shrink: 0;
  flex-grow: 1;
  height: 50px;
  background: var(--secondary-bg-color);
  color: var(--white-color);
  border: none;
}
.bottom-btn .btn-wrap .icon {
  width: 1rem;
  height: 1rem;
  color: var(--primary-embellish-color);
}
.bottom-btn .btn-wrap button h4 {
  font-weight: normal;
  font-size: 12px;
}
</style>