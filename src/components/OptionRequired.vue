<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

interface Props {
	name: string
	form_name: string
	options: Object
};
defineProps<Props>();
let selectedOption = ref('');
const onClick = (key: string): void => {
	selectedOption.value = key;
	axios.post('/api/generate', selectedOption)
	.then(response => {
		console.log('OK!',response.data);
	})
	.catch(error => {
		console.error('error', error);
	})
};

</script>

<template>
	<h2 class="option_name">{{ name }}</h2>
	<div class="container">
		<div class="section">
			<template v-for="(option, key) in options" v-bind:key="key">
				<input class="radio_btn" type="radio" v-bind:name="form_name" v-bind:id="form_name + key" v-bind:value="key"
					v-model="selectedOption" v-on:change="onClick(key)" required />
				<label v-bind:for="form_name + key">{{ option }}</label>
			</template>
		</div>
	</div><!-- /.container -->
</template>

<style scoped>
.option_name {
	text-align: center;
	margin: 10px 0;
}

.container {
	display: flex;
	justify-content: center;
	width: 100%;
}

input,
label {
	white-space: nowrap;
}

input[type="radio"] {
	display: none;
}

label {
	display: inline-block;
	margin: 5px 5px 5px 0;
	color: #333;
	font-size: 14px;
	border: 2px solid #333;
	border-radius: 999px;
	padding: 5px 20px;

}

label:hover {
	cursor: pointer;
}

input[type="radio"]:checked+label {
	background-color: #333;
	color: #fff;
}
</style>
