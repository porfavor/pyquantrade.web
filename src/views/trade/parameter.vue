<template>
  <div class="app-container">

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      :header-cell-style="{'background-color': '#2f75b5', 'color': '#ffffff', 'border': '1px dashed #0F0A3B !important'}"
      :cell-style="changeCellStyle"
      @sort-change="sortChange"
    >
      <el-table-column label="Code" prop="code" sortable="custom" align="center" width="120px" :class-name="getSortClass('code')">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="LongShort" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.long_short }}</span>
        </template>
      </el-table-column>
      <el-table-column label="ShareLimit" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.share_limit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="TradeUnit" width="90px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.trade_unit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="UnitCount" width="90px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.unit_count }}</span>
        </template>
      </el-table-column>
      <el-table-column label="TradeGroup" width="105px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.trade_group }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Interval" width="75px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.interval }}</span>
        </template>
      </el-table-column>
      <el-table-column label="MaShort" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ma_short }}</span>
        </template>
      </el-table-column>
      <el-table-column label="MaLong" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ma_long }}</span>
        </template>
      </el-table-column>
      <el-table-column label="AutoLS" width="75px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.auto_ls }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Direction" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.direction }}</span>
        </template>
      </el-table-column>
      <el-table-column label="AtrLen" width="75px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.atr_len }}</span>
        </template>
      </el-table-column>
      <el-table-column label="AtrRatio" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.atr_ratio }}</span>
        </template>
      </el-table-column>
      <el-table-column label="BaseAtr" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.base_atr_ratio }}</span>
        </template>
      </el-table-column>
      <el-table-column label="AtrUpper" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.atr_upper_ratio }}</span>
        </template>
      </el-table-column>
      <el-table-column label="AtrLower" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.atr_lower_ratio }}</span>
        </template>
      </el-table-column>
      <el-table-column label="OverBuy" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.over_buy }}</span>
        </template>
      </el-table-column>
      <el-table-column label="AliveLine" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.alive_line }}</span>
        </template>
      </el-table-column>
      <el-table-column label="DeadLine" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.dead_line }}</span>
        </template>
      </el-table-column>
      <el-table-column label="OverSell" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.over_sell }}</span>
        </template>
      </el-table-column>
      <el-table-column label="MinsMa" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mins_ma }}</span>
        </template>
      </el-table-column>
      <el-table-column label="MinsBoll" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mins_boll }}</span>
        </template>
      </el-table-column>
      <el-table-column label="SwingDo" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.swing_do }}</span>
        </template>
      </el-table-column>
      <el-table-column label="SwingKeep" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.swing_keep }}</span>
        </template>
      </el-table-column>
      <el-table-column label="XDXR" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.xdxr }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Update" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.update }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="Code" prop="code">
          <el-input v-model="temp.code" disabled="true" />
        </el-form-item>
        <el-form-item label="LongShort" prop="long_short">
          <el-input v-model="temp.long_short" />
        </el-form-item>
        <el-form-item label="ShareLimit" prop="share_limit">
          <el-input v-model="temp.share_limit" />
        </el-form-item>
        <el-form-item label="TradeUnit" prop="trade_unit">
          <el-input v-model="temp.trade_unit" />
        </el-form-item>
        <el-form-item label="UnitCount" prop="unit_count">
          <el-input v-model="temp.unit_count" />
        </el-form-item>
        <el-form-item label="TradeGroup" prop="trade_group">
          <el-input v-model="temp.trade_group" />
        </el-form-item>
        <el-form-item label="Interval" prop="trade_unit">
          <el-input v-model="temp.interval" />
        </el-form-item>
        <el-form-item label="MaShort" prop="ma_short">
          <el-input v-model="temp.ma_short" />
        </el-form-item>
        <el-form-item label="MaLong" prop="ma_long">
          <el-input v-model="temp.ma_long" />
        </el-form-item>
        <el-form-item label="AutoLS" prop="auto_ls">
          <el-input v-model="temp.auto_ls" />
        </el-form-item>
        <el-form-item label="Direction" prop="direction">
          <el-input v-model="temp.direction" />
        </el-form-item>
        <el-form-item label="AtrLen" prop="atr_len">
          <el-input v-model="temp.atr_len" />
        </el-form-item>
        <el-form-item label="AtrRatio" prop="atr_ratio">
          <el-input v-model="temp.atr_ratio" />
        </el-form-item>
        <el-form-item label="BaseAtr" prop="base_atr_ratio">
          <el-input v-model="temp.base_atr_ratio" />
        </el-form-item>
        <el-form-item label="AtrUpper" prop="atr_upper_ratio">
          <el-input v-model="temp.atr_upper_ratio" />
        </el-form-item>
        <el-form-item label="AtrLower" prop="atr_lower_ratio">
          <el-input v-model="temp.atr_lower_ratio" />
        </el-form-item>
        <el-form-item label="OverBuy" prop="over_buy">
          <el-input v-model="temp.over_buy" />
        </el-form-item>
        <el-form-item label="AliveLine" prop="alive_line">
          <el-input v-model="temp.alive_line" />
        </el-form-item>
        <el-form-item label="DeadLine" prop="dead_line">
          <el-input v-model="temp.dead_line" />
        </el-form-item>
        <el-form-item label="OverSell" prop="over_sell">
          <el-input v-model="temp.over_sell" />
        </el-form-item>
        <el-form-item label="MinsMa" prop="mins_ma">
          <el-input v-model="temp.mins_ma" />
        </el-form-item>
        <el-form-item label="MinsBoll" prop="mins_boll">
          <el-input v-model="temp.mins_boll" />
        </el-form-item>
        <el-form-item label="SwingDo" prop="swing_do">
          <el-input v-model="temp.swing_do" />
        </el-form-item>
        <el-form-item label="SwingKeep" prop="swing_keep">
          <el-input v-model="temp.swing_keep" />
        </el-form-item>
        <el-form-item label="XDXR" prop="xdxr">
          <el-input v-model="temp.xdxr" />
        </el-form-item>
        <el-form-item label="Update" prop="update">
          <el-input v-model="temp.update" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchParameter, updateParameter } from '@/api/parameter'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
