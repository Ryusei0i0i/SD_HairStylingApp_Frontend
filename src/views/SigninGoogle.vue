<script setup lang="ts">
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth';
import { useRouter } from 'vue-router';
const router = useRouter();
const auth = getAuth();


const signInWithGoogle = () => {
const provider = new GoogleAuthProvider();
signInWithPopup(auth, provider)
.then((result) => {
	router.push('/generate');
})
.catch((error) => {
});
}

</script>
<template>
	<div class="login">
		<div class="login_header_wrapper">
			<h1 class="login_header">Hello, OceanT</h1><!-- /.login_header -->
		</div><!-- /.login_header_wrapper -->
		<div class="btn_wrapper">
			<button class="btn_google" v-on:click="signInWithGoogle">Googleでサインインする</button>
		</div><!-- btn_wrapper -->
		<div class="text_wrapper">
			<p class="text">
				AIがあなたのスタイリングをサポートします。
			</p><!-- /.text -->
		</div><!-- /.text_wrapper -->
	</div>
</template>

<style>
.login{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.login_header_wrapper{
	margin-top: 20px;
	font-size: 32px;
}
.btn_wrapper{
	margin-top: 20px;
	margin-bottom: 20px;
}
.text_wrapper{
	width: 85%;
	text-align: center;
	margin-bottom: 20px;
}
.text{
	font-size: 14px;
}
.btn_google{
	border: 1px solid #333;
	background: #fff;
	border-radius: 10px;
	padding: 5px 10px;
}
</style>