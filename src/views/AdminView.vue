<script setup>
import { ref, computed } from "vue";
import { RouterLink } from 'vue-router';
import { useNotification } from "@kyvg/vue3-notification";
import { child, getDatabase, set, push, ref as refDb, onValue, remove } from "firebase/database";
import { getRuns, getNukes } from "@/utils";

const db = getDatabase();
const { notify } = useNotification();

const add = async () => {
  const type = challengeType.value == "speedrun" ? "runs" : "nukes";
  const theRef = child(refDb(db), type);
  const newOne = push(theRef);
  try {
    await set(newOne, {
      id: newOne.key,
      participant: participant.value,
      avatar: avatar.value,
      uid: uid.value,
      country: country.value,
      data: data.value,
      link: facebookPostLink.value
    });
    notify({
      title: "Done!",
      text: "Added Successfully!",
      type: "success"
    });
  } catch (error) {
    notify({
      title: "Error!",
      text: `${error.message}`,
      type: "error"
    });
  }
};

const participant = ref("");
const avatar = ref("");
const uid = ref("");
const country = ref("morocco");

const challengeType = ref("speedrun");
const facebookPostLink = ref("");
const data = ref({});

const selected = ref({});
const deleteSecelted = ref({});

const runs = ref([]);
const reference = refDb(getDatabase(), "runs");
onValue(reference, s => {
  const data = s.val();
  runs.value = [];
  runs.value = getRuns(data);
});

const nukes = ref([]);
const reference2 = refDb(getDatabase(), "nukes");
onValue(reference2, s => {
  const data = s.val();
  nukes.value = [];
  nukes.value = getNukes(data);
});

const update = async () => {
  const type = selected.value.data.time ? "runs" : "nukes";
  const theRef = child(refDb(db), type);
  try {
    await set(child(theRef, selected.value.id), selected.value);
    notify({
      title: "Done!",
      text: "Updated Successfully!",
      type: "success"
    });
  } catch (error) {
    notify({
      title: "Error!",
      text: `${error.message}`,
      type: "error"
    });
  }
};

const sortRanks = (array) => {
  let counter = 1;
  for (let i = 0; i < array.length; i++) {
    array[i].rank = counter;
    if (array[i + 1] && array[i].data.damage != array[i + 1].data.damage) {
      counter++;
    }
  }
  return array;
};

const ganyuNukes = computed(() => {
  return sortRanks(nukes.value.filter(e => e.data.character == "ganyu"));
});
const c0HutaoNukes = computed(() => {
  return sortRanks(nukes.value.filter(e => e.data.character == "c0hutao"));
});
const c3HutaoNukes = computed(() => {
  return sortRanks(nukes.value.filter(e => e.data.character == "c3hutao"));
});
const c5HutaoNukes = computed(() => {
  return sortRanks(nukes.value.filter(e => e.data.character == "c5hutao"));
});
const c0EulaNukes = computed(() => {
  return sortRanks(nukes.value.filter(e => e.data.character == "c0eula"));
});
const c6EulaNukes = computed(() => {
  return sortRanks(nukes.value.filter(e => e.data.character == "c6eula"));
});
const childNukes = computed(() => {
  return sortRanks(nukes.value.filter(e => e.data.character == "childe"));
});
const c0RaidenNukes = computed(() => {
  return sortRanks(nukes.value.filter(e => e.data.character == "c0raiden"));
});
const c2RaidenNukes = computed(() => {
  return sortRanks(nukes.value.filter(e => e.data.character == "c2raiden"));
});
const c3RaidenNukes = computed(() => {
  return sortRanks(nukes.value.filter(e => e.data.character == "c3raiden"));
});


const deleteOne = async () => {
  const type = deleteSecelted.value.data.time ? "runs" : "nukes";
  const theRef = child(refDb(db), type);
  try {
    await remove(child(theRef, deleteSecelted.value.id));
    notify({
      title: "Done!",
      text: "Deleted Successfully!",
      type: "success"
    });
  } catch (error) {
    notify({
      title: "Error!",
      text: `${error.message}`,
      type: "error"
    });
  }
};
</script>

