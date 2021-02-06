    <template>
      <div>

      <el-form
        :inline="true"
        :model="form"
        status-icon
        :rules="formRules"
        ref="form"
        label-width="115px"
        class="demo-ruleForm"
      >
        <el-row>

      <el-col :span="8">
        <el-form-item label="元数据编号" prop="code">
          <el-input v-model="form.code" autocomplete="off"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="元数据名称" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="元数据类型" prop="type">
          <el-select v-model="form.type">

              <el-option label="单据" value="1"></el-option>

              <el-option label="档案" value="2"></el-option>

          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status">

              <el-option label="未启用" value="1"></el-option>

              <el-option label="启用" value="2"></el-option>

              <el-option label="禁用" value="3"></el-option>

          </el-select>
        </el-form-item>
      </el-col>

        </el-row>
      </el-form>

      <div class="action-layout">
        <el-button>新增</el-button>
        <el-button class="align-right" type="primary">查询</el-button>
        <el-button class="align-right">重置</el-button>
      </div>

    <el-table
      :data="table"
      style="width: 100%">

      <el-table-column
        label="请选择"
        width="undefined">
        <template slot-scope="scope">
          <el-radio v-model="tableSelectedRow" :label="scope.row.code"> </el-radio>
        </template>
      </el-table-column>

      <el-table-column
        label="编号"
        width="250px">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="名称"
        width="undefined">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="类型"
        width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="状态"
        width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="创建日期"
        width="200px">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        width="undefined">
        <template slot-scope="scope">
          <el-button type="text" v-on:click="onEditBtnClick(scope.row, $event)">编辑</el-button>
          <el-divider v-if="scope.row.status === '1'" direction="vertical"></el-divider>
          <el-popover v-if="scope.row.status === '1'" placement="top" width="160" v-model="tablePopoverIsVisible">
            <p>确认要删除?</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="tablePopoverIsVisible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="onDelBtnClick(scope.row, $event)">确定</el-button>
            </div>
            <el-button slot="reference" type="text">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="tableTotal">
    </el-pagination>

      </div>
    </template>
<script>
export default {
  data () {
    return {
      form: {
        code: '',
        name: '',
        type: '',
        status: ''
      },
      formRules: {
        code: [
          {
            required: false,
            message: '',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: false,
            message: '',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: false,
            message: '',
            trigger: 'blur'
          }
        ],
        status: [
          {
            required: false,
            message: '',
            trigger: 'blur'
          }
        ]
      },
      tableSelectedRow: null,
      table: [
        {
          code: '1',
          status: '1'
        },
        {
          code: '2'
        }
      ],
      tableTotal: 0,
      tablePopoverIsVisible: false
    }
  },

  methods: {

    submitForm (formName) {
      this.$refs[formName].validate(function (valid) {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    resetForm (formName) {
      this.$refs[formName].resetFields()
    },

    onEditBtnClick (row, $evt) { },

    onDelBtnClick (row, $evt) { },

    onAddBtnClick () { },

    onSearchBtnClick () { },

    onResetBtnClick () { }

  }

}
</script>
