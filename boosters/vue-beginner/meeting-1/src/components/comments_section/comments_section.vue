<template>
  <div class="comments_section">
    <template v-if="comments && comments.length > 0">
      <div class="comment_item" :key="comment.id" v-for="comment in comments">
        <Comment :user="comment.user" :text="comment.text" />
      </div>
    </template>
    <template v-else>
      No comments
    </template>
  </div>
</template>

<script src="./comments_section.js"></script>
<style src="./comments_section.css" scoped></style>
