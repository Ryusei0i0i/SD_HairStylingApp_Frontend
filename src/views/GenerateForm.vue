<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

//post先のURL
const url = 'url';

// 選択された画像とpreview
const imageSrc = ref('');
const imageFile = ref<File | null>(null);
const imagePreview = ref<string | null>(null);
const handleFileChange = (event: any): void => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    imageFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
    imageSrc.value = URL.createObjectURL(file);
  } else {
    imageSrc.value = '';
  }
};


// 長さ 
const optionHair = { 
  'asitis': 'そのまま',
  'Pixie cut': 'ベリーショート',
  'Short-hair': 'ショート',
  'Shoulder-length-hair': 'セミロング',
  'Bob' : 'ボブ',
  'Medium-hair': 'ミディアム', 
  'Long-hair': 'ロング' 
  };
const hairStyle = ref('');
const hairStyleObj = {
  name: "長さ",
  form_name: "hairLength",
};
const onclickHair = (key: string): void => {
  hairStyle.value = key;
};


// カラー
const optionHairColor = {
  'asitis': 'そのまま',
  'Black-hair': 'ブラック',
  'Brown-hair': 'ブラウン',
  'Blonde-hair': 'ブロンド',
  'Platinum-hair': 'ホワイト',
  'Gray-hair': 'グレー',
  'Pink-hair': 'ピンク',
  };
const hairColor = ref('');
const hairColorObj = {
  name: "カラー",
  form_name: "hairColor",
};
const onclickColor = (key: string): void => {
  hairColor.value = key;
};



// パーマ
const optionHairCurl = {
  'asitis': 'そのまま',
  'straight-hair': 'ストレート',
  'Curl=inside-hair': '内巻きパーマ',
  'Curl-outside-hair': '外巻きパーマ',
  'Wavy-hair': 'ウェーブ',
  'Loose-curly-hair': '緩めのパーマ',
  };
const hairCurl = ref('');
const hairCurlObj = {
  name: "パーマ",
  form_name: "curl",
};
const onclickCurl = (key: string): void => {
  hairCurl.value = key
};



// prompt
const prompt = ref('');

const generatePrompt = (): string => {
  const promptArray = [
    '(human)',
    `(${hairStyle.value === 'asitis' ? null : hairStyle.value})`,
    `(${hairColor.value === 'asitis'? null : hairColor.value})`,
    `(${hairCurl.value === 'asitis'? null : hairCurl.value})`,
    'high resolution',
    'upper body',
    'Close-up shot'];

  const promptString = promptArray.filter(element => element !== '(null)').join(', ');
  prompt.value = promptString.replace(/-/g, ' ');
  return prompt.value;
};


const isLoading = ref(false);
const generatedImgSrc = ref('');
const onSubmit = async () => {
  isLoading.value = true;
  generatedImgSrc.value = '';
  // request body
  const formData = new FormData();
  if(imageFile.value){formData.append('file', imageFile.value);}
  formData.append('text',generatePrompt());
  axios.post(`${url}/generate`, formData,{
    withCredentials: true
  })
    .then(async response => {
      isLoading.value = false;
      generatedImgSrc.value = '../../public/images/image_temp.png';//良くない
    })
    .catch(error => {
      isLoading.value = false;
      generatedImgSrc.value = '';
    })
}
</script>

