<template>
  <div id="orderList">
    <div class="mainTab">
      <table class="header-table">
        <tbody>
        <tr>
          <th><h1>{{ factoryName }}</h1></th>
          <th>
            <select @change="getOrderItems" ref="plannedDate">
              <option v-for="(item,i) in dateList" :key="i" :selected="item.selected">{{ item.date }}</option>
            </select>
            <span class="shifts" v-for="(item,i) in shifts" :key="i">
              <input class="shifts" type="radio" :value="i" :checked="item.checked" name="shift">{{ item.shift }}</span>
          </th>
          <th><input type="button" @click="logout" id="logout" value="退出"></th>
        </tr>
        </tbody>
      </table>

      <table class="order-table">
        <tr class="order-header">
          <th>顺序</th>
          <th>工单编号</th>
          <th>产品名称</th>
          <th>工单量</th>
          <th>排程量</th>
          <th>已投产</th>
          <th>已下线</th>
          <th>班组/班次</th>
          <th>排程日期</th>
        </tr>
        <tbody>
        <tr v-for="(order,i) in orderList" :key="i" @click="assembleScan(order)">
          <td>{{ i + 1 }}</td>
          <td>{{ order.orderNumber }}</td>
          <td>{{ order.prodName }}</td>
          <td>{{ order.orderQty }}</td>
          <td>{{ order.plannedQty }}</td>
          <td>{{ order.producedQty }}</td>
          <td>{{ order.finishedQty }}</td>
          <td>{{ order.shiftGroup + '/' + order.shift }}</td>
          <td>{{ order.plannedDate }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Footer";
import moment from 'moment'

export default {
  name: "OrderList",
  components: {
    Footer
  },
  data() {
    return {
      nowDate: new Date(),
      factoryName: '电器一厂',
      dateList: [
        {date: moment(this.nowDate).add(-2, 'days').format('YYYY-MM-DD'), selected: false},
        {date: moment(this.nowDate).add(-1, 'days').format('YYYY-MM-DD'), selected: false},
        {date: moment(this.nowDate).format('YYYY-MM-DD'), selected: true},
        {date: moment(this.nowDate).add(1, 'days').format('YYYY-MM-DD'), selected: false},
        {date: moment(this.nowDate).add(2, 'days').format('YYYY-MM-DD'), selected: false}],
      shifts: [{shift: '白班', checked: true}, {shift: '晚班'}],
      orderList: [{
        orderKey: '',
        orderNumber: '',
        orderItemKey: '',
        orderItem: '',
        plannedDate: '',
        plannedQty: '',
        producedQty: '',
        finishedQty: '',
        shift: '',
        orderQty: '',
        shiftGroup: '',
        prodName: ''
      }]
    }
  },
  methods: {
    logout() {
      this.$store.commit("removeUser")
      this.$router.push("/")
    },
    getOrderItems() {
      this.$axios.post("/prod/orderItems", {
        plannedDate: this.$refs.plannedDate.value,
        workCenter: this.$store.state.user.workCenterNumber
      }).then(res => {
        if (res.data.code === 1) {
          this.orderList = res.data.data;
        }
        if (res.data.code === 2) {
          alert(res.data.message)
        }
      })
    },
    assembleScan(order) {
      this.$router.push({path: "/assembleScan", query: order})
    }
  },
  mounted() {
    this.getOrderItems()
  }
}
</script>

<style scoped>
.header-table {
  width: 100%;
  height: 10%;
  background-color: #0cb7bf;
}

select {
  font-size: 30px;
}

.shifts {
  font-size: 30px;
  height: 30px;
  width: 30px;
}

#logout {
  font-size: 30px;
}

.order-table {
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 0;
  font-size: 30px;
  border-spacing: 0;
  border-collapse: separate;
  border: solid 1px;
}


.order-header {
  background-color: #A8B0E1;
}

.order-table tr th {
  border-top: 1px solid;
  height: 80px;
}

.order-table tbody tr td {
  border-top: 1px solid;
  height: 80px;
}

#orderList {
  background-color: #f2f2f2;
  height: 100%;
}

.mainTab {
  height: 95%;
  width: 100%;
}
</style>