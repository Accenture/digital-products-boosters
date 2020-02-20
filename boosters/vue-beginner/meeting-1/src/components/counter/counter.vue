<template>
  <div class="counter">
    <span class="btn decrementer" @click="bike.decrement()">-</span>
    <span class="total">{{ bike.qty }}</span>
    <span class="btn incrementer" @click="bike.increment()">+</span>
  </div>
</template>

<script src="./counter.js"></script>
<style src="./counter.css" scoped></style>
