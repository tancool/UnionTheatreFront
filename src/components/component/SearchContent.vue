<template>
  <div id="search-bar-elem">
    <div class="header">
      <div class="contaion-bar">
        <div class="srearch-bar">
          <div class="embellish-input">
            <div class="input-icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo" />
              </svg>
            </div>
            <div class="input-content">
              <input type="text" placeholder="搜索框仅仅是样式" />
            </div>
          </div>
          <p class="search-btn">搜索</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  methods: {
    clickSearchBtn(){

    }
  },
};
</script>

<style scoped>
#search-bar-elem {
  height: 48px;
  width: 100%;
  position: fixed;
  left: 0px;
  z-index: 999;
  background-color: var(--primary-bg-color);
}
#search-bar-elem .search-btn{
  border-radius: 8px;
  transition: all .5s;
  white-space: nowrap;
  text-align: center;
  width: 10%;
  flex-shrink: 0;
  flex-grow: 1;
}
#search-bar-elem .search-btn:hover{
  width: 30%;
  text-align: center;
  background-color: var(--primary-embellish-color);
}
.contaion-bar {
  /* background-color: var(--secondary-color); */
  padding: 0.4rem 1rem 0px 3rem;
}

.srearch-bar {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 10px;
}
.srearch-bar .embellish-input {
  height: 34px;
  width: 90%;
  flex-grow: 1;
  background: var(--secondary-bg-color);
  border-radius: 20px;
  position: relative;
  flex-shrink: 1;
}

.srearch-bar .embellish-input .input-icon {
  float: left;
  width: 20%;
  text-align: center;
  height: 100%;
  text-align: center;
}
.srearch-bar .embellish-input .input-icon svg {
  display: inline-block;
  width: 20px;
  height: 100%;
}
.srearch-bar .embellish-input .input-content {
  float: left;
  width: 70%;
  text-align: center;
  height: 100%;
  flex-grow: 0;
  flex-shrink: 1;
}

.srearch-bar .embellish-input .input-content input {
  border: none;
  outline: none;
  border-radius: 5px;
  line-height: 34px;
  width: 100%;
  float: left;
  height: 34px;
  margin: 0 auto;
  background: var(--secondary-bg-color);
  color: var(--white-color);
}

.contaion-bar .srearch-bar p {
  width: 2rem;
  text-align: center;
}
</style>