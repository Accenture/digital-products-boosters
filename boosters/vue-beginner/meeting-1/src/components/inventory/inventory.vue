<template>
  <div class="inventory">
    <div>Price: ${{ bike.price }}</div>
    <Counter :bike="bike" />
    <div>Stock Value: ${{ stockValue }}</div>
  </div>
</template>

<script src="./inventory.js"></script>
<style src="./inventory.css" scoped></style>
