<template>
  <div id="assembleScan">
    <div class="header">
      <Header v-bind:factory="'电器一厂'"></Header>
    </div>
    <div class="scan">
      <div class="orderInfo">
        <table>
          <tr>
            <td>工单：</td>
            <td>{{ this.orderInfo.orderNumber || '' }}</td>
            <td>产品：</td>
            <td>{{ this.orderInfo.prodName || '' }}</td>
            <td>工单量：</td>
            <td>{{ this.orderInfo.orderQty || '' }}</td>
            <td>投产量：</td>
            <td>{{ this.orderInfo.producedQty || '' }}</td>
          </tr>
          <tr>
            <td>下线量：</td>
            <td>{{ this.orderInfo.finishedQty || '' }}</td>
            <td>待修量：</td>
            <td>{{ 0 }}</td>
            <td>仓库：</td>
            <td>{{ 10000202 }}</td>
          </tr>
        </table>
      </div>
      <div class="scanInfo">
        <table class="scanInfo_table">
          <tr>
            <td width="20%">主机条码</td>
            <td width="60%"><input type="text" :class="serialNumberFocus" @focus="onSerialNumberFocus"
                                   @blur="onSerialNumberBlur" v-model="scanInfo.serialNumber"
                                   @keydown.enter="checkSerialNumber" ref="serialNumber"></td>
            <td width="20%" rowspan="3" valign="top">
              <div><span class="small_text"><b>已扫描的零部件</b></span></div>
              <div><textarea class="key_part_area" v-model="formatPartSerialList" rows="5" readonly></textarea></div>
            </td>
          </tr>
          <tr>
            <td>部件条码</td>
            <td><input type="text" :class="partSerialFocus" @focus="onPartSerialFocus" @blur="onPartSerialBlur"
                       ref="partSerial" @keydown.enter="checkPartSerial"></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td colspan="1">
              <button type="button">确定</button>
              <button type="button" @click="clear">清空</button>
              <button type="button">返回</button>
              <button type="button">指导书</button>
            </td>
            <td></td>
          </tr>
        </table>
        <table class="lastScanInfo">
          <tr>
            <td><span>上次扫描信息</span></td>
          </tr>
          <tr>
            <td><span>主机条码:</span></td>
          </tr>
          <tr>
            <td><span>部件条码:</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="footer">
      <Footer></Footer>
    </div>

  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";

export default {
  name: "AssembleScan",
  components: {Header, Footer},
  props: ['order'],
  data() {
    return {
      orderInfo: {
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
      },
      scanInfo: {
        serialNumber: '',
        partSerialList: [],
      },
      serialNumberFocus: '',
      partSerialFocus: ''
    }

  },
  methods: {
    onSerialNumberFocus() {
      this.serialNumberFocus = 'onFocus'
    },
    onSerialNumberBlur() {
      this.serialNumberFocus = ''
    },
    onPartSerialFocus() {
      this.partSerialFocus = 'onFocus'
    },
    onPartSerialBlur() {
      this.partSerialFocus = ''
    },
    checkSerialNumber() {
      let orderNumber = this.orderInfo.orderNumber;
      let serialNumber = this.scanInfo.serialNumber;
      if (!serialNumber) {
        alert('请扫描主机条码')
        return;
      }
      this.$axios.post("/prod/checkSerialNumber", {orderNumber: orderNumber, serialNumber: serialNumber}).then(res => {
        if (!res.data.data) {
          alert(res.data.message)
          this.scanInfo.serialNumber = ''
          return;
        }
        this.$refs.partSerial.focus()
      })

    },
    checkPartSerial() {
      let serialNumber = this.scanInfo.serialNumber
      if (!serialNumber) {
        alert('请扫描主机条码');
        this.$refs.serialNumber.value = ''
        this.$refs.partSerial.value = ''
        this.$refs.serialNumber.focus()
        return;
      }
      let partSerial = this.$refs.partSerial.value
      if (!partSerial) {
        alert("请扫描部件条码");
        return;
      }
      if ("9999" === partSerial) {
        this.$refs.partSerial.value = ''
        this.assembleBinding()
      }
      this.$axios.get(`/prod/checkPartSerial/${partSerial}`).then(res => {
        if (res.data.code===1){
          this.scanInfo.partSerialList.push(partSerial)
        }
        if (res.data.code===2){
          alert(res.data.message)
        }
      })
      this.$refs.partSerial.value = '';
    },
    clear() {
      this.scanInfo.serialNumber = '';
      this.scanInfo.partSerialList = []
    },
    //绑定方法，提交数据
    assembleBinding() {
      let serialNumber = this.scanInfo.serialNumber
      if (!serialNumber) {
        alert('请扫描主机条码')
        this.$refs.serialNumber.focus()
        return;
      }
      let partSerials = this.scanInfo.partSerialList
      if (partSerials.length === 0) {
        alert('请扫描部件条码')
        this.$refs.serialNumber.focus()
        return;
      }
      this.$axios.post('/prod/assembleBinding', {serialNumber: serialNumber, partSerials: partSerials}).then(res => {

      })
    }
  },
  computed: {
    formatPartSerialList() {
      let parts = '';
      this.scanInfo.partSerialList.forEach(function (partSerial) {
        parts += partSerial + ';\n';
      });
      console.log(parts)
      return parts;

    }
  },
  mounted() {
    this.orderInfo = this.$route.query
  }
}
</script>

<style scoped>
#assembleScan {
  width: 100%;
  height: 100%;
}

.header {
  float: top;
  height: 10%
}

.scan {
  height: 80%;
}

.footer {
  float: top;
  height: 10%;
}

.orderInfo {
  width: 100%;
  font-size: 36px;
  background-color: #a8b0e1;
  border: 1px gray;
  padding-top: 20px;
}

.orderInfo table {
  width: 100%;
}

.scanInfo {
  width: 100%;
  font-size: 50px;
  padding-top: 10px;
}

.scanInfo_table {
  margin: auto;
  width: 100%;
  height: 30%;
}

.onFocus {
  background-color: rgb(231, 236, 74);
}

.small_text {
  font-size: 20px;
}

input {
  font-size: 60px;
  width: 90%;
  height: 80%;
}

.key_part_area {
  font-size: 40px;
}

button {
  font-size: 45px;
  margin-left: 5%;
  margin-right: 5%;
}

table {
  width: 100%;
}

.lastScanInfo {
  font-size: 30px;
  background-color: #d4c3af;
  margin-top: 10%;
}
</style>