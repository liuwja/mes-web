<template>
  <div class="header">
    <table>
      <tr>
        <td>
          <span>{{ this.factory }}</span>
        </td>
        <td>
          <button class="logout" @click="logout">退出</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: ['factory'],
  methods:{
    logout() {
      this.$store.commit("removeUser")
      this.$router.push("/")
    }
  }

}
</script>

<style scoped>
.header {
  float: top;
  position: absolute;
  background-color: #0cb7bf;
  width: 100%;
  text-align: left;
  margin-bottom: 0;
  font-size: 35px;
}

.header table {
  width: 100%;
}
.logout{
  font-size: 30px;
  float: right;
}
table{
  width: 100%;
  height: 100%;
}

</style>