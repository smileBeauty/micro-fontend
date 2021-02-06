<template>
  <div>
    <el-button @click="turnTo2">1111111</el-button>
  </div>
</template>

<script>
export default {
  name: 'user-example-1',
  methods: {
    turnTo2 () {
      this.$router.push({ name: 'UserExample2' })
    }
  }
}
</script>

<style>

</style>
