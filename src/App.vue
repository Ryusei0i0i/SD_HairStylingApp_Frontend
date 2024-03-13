<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
const router = useRouter();
const isLoggedIn = ref(false);
let auth: any;
onMounted(()=> {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
  });
  function handleSignOut() {
  signOut(auth).then(() => {
    router.push('/');
  }).catch((error) => {
    console.log('ERROR SIGNOUT');
  });
}
</script>

<template>
  <div>
    <header>
      <nav class="header_nav">
        <div class="header_title_wrapper">
          <h1 class="header_title">OceanT</h1><!-- /.header_title -->
        </div><!-- /.header_title_wrapper -->
        <ul class="nav_list_items">
          <li class="list_item">

          </li><!-- /.list_item -->
        </ul><!-- /.nav_list -->
      </nav><!-- /.header_nav -->
    </header>
    <main>
      <RouterView />
    </main>
    <footer>
      <nav class="footer_nav">
        <ul class="footer_nav_items">
          <li class="nav_item">
            <RouterLink v-bind:to="{name: 'GenerateForm'}">
              生成ページへ
            </RouterLink>
          </li><!-- /.nav_item -->
          <li class="nav_item">
            <RouterLink v-bind:to="{name: 'UsagePage'}">
              使い方
            </RouterLink>
          </li><!-- /.nav_item -->
          <li class="nav_item">
            <button class="btn_google_footer" v-on:click="handleSignOut" v-if="isLoggedIn" >サインアウト</button>
          </li><!-- /.nav_item -->
        </ul><!-- /.footer_nav_items -->
      </nav><!-- /.footer_nav -->
    </footer>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Hina+Mincho&display=swap');

*,
::before,
::after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

html,
body,
h1,
h2,
h3,
h4,
h5,
h6,
ul,
ol,
dl,
li,
dt,
dd,
p,
div,
span,
img,
a,
table,
tr,
th,
td {
  margin: 0;
  padding: 0;
  border: 0;
  font-weight: normal;
  font-size: 100%;
  vertical-align: baseline;
  font-family: "Hina Mincho", serif;
}

header,
footer,
nav,
section,
article,
main,
aside,
figure,
figcaption {
  display: block;
}

ol,
ul {
  list-style: none;
  list-style-type: none;
}

img {
  max-width: 100%;
  height: auto;
  vertical-align: middle;
}

a {
  color: inherit;
  text-decoration: none;
}

main {
  display: flex;
  justify-content: center;
  padding: 0 10px;
  width: 100%;
  margin-top: 60px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

header {
  background: #333;
  color: #fff;
  padding: 5px 20px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  opacity: 0.9;
}

.header_title {
  font-size: 32px;
}

footer {
  background: #333;
  padding: 20px;
  color: #fff;
  font-size: 14px;
  opacity: 0.9;
  width: 100%; 
  margin-top: 10px; 
  height: 100%;
}

.footer_nav_items { 
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav_item {
  margin-right: 10px;
}
.btn_google_footer {
  background: #333;
  border: none;
  color: #fff;
}
</style>
