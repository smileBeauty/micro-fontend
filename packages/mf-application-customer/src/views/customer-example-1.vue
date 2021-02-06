<template>
  <div>
    <h1>customer1</h1>
    <el-button @click="turnTo2">1111111</el-button>
    <el-button @click="turnToCustomer1">跳转到其他子应用</el-button>
  </div>
</template>

<script>
export default {
  name: 'customer-example-1',
  methods: {
    turnTo2 () {
      this.$router.push({ name: 'CustomerExample2' })
    },
    turnToCustomer1 () {
      window.location.href = '/user/user-example-1'
    }
  }
}
</script>

<style>

</style>
