<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const email = ref("");
const password = ref("");
const errMsg = ref("");
const router = useRouter();


const login = async () => {
  try {
    await signInWithEmailAndPassword(getAuth(), email.value, password.value);
    console.log("Successfully signed!");
    router.push("/");
  } catch (error) {
    switch (error.code) {
      case "auth/invalid-email":
        errMsg.value = "Invalid email";
        break;
      case "auth/user-not-email":
        errMsg.value = "Email or password is wrong";
        break;
      case "auth/auth/invalid-credential":
        errMsg.value = "Email or password was wrong";
        break;
      case "auth/missing-password":
        errMsg.value = "Password is required";
        break;
      case "auth/user-disabled":
        errMsg.value = "Account is disabled";
        break;
      default:
        errMsg.value = error.message;
        break;
    }
    alert(errMsg.value);
  }
};
</script>

<template>
  <div class="login-form">
    <div class="input-group">
      <label for="email">Email</label>
      <input id="email" type="email" required v-model="email" />
    </div>
    <div class="input-group">
      <label for="password">Password</label>
      <input id="password" type="password" required v-model="password" />
    </div>
    <button @click="login">Login</button>
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

.login-form {
  padding: 36px;
  max-width: 506px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 8px;
  color: var(--white);
  transform: translate(-50%, -50%);
  background-color: var(--light-dark);
}

.login-form .input-group {
  width: 100%;
  padding: 4px 0;
}

.login-form .input-group input {
  padding: 6px;
  width: 100%;
  font-family: inherit;
  border-radius: 4px;
  outline: none;
  border: none;
  color: var(--black);
}

.login-form button {
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