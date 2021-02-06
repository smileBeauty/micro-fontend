<template>
  <div>
    <h1>customer2</h1>
    <el-button @click="turnTo1">2222222</el-button>
  </div>
</template>

<script>
export default {
  name: 'customer-example-2',
  methods: {
    turnTo1 () {
      this.$router.push({ name: 'CustomerExample1' })
    }
  }
}
</script>

<style>

</style>
