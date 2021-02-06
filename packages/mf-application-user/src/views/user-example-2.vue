<template>
  <div>
    <el-button @click="turnTo1">2222222</el-button>
  </div>
</template>

<script>
export default {
  name: 'user-example-2',
  methods: {
    turnTo1 () {
      this.$router.push({ name: 'UserExample1' })
    }
  }
}
</script>

<style>

</style>