<template>
  <div class="wrapper">
    <div class="top">
      <p class="top_text">＊正方形に近い画像を選択してください。不快な画像が生成される場合があります。使用法の詳細は<RouterLink class="text_blue" v-bind:to="{name: 'UsagePage'}">こちら</RouterLink></p>
    </div><!-- /.top -->
    
    
    
    <!-- form -->
    <form class="submit_form" v-on:submit.prevent="onSubmit">
      
      <!-- selectedImg -->
      <div class="img_wrapper">
        <div class="img_container">
          <img v-if="imagePreview" class="img" id="UploadedImage" v-bind:src="imageSrc">
        </div>
        <div class="file_container">
          <input type="file" id="customFile" accept="image/*" v-on:change="handleFileChange">
          <label for="customFile" class="select_btn">画像を選択</label>
        </div>
      </div><!--img_wrapper-->


      <!-- hairLength -->
      <div class="option_container">
        <div class="option_wrapper">
          <img class="option_icon" src="../../public/outline_content_cut_black_24dp.png" alt="hair icon">
          <h2 class="option_name">{{ hairStyleObj.name }}</h2>
        </div><!-- /.option_wrapper -->
        <div class="section">
          <template v-for="(option, key) in optionHair" v-bind:key="key">
            <input class="radio_btn" type="radio" v-bind:name="hairStyleObj.form_name"
              v-bind:id="hairStyleObj.form_name + key" v-bind:value="key" v-model="hairStyle" required />
            <label class="select_label" v-bind:for="hairStyleObj.form_name + key" v-on:click="onclickHair(key)">{{ option
            }}</label>
          </template>
        </div>
      </div><!-- /.option_container -->

      <!-- hairColor -->
      <div class="option_container">
        <div class="option_wrapper">
          <img class="option_icon" src="../../public/outline_palette_black_24dp.png" alt="hair color icon">
          <h2 class="option_name">{{ hairColorObj.name }}</h2>
        </div><!-- /.option_wrapper -->
        <div class="section">
          <template v-for="(option, key) in optionHairColor" v-bind:key="key">
            <input class="radio_btn" type="radio" v-bind:name="hairColorObj.form_name"
              v-bind:id="hairColorObj.form_name + key" v-bind:value="key" v-model="hairColor" required />
            <label class="select_label" v-bind:for="hairColorObj.form_name + key" v-on:click="onclickColor(key)">{{ option
            }}</label>
          </template>
        </div>
      </div><!-- /.option_container -->
    
      <!-- hairCurl -->
      <div class="option_container">
        <div class="option_wrapper">
          <img class="option_icon" src="../../public/outline_water_black_24dp.png" alt="hair curl icon">
          <h2 class="option_name">{{ hairCurlObj.name }}</h2>
        </div><!-- /.option_wrapper -->
        <div class="section">
          <template v-for="(option, key) in optionHairCurl" v-bind:key="key">
            <input class="radio_btn" type="radio" v-bind:name="hairCurlObj.form_name"
              v-bind:id="hairCurlObj.form_name + key" v-bind:value="key" v-model="hairCurl" required />
            <label class="select_label" v-bind:for="hairCurlObj.form_name + key" v-on:click="onclickCurl(key)">{{ option
            }}</label>
          </template>
        </div>
      </div><!-- /.option_container -->


      <div class="submit_wrapper">
        <div class="submit_btn_container">
          <p class="top_text">＊すべての項目を選択してください。</p>
          <input type="submit" id="submit_btn" v-bind:disabled="isLoading">
          <label for="submit_btn" class="select_btn">画像を生成</label>
        </div><!-- /.submit_btn_container -->
      </div><!-- /.submit_wrapper -->
    </form>
    <div class="loader_container" v-bind:class="{ 'loader_display': !isLoading }">
      <div class="loader">
      </div><!-- /.loader -->
      <p class="loader_text">生成中です</p>
    </div>
    <div class="image-container">
      <div class="image-wrapper">
        <!-- <img v-bind:src="imgContainer"> -->
        <img v-show="generatedImgSrc" v-bind:src="generatedImgSrc" alt="Generated Image">
      </div>
    </div>
  </div><!-- /.wrapper -->
</template>

<style scoped>


.wrapper {
  flex: 1;
}
.img_container {
  width: 256px;
}

.file_container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.top {
  margin-top: 25px;
}
.top_text{
  font-size: 14px;
  margin-bottom: 10px;
}
.text_blue{
  color: cadetblue;
}
.submit_form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.submit {
  display: inline-block;
  margin: 5px 5px 5px 0;
  color: #333;
  font-size: 14px;
  border: 2px solid #333;
  border-radius: 999px;
  padding: 5px 20px;
}
.submit_btn_container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.option_wrapper{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
}
.option_icon {
  width: 25px;
  height: 25px;
}
.option_name {
  text-align: center;
  margin: 10px 0;
}

.section {
  display: flex;
  justify-content: center;
  flex-wrap: wrap
}

.wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}

.option_container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

input,
label {
  white-space: nowrap;
}

input[type="radio"],
input[type="file"],
input[type="submit"],
input[type="button"] {
  display: none;
}

.select_label {
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

.image-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}

.image-wrapper {
  margin: 10px;
  width: 256px;
}

.select_btn {
  background: #333;
  color: #fff;
  border-radius: 10px;
  padding: 5px 20px;
  margin-top: 5px;
}

input[type="submit"]:disabled+label {
  opacity: 0.8;
}

.submit_wrapper {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}

.loader_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5px;
}

.loader_display {
  display: none;
}

.loader {
  margin-top: 10px;
  border: 2px solid #333;
  border-radius: 50%;
  border-top: 2px solid #fff;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loader_text {
  font-size: 14px;
  margin-top: 5px;
}
</style>
