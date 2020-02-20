<template>
  <div id="app" class="cols cols-2">
    <div class="col">
      <h1>Comment</h1>
      <Comment
        :text="demoBike.comments[0].text"
        :user="demoBike.comments[0].user"
      />
      <h1>CommentsSection</h1>
      <CommentsSection :comments="demoBike.comments" />
      <h1>BikeImage</h1>
      <BikeImage
        :comments="demoBike.comments"
        :image-url="demoBike.bikeImage"
        :name="demoBike.name"
      />
      <h1>Counter</h1>
      <Counter :bike="demoBike" :total="demoBike.qty" />
      <h1>Inventory</h1>
      <Inventory :bike="demoBike" />
    </div>
    <div class="col">
      <div class="demo">
        <button
          class="render-btn"
          @click="renderDemo = !renderDemo"
          :style="{ 'background-color': buttonColor }"
        >
          {{ buttonText }}
        </button>
        <template v-if="renderDemo">
          <div class="bike-item" :key="`bike-${demoBike.id}`">
            <BikeImage
              :comments="demoBike.comments"
              :image-url="demoBike.bikeImage"
              :name="demoBike.name"
            />
            <Inventory :bike="demoBike" :key="`bike-${demoBike.id}`" />
          </div>
        </template>
      </div>
      <h1>BikeViewer</h1>
      <BikeViewer :bikes="bikes" />
    </div>
  </div>
</template>

<script src="./app.js"></script>
<style src="./app.css"></style>
