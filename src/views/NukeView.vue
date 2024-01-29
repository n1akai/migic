<script setup>
import { ref, computed } from "vue";
import NukeItem from "@/components/Nukes/NukeItem.vue";
import { getDatabase, ref as dbRef, onValue } from "firebase/database";
import { getNukes } from "@/utils";
const nukes = ref([]);
const selectedChracter = ref("ganyu");
const reference = dbRef(getDatabase(), "nukes");
onValue(reference, s => {
  const data = s.val();
  nukes.value = [];
  nukes.value = getNukes(data);
});

const filtedNukes = computed(() => {
  const filtedNukesAll = nukes.value.filter(e => e.data.character == selectedChracter.value);
  let counter = 1;
  for (let i = 0; i < filtedNukesAll.length; i++) {
    filtedNukesAll[i].rank = counter;
    if (filtedNukesAll[i + 1] && filtedNukesAll[i].data.damage != filtedNukesAll[i + 1].data.damage) {
      counter++;
    }
  }
  return filtedNukesAll;
});

const nameCard = computed(() => {
  switch (selectedChracter.value) {
    case "c0hutao":
    case "c3hutao":
    case "c5hutao":
      return "https://firebasestorage.googleapis.com/v0/b/migicl.appspot.com/o/Namecard_Background_Hu_Tao_Spirit_Soother.webp?alt=media&token=f455efd1-d883-4348-9b4e-61bae939b277";
    case "c0eula":
    case "c6eula":
      return "https://firebasestorage.googleapis.com/v0/b/migicl.appspot.com/o/Namecard_Background_Eula_Ice-Sealed.webp?alt=media&token=dae18201-461e-4578-9e1d-5cbc5bf58de1";
    case "ganyu":
      return "https://firebasestorage.googleapis.com/v0/b/migicl.appspot.com/o/Namecard_Background_Ganyu_Qilin.webp?alt=media&token=6d39972c-4884-4e55-b193-361fab5e2025";
    case "childe":
      return "https://firebasestorage.googleapis.com/v0/b/migicl.appspot.com/o/Namecard_Background_Childe_Foul_Legacy.webp?alt=media&token=734a1ffc-14d3-4cf3-97fc-3cb4f70ae1cb";
    case "c0raiden":
    case "c2raiden":
    case "c3raiden":
      return "https://firebasestorage.googleapis.com/v0/b/migicl.appspot.com/o/Namecard_Background_Raiden_Shogun_Enlightenment.webp?alt=media&token=19f08459-5ff7-4084-bca8-ba64a9ce11ae";
    default:
      return "";
  }
});
</script>
<template>
  <div class="select-character-container">
    <select v-model="selectedChracter">
      <option value="c0hutao">C0 Hu Tao</option>
      <option value="c3hutao">C3 Hu Tao</option>
      <option value="c5hutao">C5 Hu Tao</option>
      <option value="c0eula">C0 Eula</option>
      <option value="c6eula">C6 Eula</option>
      <option value="ganyu">Ganyu</option>
      <option value="childe">Childe</option>
      <option value="c0raiden">C0 Raiden</option>
      <option value="c2raiden">C2 Raiden</option>
      <option value="c3raiden">C3 Raiden</option>
    </select>
  </div>
  <div class="speed-runs" v-if="nukes.length > 0">
    <NukeItem v-for="nuke in filtedNukes" :key="nuke.id" :nuke="nuke" :namecard="nameCard" />
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
select {
  display: block;
  padding: 6px;
  margin: auto;
  width: 320px;
  font-family: inherit;
  border-radius: 4px;
  outline: none;
  border: none;
  color: var(--black);
}

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

.select-character-container {
  padding: 0.5rem;
}
</style>