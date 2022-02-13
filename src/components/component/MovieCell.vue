<template>
  <div class="show-movive-cell" @click="viewMoviesDetails(sendCellData.movieCode)">
    <div class="description-movie-img">
      <img :src="sendCellData.imgLinkOfMovie" />
    </div>

    <div class="description-moive-word">
      <div class="user-rating-tag">
        <span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-like" />
          </svg>
          <strong v-if="sendCellDataExtend">{{sendCellDataExtend.disLike}}</strong>
        </span>
        <span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-FriedEgg" />
          </svg>
          <strong v-if="sendCellDataExtend">{{sendCellDataExtend.disLike}}</strong>
        </span>
      </div>
      <div class="moive-name">
        <p>{{sendCellData.chinaNameOfMovie}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["sendCellData", "sendCellDataExtend"],
  data() {
    return {};
  },
  methods: {
    // 根据ID跳转到电影详情页面
    viewMoviesDetails(moviecode) {
      console.log("我被电击了");
      console.log(moviecode);
      this.$router.push({
        name: 'MovieDetailInfo',
        query: { moviecode: moviecode },
      });
    },
  },
};
</script>

<style scoped>
.icon {
  width: 0.8rem;
  height: 0.8rem;
}
.coming-soon-movie .show-movive-cell {
  width: 11.1%;
  height: 100%;
  /* border: 1px solid red; */
  padding: 4px;
}
.show-movive-cell {
  color: var(--white-color);
}
.show-movive-cell .description-movie-img {
  width: 100%;
  overflow: hidden;
  padding-bottom: 0.2rem;
}
.show-movive-cell .description-movie-img img {
  object-fit: cover;
  object-position: center;
  width: 100%;
  object-fit: cover;
}
.description-moive-word .user-rating-tag {
  margin-top: 0.2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.description-moive-word .user-rating-tag span {
  width: 40%;
  max-width: 50%;
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.description-moive-word .user-rating-tag span strong {
  font-weight: 200;
  font-size: 12px;
  padding: 0 0.2rem;
}
.description-moive-word .moive-name {
  padding: 0.2rem 0 0.2rem 0;
  text-align: center;
}
</style>