<template>
  <RouterLink class="navigate-button" to="/">Home</RouterLink>
  <div class="container">
    <div class="form">
      <h3>Adding Form</h3>
      <div class="input-group">
        <label for="participant">Participant</label>
        <input id="participant" type="text" required v-model="participant" />
      </div>
      <div class="input-group">
        <label for="avatar">Avatar URL</label>
        <input id="avatar" type="url" required v-model="avatar" />
      </div>
      <div class="input-group">
        <label for="uid">UID</label>
        <input id="uid" type="text" required v-model="uid" />
      </div>
      <div class="input-group">
        <label for="country">Country</label>
        <select id="country" v-model="country">
          <option value="morocco">Morocco</option>
          <option value="iraq">Iraq</option>
        </select>
      </div>
      <div class="input-group">
        <label for="facebookPostLink">FB Post Link</label>
        <input id="facebookPostLink" type="url" required v-model="facebookPostLink" />
      </div>
      <div class="input-group">
        <label for="challenge">Challenge</label>
        <select id="challenge" v-model="challengeType">
          <option value="speedrun">Speedrun</option>
          <option value="nuke">Nuke</option>
        </select>
      </div>
      <div v-if="challengeType == 'speedrun'">
        <div class="input-group">
          <label for="time">Time</label>
          <input id="time" type="text" required v-model="data.time" placeholder="30s" />
        </div>
      </div>
      <div v-else>
        <div class="input-group">
          <label for="damage">Damage</label>
          <input id="damage" type="text" required v-model="data.damage" placeholder="1.251m" />
        </div>
        <div class="input-group">
          <label for="characters">Characters</label>
          <select id="characters" v-model="data.character">
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
      </div>
      <button @click="add">Add</button>
    </div>

    <div class="form">
      <h3>Updating Form</h3>
      <div class="input-group">
        <label for="speedrun-nuke">Select Speedrun/Nuke</label>
        <select id="speedrun-nuke" required v-model="selected">
          <optgroup label="Speedruns">
            <option :value="item" v-for="item in runs" :key="item.id">#{{ item.rank }} - {{ item.participant }} - {{
              item.data.time }}
            </option>
          </optgroup>
          <optgroup label="Nukes"></optgroup>
          <optgroup label="Ganyu">
            <option :value="item" v-for="item in ganyuNukes" :key="item.id">#{{ item.rank }} - {{ item.participant }} - {{
              item.data.damage }}
            </option>
          </optgroup>
          <optgroup label="C0 Hu Tao">
            <option :value="item" v-for="item in c0HutaoNukes" :key="item.id">#{{ item.rank }} - {{ item.participant }} -
              {{
                item.data.damage }}
            </option>
          </optgroup>
          <optgroup label="C3 Hu Tao">
            <option :value="item" v-for="item in c3HutaoNukes" :key="item.id">#{{ item.rank }} - {{ item.participant }} -
              {{
                item.data.damage }}
            </option>
          </optgroup>
          <optgroup label="C5 Hu Tao">
            <option :value="item" v-for="item in c5HutaoNukes" :key="item.id">#{{ item.rank }} - {{ item.participant }} -
              {{
                item.data.damage }}
            </option>
          </optgroup>
          <optgroup label="C0 Eula">
            <option :value="item" v-for="item in c0EulaNukes" :key="item.id">#{{ item.rank }} - {{ item.participant }} -
              {{
                item.data.damage }}
            </option>
          </optgroup>
          <optgroup label="C6 Eula">
            <option :value="item" v-for="item in c6EulaNukes" :key="item.id">#{{ item.rank }} - {{ item.participant }} -
              {{
                item.data.damage }}
            </option>
          </optgroup>
          <optgroup label="Child">
            <option :value="item" v-for="item in childNukes" :key="item.id">#{{ item.rank }} - {{ item.participant }} - {{
              item.data.damage }}
            </option>
          </optgroup>
          <optgroup label="C0 Raiden">
            <option :value="item" v-for="item in c0RaidenNukes" :key="item.id">#{{ item.rank }} - {{ item.participant }} -
              {{
                item.data.damage }}
            </option>
          </optgroup>
          <optgroup label="C2 Raiden">
            <option :value="item" v-for="item in c2RaidenNukes" :key="item.id">#{{ item.rank }} - {{ item.participant }} -
              {{
                item.data.damage }}
            </option>
          </optgroup>
          <optgroup label="C3 Raiden">
            <option :value="item" v-for="item in c3RaidenNukes" :key="item.id">#{{ item.rank }} - {{ item.participant }} -
              {{
                item.data.damage }}
            </option>
          </optgroup>
        </select>
      </div>
      <div class="input-group">
        <label for="participant">Participant</label>
        <input id="participant" type="text" required v-model="selected.participant" />
      </div>
      <div class="input-group">
        <label for="avatar">Avatar URL</label>
        <input id="avatar" type="url" required v-model="selected.avatar" />
      </div>
      <div class="input-group">
        <label for="uid">UID</label>
        <input id="uid" type="text" required v-model="selected.uid" />
      </div>
      <div class="input-group">
        <label for="country">Country</label>
        <select id="country" v-model="selected.country">
          <option value="morocco">Morocco</option>
          <option value="iraq">Iraq</option>
        </select>
      </div>
      <div class="input-group">
        <label for="facebookPostLink">FB Post Link</label>
        <input id="facebookPostLink" type="url" required v-model="selected.link" />
      </div>
      <div v-if="selected && selected.data && selected.data.time">
        <div class="input-group">
          <label for="time">Time</label>
          <input id="time" type="text" required v-model="selected.data.time" placeholder="30s" />
        </div>
      </div>
      <div v-else-if="selected && selected.data && selected.data.damage">
        <div class="input-group">
          <label for="damage">Damage</label>
          <input id="damage" type="text" required v-model="selected.data.damage" placeholder="1.251m" />
        </div>
        <div class="input-group">
          <label for="characters">Characters</label>
          <select id="characters" v-model="selected.data.character">
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
      </div>
      <button @click="update">Update</button>
    </div>

    <div class="form">
      <h3>Deleting Form</h3>
      <div class="input-group">
        <label for="speedrun-nuke">Select Speedrun/Nuke</label>
        <select id="speedrun-nuke" required v-model="deleteSecelted">
          <optgroup label="Speedruns">
            <option :value="item" v-for="item in runs" :key="item.id">#{{ item.rank }} - {{ item.participant }} - {{
              item.data.time }}
            </option>
          </optgroup>
          <optgroup label="Nukes"></optgroup>
          <optgroup label="Ganyu">
            <option :value="item" v-for="item in ganyuNukes" :key="item.id">#{{ item.rank }} - {{ item.participant }} - {{
              item.data.damage }}
            </option>
          </optgroup>
          <optgroup label="C0 Hu Tao">
            <option :value="item" v-for="item in c0HutaoNukes" :key="item.id">#{{ item.rank }} - {{ item.participant }} -
              {{
                item.data.damage }}
            </option>
          </optgroup>
          <optgroup label="C3 Hu Tao">
            <option :value="item" v-for="item in c3HutaoNukes" :key="item.id">#{{ item.rank }} - {{ item.participant }} -
              {{
                item.data.damage }}
            </option>
          </optgroup>
          <optgroup label="C5 Hu Tao">
            <option :value="item" v-for="item in c5HutaoNukes" :key="item.id">#{{ item.rank }} - {{ item.participant }} -
              {{
                item.data.damage }}
            </option>
          </optgroup>
          <optgroup label="C0 Eula">
            <option :value="item" v-for="item in c0EulaNukes" :key="item.id">#{{ item.rank }} - {{ item.participant }} -
              {{
                item.data.damage }}
            </option>
          </optgroup>
          <optgroup label="C6 Eula">
            <option :value="item" v-for="item in c6EulaNukes" :key="item.id">#{{ item.rank }} - {{ item.participant }} -
              {{
                item.data.damage }}
            </option>
          </optgroup>
          <optgroup label="Child">
            <option :value="item" v-for="item in childNukes" :key="item.id">#{{ item.rank }} - {{ item.participant }} - {{
              item.data.damage }}
            </option>
          </optgroup>
          <optgroup label="C0 Raiden">
            <option :value="item" v-for="item in c0RaidenNukes" :key="item.id">#{{ item.rank }} - {{ item.participant }} -
              {{
                item.data.damage }}
            </option>
          </optgroup>
          <optgroup label="C2 Raiden">
            <option :value="item" v-for="item in c2RaidenNukes" :key="item.id">#{{ item.rank }} - {{ item.participant }} -
              {{
                item.data.damage }}
            </option>
          </optgroup>
          <optgroup label="C3 Raiden">
            <option :value="item" v-for="item in c3RaidenNukes" :key="item.id">#{{ item.rank }} - {{ item.participant }} -
              {{
                item.data.damage }}
            </option>
          </optgroup>
        </select>
      </div>
      <button @click="deleteOne">Delete</button>
    </div>
  </div>
</template>

<style scoped>
label {
  display: block;
  padding-bottom: 6px;
}

button {
  display: block;
}

div {
  width: 100%;
}

h3 {
  padding-bottom: 8px;
  color: var(--white);
  text-align: center;
  font-size: 26px;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;
}

@media (min-width: 767px) {
  .container {
    align-items: flex-start;
    flex-direction: row;
  }
}

.form {
  padding: 36px;
  max-width: 506px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 8px;
  border-radius: 8px;
  color: var(--white);
  background-color: var(--light-dark);
}

.form .input-group {
  width: 100%;
  padding: 4px 0;
}

.form .input-group input,
.form .input-group select {
  padding: 6px;
  width: 100%;
  font-family: inherit;
  border-radius: 4px;
  outline: none;
  border: none;
  color: var(--black);
}

.form button {
  width: 100%;
  padding: 8px;
  margin-top: 12px;
  font-family: inherit;
  background-color: var(--gold);
  color: var(--white);
  outline: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>