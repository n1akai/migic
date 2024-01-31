<script setup>
import { ref } from "vue";
import SpeedRun from "@/components/SpeedRuns/SpeedRun.vue";
import { getDatabase, ref as dbRef, onValue } from "firebase/database";
import { getRuns } from "@/utils";

const runs = ref([]);
const reference = dbRef(getDatabase(), "runs2");
onValue(reference, s => {
  const data = s.val();
  runs.value = [];
  runs.value = getRuns(data);
});
</script>
<template>
  <div class="challenge-description">
    4.3 Abyss Chamber 2 First Half: 02/01 ~ 02/05
  </div>
  <div class="speed-runs" v-if="runs.length > 0">
    <SpeedRun v-for="run in runs" :key="run.id" :run="run" />
  </div>
  <div v-else class="loading">
    <div class="loader"></div>
  </div>
  <ul class="pagination" v-if="0 > 1">
    <li class="active">1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
  </ul>
</template>

<style scoped>
.challenge-description {
  font-size: 14px;
  padding: 0.3rem;
  text-align: center;
  color: var(--white);
}

.speed-runs {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: column;
  padding: 0 4px;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
}

.pagination {
  padding: 2rem 0px;
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination>li {
  display: block;
  margin: 0 2px;
  width: 44px;
  height: 44px;
  text-align: center;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--light-dark);
  color: var(--white);
  cursor: pointer;
}

.pagination>li.active {
  color: var(--gold);
}

.loader {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(farthest-side, #ffa516 94%, #0000) top/8px 8px no-repeat,
    conic-gradient(#0000 30%, #ffa516);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  animation: l13 1s infinite linear;
}

@keyframes l13 {
  100% {
    transform: rotate(1turn)
  }
}
</style>