<template>
  <div class="footer">
    <table>
      <tr>
        <td>
          <span>用户名:{{ user.userDesc }}</span>
        </td>
        <td>
          <span>工位:{{ user.workCenterDesc }}</span>
        </td>
        <td>
          <span>日期:{{ nowDate|dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>

export default {
  name: "Footer",
  props: {},
  data() {
    return {
      user: this.$store.state.user,
      nowDate: new Date()
    }
  },
  mounted() {
    this.timer = setInterval( ()=> {
      this.nowDate = new Date()
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}
</script>

<style scoped>
.footer {
  float: bottom;
  position: absolute;
  background-color: #0cb7bf;
  width: 100%;
  text-align: left;
  margin-bottom: 0;
  font-size: 35px;
}

.footer table {
  width: 100%;
}
.footer table tr td {
  width: 33%;
}
table{
  height: 100%;
  width: 100%;
}
</style>