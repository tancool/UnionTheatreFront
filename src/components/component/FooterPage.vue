<template>
  <div class="about-footer">
    <div class="first-text">
      <div class="first-text-left">
        <p>
          <a href="javascript:void(0)">获取礼品卡!</a>
        </p>
      </div>
      <div class="first-text-center">
        <p>
          <a href="javascript:void(0)">社区中心</a>
        </p>
      </div>
      <div class="javascript:void(0)">
        <p>
          <a href="javascript:void(0)">联盟酒馆</a>
        </p>
      </div>
    </div>

    <div class="notify-join-league">
      <p>
        <a href="javascript:void(0)">非商业作品@tanplay.com</a>
      </p>
      <span></span>
    </div>

    <div class="about-us">
      <ul>
        <li>
          <a href="javascript:void(0)">关于我们</a>
        </li>
        <li>
          <a href="javascript:void(0)">条款与政策</a>
        </li>
        <li>
          <a href="javascript:void(0)">在线帮助</a>
        </li>
        <li>
          <a href="javascript:void(0)">意见反馈</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style  scoped>
.about-footer {
  /* 这里使用grid布局 */
  display: grid;
  grid-template-rows: repeat(3, minmax(20px, 1.8rem));
  grid-template-columns: 100%;
  align-items: center;
  padding: 1.8rem 0 1.8rem 0;
}
.about-footer a{
  color: var(--white-color);
}
.about-footer .first-text {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 0 1rem;
}
.about-footer .first-text div {
  flex-basis: 50%;
  text-align: center;
  /* border-right: 1px solid red; */
}
.about-footer .first-text .first-text-center {
  border-left: 2px solid var(--primary-embellish-color);
  border-right: 2px solid var(--primary-embellish-color);
}

.about-footer .notify-join-league {
  text-align: center;
}
.about-footer .about-us ul {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.about-footer .about-us ul li {
  flex-basis: 50px;
  flex-grow: 1;
  text-align: center;
    border-right: 2px solid var(--primary-embellish-color);
}
.about-footer .about-us ul li:nth-of-type(4) {
  border: none;
}
</style>