<script setup>
import { RouterView, RouterLink } from 'vue-router';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, onMounted } from "vue";
const adminButton = ref(false);
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeLister = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeLister();
        resolve(user);
      },
      reject
    );
  });
};

onMounted(async () => {
  const user = await getCurrentUser();

  if (user != null) {
    adminButton.value = true;
  } else {
    adminButton.value = false;
  }
});
</script>
<template>
  <RouterLink v-if="adminButton" class="navigate-button" to="/admin">
    Admin
  </RouterLink>
  <h1>Morocco & Iraq GI Collaboration</h1>
  <h3>Challegnes</h3>
  <div class="challenges-container">

    <RouterLink class="speed-run" to="/">
      Abyss Speedrun
    </RouterLink>
    <RouterLink class="nuke" to="/nuke">
      Nuke
    </RouterLink>
  </div>
  <RouterView />
</template>

<style scoped>
h1 {
  color: var(--white);
  text-align: center;
  padding: 1rem;
  font-weight: 600;
}

h3 {
  color: var(--white);
  text-align: center;
  padding-top: 2rem;
  font-weight: 600;
}

.challenges-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.challenges-container>a {
  width: 100%;
  max-width: 261px;
  text-decoration: none;
  color: unset;
  text-align: center;
  padding: 12px 0;
  background-color: var(--white);
  cursor: pointer;
  transition: 0.3s;
}

.challenges-container>a.router-link-exact-active {
  background-color: var(--gold);
  color: var(--white);
}


.challenges-container>a:hover:not(.router-link-exact-active) {
  background-color: var(--gold-50);
}

.challenges-container .speed-run {
  border-top-left-radius: 999px;
  border-bottom-left-radius: 999px;
}

.challenges-container .nuke {
  border-top-right-radius: 999px;
  border-bottom-right-radius: 999px;
}
</style>