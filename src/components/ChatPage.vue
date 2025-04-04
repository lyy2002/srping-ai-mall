<template>
  <div class="chat-page">
    <!-- 聊天消息列表 -->
    <div class="chat-messages">
      <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多消息了"
          @load="onLoad"
      >
        <van-cell
            v-for="(message, index) in messages"
            :key="index"
            :title="message.isUser ? '你' : 'AI'"
            :value="message.content"
            value-align="right"
            :label="message.time"
        />
      </van-list>
    </div>
    <!-- 输入框和发送按钮 -->
    <div class="input-container">
      <van-field
          v-model="inputValue"
          placeholder="请输入消息"
          @keydown.enter="sendMessage"
      />
      <van-button @click="sendMessage">发送</van-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import request from '@/utils/request.js'
// 模拟对接 AI 聊天助手的函数，你需要替换为真实的 API 调用
const getAIResponse = async (message) => {
  const msg = await request.get('/ai/goods/test',{params:{'prompt':message}})
      .then(res=>{
        console.log(res)
        return res.body;
      }).catch(e=>{
        console.error(e)
      });
  return msg;
};

// 消息列表
const messages = ref([]);
// 输入框的值
const inputValue = ref('');
// 加载状态
const loading = ref(false);
// 加载完成状态
const finished = ref(false);

// 发送消息
const sendMessage = async () => {
  if (inputValue.value.trim() === '') return;

  // 添加用户消息
  const userMessage = {
    isUser: true,
    content: inputValue.value,
    time: new Date().toLocaleTimeString()
  };
  messages.value.push(userMessage);

  // 清空输入框
  inputValue.value = '';

  // 调用 AI 接口获取回复
  const aiResponse = await getAIResponse(userMessage.content);

  // 添加 AI 消息
  const aiMessage = {
    isUser: false,
    content: aiResponse,
    time: new Date().toLocaleTimeString()
  };
  messages.value.push(aiMessage);
};

// 加载更多消息（这里暂时不做实际加载，仅模拟）
const onLoad = () => {
  // 模拟加载完成
  setTimeout(() => {
    loading.value = false;
    finished.value = true;
  }, 1000);
};
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden; /* 防止页面整体滚动 */
}

.chat-page {
  position: relative;
  height: 100vh;
  width: 100vw; /* 确保宽度为视口宽度 */
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 防止页面整体滚动 */
}

.chat-messages {
  flex: 1;
  overflow-y: auto; /* 仅消息列表可垂直滚动 */
  padding-bottom: 60px; /* 为底部输入框留出空间 */
  -webkit-overflow-scrolling: touch; /* 优化移动端滚动体验 */
}

.input-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #eee;
  box-sizing: border-box;
}

.input-container van-field {
  flex: 1;
  margin-right: 10px;
}
</style>