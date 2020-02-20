<template>
  <div class="bike_viewer">
    <button class="previous" @click="previousSlide()">PREVIOUS</button>
    <button class="next" @click="nextSlide()">NEXT</button>
    <BikeImage
      :comments="activeBike.comments"
      :image-url="activeBike.bikeImage"
      :name="activeBike.name"
    />
    <Inventory :bike="activeBike" :key="`bike-${activeBike.id}`" />
  </div>
</template>

<script src="./bike_viewer.js"></script>
<style src="./bike_viewer.css" scoped></style>
