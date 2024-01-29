<script setup>
import { ref, computed } from "vue";
const props = defineProps({
  nuke: {
    type: Object,
  },
  namecard: {
    type: String
  }
});

const flag = ref("https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_Morocco.svg/255px-Flag_of_Morocco.svg.png");

if (props.nuke.country != "morocco") {
  flag.value = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Flag_of_Iraq.svg/1200px-Flag_of_Iraq.svg.png";
}

const link = computed(() => {
  return props.nuke.link == "" ? "#" : props.run.link;
});
</script>
<template>
  <a :href="link">
    <div class="card">
      <img :src="props.namecard" />
      <div class="container">
        <div class="info-part">
          <img :src="props.nuke.avatar" />
          <p>{{ props.nuke.participant }}</p>
        </div>
        <div class="damage-part">
          <p class="label">Damage:</p>
          <p class="damage">{{ props.nuke.data.damage }}</p>
        </div>
        <div class="rank-part">
          <p class="rank">Rank: #{{ props.nuke.rank }}</p>
          <div class="more-info">
            <img :src="flag" alt="">
            <p class="uid">UID: {{ props.nuke.uid }}</p>
          </div>
        </div>
      </div>
    </div>
  </a>
</template>

<style scoped>
a {
  display: flex;
  justify-content: center;
  align-items: center;
  color: unset;
  text-decoration: none;
  display: block;
  margin: 6px 0;
  border-radius: 8px;
  overflow: hidden;
}

.card {
  position: relative;
}

.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card .container {
  display: flex;
  border-radius: 8px;
  color: var(--white);
  font-weight: 500;
  flex-direction: row;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

@media (min-width: 506px) {
  .card {
    width: 100%;
    min-width: 506px;
    height: 134px;
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



.card .damage-part {
  flex-basis: 50%;
  padding: 8px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.card .damage-part .label {
  font-size: 18px;
}

.card .damage-part .damage {
  font-size: 34px;
  color: var(--white);
  text-align: center;
}

.card .rank-part {
  padding: 8px;
  display: flex;
  flex-direction: column;
  flex-basis: 25%;
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