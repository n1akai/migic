<script setup>
import { ref, computed } from "vue";
const props = defineProps({
  run: {
    type: Object,
  }
});

const flag = ref("https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_Morocco.svg/255px-Flag_of_Morocco.svg.png");

if (props.run.country != "morocco") {
  flag.value = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Flag_of_Iraq.svg/1200px-Flag_of_Iraq.svg.png";
}

const link = computed(() => {
  return props.run.link == "" ? "#" : props.run.link;
});
</script>
<template>
  <a :href="link">
    <div class="card">
      <div class="info-part">
        <img :src="props.run.avatar" />
        <p>{{ props.run.participant }}</p>
      </div>
      <div class="time-part">
        <p class="label">Time:</p>
        <p class="time">{{ props.run.data.time }}</p>
      </div>
      <div class="rank-part">
        <p class="rank">Rank: #{{ props.run.rank }}</p>
        <div class="more-info">
          <img :src="flag" alt="">
          <p class="uid">UID: {{ props.run.uid }}</p>
        </div>
      </div>
    </div>
  </a>
</template>

<style scoped>
a {
  background-image: url(https://firebasestorage.googleapis.com/v0/b/migicl.appspot.com/o/abyss.png?alt=media&token=e5a8d20b-27e7-4a6b-8836-51d9aad4b190);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  color: unset;
  text-decoration: none;
  display: block;
  margin: 6px 0;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
}

.card {
  display: flex;
  color: var(--white);
  font-weight: 500;
  flex-direction: row;
  width: 100%;
}

@media (min-width: 506px) {
  a {
    width: auto;
  }

  .card {
    width: 100%;
    min-width: 506px;
    height: 134px;
    flex-direction: row;
  }
}

.card .info-part {
  flex-basis: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.card .info-part img {
  border-radius: 50%;
  width: 85px;
  height: 85px;
  object-fit: cover;
}

.card .info-part p {
  padding-top: 0.4rem;
  font-size: 14px;
  text-align: center;
}



.card .time-part {
  flex-basis: 50%;
  flex: 1;
  padding: 8px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.card .time-part .label {
  font-size: 18px;
}

.card .time-part .time {
  font-size: 34px;
  color: var(--gold);
  text-align: center;
  margin-bottom: 14px;
  margin-left: 5px;
}

.card .rank-part {
  flex-basis: 25%;
  padding: 8px;
  display: flex;
  flex-direction: column;
}

.card .rank-part .rank {
  text-align: right;
  flex: 1;
}

.card .rank-part .more-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.card .rank-part .more-info img {
  padding-bottom: 2px;
  width: 40px;
  height: 23px;
  border-radius: 4px;
}

.card .rank-part .more-info .uid {
  font-size: 14px;
}
</style>