import ElInput from '../../../node_modules/element-ui/packages/input/src/input.vue' // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: {
    ElInput,
    Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.timer = setInterval(() => {
      setTimeout(this.refresh, 0)
    }, 60000)
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    refresh() {
      this.getList()
    },
    changeCellStyle(row, column, rowIndex, columnIndex) {
      if (row.column.label=== 'Code') {
        return {
          'background-color': '#ffe699',
          'border': '1px dashed #0F0A3B !important'
        }
      } else if (row.column.label=== 'AtrRatio' || row.column.label=== 'BaseAtr' || row.column.label=== 'AtrUpper' || row.column.label=== 'AtrLower') {
        return {
          'background-color': '#ddebf7',
          'border': '1px dashed #0F0A3B !important'
        }
      } else if (row.column.label=== 'OverBuy' || row.column.label=== 'AliveLine' || row.column.label=== 'DeadLine' || row.column.label=== 'OverSell') {
        return {
          'background-color': '#f8cbad',
          'border': '1px dashed #0F0A3B !important'
        }
      } else if (row.column.label=== 'SwingDo' || row.column.label=== 'SwingKeep' || row.column.label=== 'XDXR') {
        return {
          'background-color': '#c6e0b4',
          'border': '1px dashed #0F0A3B !important'
        }
      } else {
        return {
          'background-color': '#fafafa',
          'border': '1px dashed #0F0A3B !important'
        }
      }
    },
    getList() {
      this.listLoading = true
      fetchParameter(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createParameter(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateParameter(tempData).then(() => {
            const index = this.list.findIndex(v => v.code === this.temp.code)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
