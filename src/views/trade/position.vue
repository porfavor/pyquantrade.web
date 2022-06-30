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
      <el-table-column label="Shares" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.shares }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Available" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.available }}</span>
        </template>
      </el-table-column>
      <el-table-column label="AvgFilled" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.avg_filled }}</span>
        </template>
      </el-table-column>
      <el-table-column label="IntraHigh" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.intra_high }}</span>
        </template>
      </el-table-column>
      <el-table-column label="IntraLow" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.intra_low }}</span>
        </template>
      </el-table-column>
      <el-table-column label="StopLoss" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.stop_loss }}</span>
        </template>
      </el-table-column>
      <el-table-column label="StopProfit" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.stop_profit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="FilledDt" width="400px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.filled_dt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="FilledDetail" width="400px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.filled_detail }}</span>
        </template>
      </el-table-column>
      <el-table-column label="RecycleDetail" width="400px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.recycle_detail }}</span>
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
        <el-form-item label="Shares" prop="shares">
          <el-input v-model="temp.shares" />
        </el-form-item>
        <el-form-item label="Available" prop="available">
          <el-input v-model="temp.available" />
        </el-form-item>
        <el-form-item label="AvgFilled" prop="avg_filled">
          <el-input v-model="temp.avg_filled" />
        </el-form-item>
        <el-form-item label="IntraHigh" prop="intra_high">
          <el-input v-model="temp.intra_high" />
        </el-form-item>
        <el-form-item label="IntraLow" prop="intra_low">
          <el-input v-model="temp.intra_low" />
        </el-form-item>
        <el-form-item label="StopLoss" prop="stop_loss">
          <el-input v-model="temp.stop_loss" />
        </el-form-item>
        <el-form-item label="StopProfit" prop="stop_profit">
          <el-input v-model="temp.stop_profit" />
        </el-form-item>
        <el-form-item label="FilledDt" prop="filled_dt">
          <el-input v-model="temp.filled_dt" />
        </el-form-item>
        <el-form-item label="FilledDetail" prop="filled_detail">
          <el-input v-model="temp.filled_detail" />
        </el-form-item>
        <el-form-item label="RecycleDetail" prop="recycle_detail">
          <el-input v-model="temp.recycle_detail" />
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
import { fetchPosition, updatePosition } from '@/api/position'
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
    }, 30000)
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
      } else if (row.column.label=== 'Shares' || row.column.label=== 'Available' || row.column.label=== 'AvgFilled') {
        return {
          'background-color': '#ddebf7',
          'border': '1px dashed #0F0A3B !important'
        }
      } else if (row.column.label=== 'FilledDt' || row.column.label=== 'AliveLine' || row.column.label=== 'DeadLine' || row.column.label=== 'OverSell') {
        return {
          'background-color': '#f8cbad',
          'border': '1px dashed #0F0A3B !important'
        }
      } else if (row.column.label=== 'XDXR') {
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
      fetchPosition(this.listQuery).then(response => {
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
          updatePosition(tempData).then(() => {
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
