<template>
  <div>
    <el-input :disabled="disabled" :placeholder="placeholder" v-model="innerValue" @focus="handleIconClick" clearable @clear="clearHandle">
     <i slot="suffix" class="el-input__icon el-icon-search" @click="handleIconClick"></i>
    </el-input>

    <el-dialog :title="schemaConfig.title" :visible.sync="dialogVisible" width="80%" :before-close="handleClose" :modal="false">
      <div class="page_search">
        <div class="page_search_form">
          <el-form
            :inline="true"
            status-icon
            :rules="formRules"
            ref="form"
            label-width="130px"
            class="page_form"
          >
            <el-row>
              <el-row>
                <el-col
                  :span="8"
                  v-for="field in schemaConfig.config.schema.searchFields"
                  :key="field.key"
                >
                  <!-- input  -->
                  <el-form-item
                    v-if="field.type==='string'"
                    :label="$t(field.title)"
                    :prop="field.key"
                  >
                    <el-input v-model="field.value" autocomplete="off"></el-input>
                  </el-form-item>
                  <!-- select -->
                  <el-form-item
                    v-if="field.type==='select'"
                    :label="$t(field.title)"
                    :prop="field.key"
                  >
                    <el-select clearable v-model="field.value" placeholder>
                      <el-option
                        v-for="option in field.options"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <!-- date -->
                  <el-form-item
                    v-if="field.type==='date'"
                    :label="$t(field.title)"
                    :prop="field.key"
                  >
                    <el-date-picker
                      v-model="field.value"
                      :type="field.showTime? 'datetime' : 'date'"
                    ></el-date-picker>
                  </el-form-item>
                  <!-- date range -->
                  <el-form-item
                    v-if="field.type==='date:range'"
                    :label="$t(field.title)"
                    :prop="field.key"
                  >
                    <el-date-picker
                      v-model="field.value"
                      format="yyyy-MM-dd HH:mm"
                      range-separator="~"
                      type="datetimerange"
                    ></el-date-picker>
                  </el-form-item>
                  <!-- checkbox -->
                  <el-form-item
                    v-if="field.type==='checkbox'"
                    :label="$t(field.title)"
                    :prop="field.key"
                  >
                    <el-checkbox v-model="field.value"></el-checkbox>
                  </el-form-item>
                  <!-- number -->
                  <el-form-item
                    v-if="field.type==='number'"
                    :label="$t(field.title)"
                    :prop="field.key"
                  >
                    <el-input-number
                      v-model="field.value"
                      :step="field.numberStep ? field.numberStep : 0.1"
                      :min="field.minNumber"
                      :max="field.maxNumber"
                      :precision="field.numberPrecision"
                    ></el-input-number>
                  </el-form-item>
                  <!-- valueSearch -->
                  <el-form-item
                    v-if="field.type==='valueSearch'"
                    :label="$t(field.title)"
                    :prop="field.key"
                  >
                    <el-select v-model="field.value" filterable clearable>
                      <el-option
                        v-for="option in field.options"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <!-- valueset -->
                  <el-form-item
                    v-if="field.type==='valueset'"
                    :label="$t(field.title)"
                    :prop="field.key"
                  >
                    <el-select v-model="field.value">
                      <el-option
                        v-for="option in field.options"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <!-- modalsearch -->
                  <el-form-item
                    v-if="field.type === 'search'"
                    :label="$t(field.title)"
                    :prop="field.key"
                  >
                   <ModalSearch :schemaConfig="field.config.schema" @selectData="selectData" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-row>
          </el-form>
        </div>

        <div class="page_btn_group">
          <el-button class="form_btn form_btn_reset" @click="onResetBtnClick">重置</el-button>
          <el-button class="form_btn form_btn_search" @click="onSearchBtnClick" type="primary">查询</el-button>
        </div>

        <div class="page_line"></div>
        <div class="page_table">
          <el-table
            :data="table"
            style="width: 100%"
            @sort-change="tablesortChange"
            class="page_table_detail"
            height="200"
          >
            <template v-for="(col, i) in schemaConfig.config.schema.columns">
              <el-table-column
                :key = "i"
                v-if="col.key === '$radio'"
                width="55px">
                <template slot-scope="scope">
                  <el-radio v-model="selected" :label="scope.$index" @change="mapOfCheckedId(scope.row)" ></el-radio>
                </template>
              </el-table-column>

              <el-table-column
                :key = "i"
                :label="$t(col.title)"
                sortable="custom"
                show-overflow-tooltip
                v-if="col.key !== '$radio' && col.key !== '$action'"
                :prop="col.key"
                :width="col.width">
                <template slot-scope="scope">
                  <span>{{ col.type === 'object' && scope.row[col.key] ? getLabel(col, scope.row[col.key][col.label], scope.row, i) : getLabel(col, scope.row[col.key], scope.row, i) }}</span>
                </template>
              </el-table-column>
            </template>
          </el-table>
          <el-pagination
            background
            @size-change="tablePageSizeChange"
            class="page_search_table_page"
            @current-change="tablePageIndexChange"
            :current-page="tablePageIndex + 1"
            :page-sizes="[10, 30, 50]"
            :page-size="tablePageSize"
            layout="total, sizes, prev, pager, next"
            :total="tableTotal"
          ></el-pagination>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">{{$t('button.cancel')}}</el-button>
        <el-button type="primary" @click="saveDialog">{{$t('button.ok')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import * as apis from '@/config/apis'
// import { moment } from 'mf-shared-dependencies-vue'
import ModalSearch from './modal-search.vue'
export default {
  props: {
    schemaConfig: {
      type: Object
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    type: {
      type: String,
      required: false,
      default: 'object'
    },
    defaultSearchFileds: Array,
    value: [String, Object]
  },
  components: {
    ModalSearch
  },
  data () {
    return {
      dialogVisible: false,
      innerValue: '',
      valuesetList: [],
      key: 'code',
      selected: null,
      detailTitle: '元数据',
      detailPage: '/basic/system/meta-data-detail',
      searchURL: '',
      countURL: '',
      sort: {
        fieldName: 'createTime',
        order: 'desc'
      },
      form: {
        code: '',
        codeSearchParam: {
          fieldName: 'code',
          conditionOperator: 'like',
          relationship: 'AND'
        },
        name: '',
        nameSearchParam: {
          fieldName: 'name',
          conditionOperator: 'like',
          relationship: 'AND'
        },
        type: '',
        typeOptions: [
          {
            label: '单据',
            value: '1'
          },
          {
            label: '档案',
            value: '2'
          }
        ],
        typeSearchParam: {
          fieldName: 'type',
          conditionOperator: '=',
          relationship: 'AND'
        },
        status: '',
        statusOptions: [
          {
            label: '未启用',
            value: '1'
          },
          {
            label: '启用',
            value: '2'
          },
          {
            label: '禁用',
            value: '3'
          }
        ],
        statusSearchParam: {
          fieldName: 'status',
          conditionOperator: '=',
          relationship: 'AND'
        }
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
      valuesetCodes: [],
      tableSelectedRow: null,
      table: null,
      tablePageSize: 10,
      tableTotal: 0,
      tablePageIndex: 0,
      tablePopoverIsVisible: false,
      selectedRow: ''
    }
  },
  watch: {
    // 如果 `value` 发生改变，这个函数就会运行
    value: {
      handler (newValue, oldValue) {
        this.getValue(newValue)
      },
      deep: true,
      immediate: true
    }
  },
  created () {
    const { searchFields, columns } = this.schemaConfig.config.schema
    const searchList = Array.isArray(searchFields) ? searchFields : []
    const columnsList = Array.isArray(columns) ? columns : []
    const list = [
      ...searchList,
      ...columnsList
    ]
    list.map(item => {
      if (item.type === 'valueset' && item.config && 'code' in item.config) {
        this.valuesetCodes.push(item.config.code)
      }
    })
    this.initValuesets()
  },

  methods: {
    formatDateTime (date) {
      if (!date) {
        return ''
      }
      const newDate = new Date(date)
      const newDateString = newDate.toLocaleString('ZN', { hour12: false }).replace(/\//g, '-')
      return newDateString
    },
    handleIconClick () {
      this.dialogVisible = true
      this.setDefaultValue()
      this.search()
    },
    setDefaultValue () {
      const defaultSearchFileds = Array.isArray(this.defaultSearchFileds) ? this.defaultSearchFileds : []
      if (defaultSearchFileds.length > 0) {
        this.schemaConfig.config.schema.searchFields.forEach(item => {
          // 如果当前 searchField没有value的话，那么就用默认值
          const key = item.key
          defaultSearchFileds.forEach(defaultField => {
            const defaultKey = defaultField.key
            if (key === defaultKey) {
              item.value = defaultField.value
            }
          })
        })
      }
    },
    selectData (event) {

    },
    handleClose () {
      this.dialogVisible = false
      this.resetForm('form')
    },
    closeDialog () {
      this.dialogVisible = false
      this.resetForm('form')
    },
    async saveDialog () {
      this.handleOk()
      this.resetForm('form')
    },
    search () {
      var _this = this
      var searchParams = []
      this.schemaConfig.config.schema.searchFields.map(item => {
        if (item.value) {
          searchParams.push({
            conditionOperator: item.condition,
            fieldName: item.key,
            relationship: item.relationship ? item.relationship : 'AND',
            value: [item.value]
          })
        }
      })
      this.$http
        .post(this.schemaConfig.config.schema.searchURL, {
          data: {
            filterFields: searchParams,
            pageIndex: this.tablePageIndex,
            pageSize: this.tablePageSize,
            orderFields: [this.sort]
          },
          token: 'admin'
        })
        .then(function (res) {
          _this.table = Array.isArray(res.data) ? res.data : []
        })
      this.$http
        .post(this.schemaConfig.config.schema.countURL, {
          data: {
            filterFields: searchParams,
            pageIndex: this.tablePageIndex,
            pageSize: this.tablePageSize
          },
          token: 'admin'
        })
        .then(function (res) {
          _this.tableTotal = res.data
        })
    },

    getSelectLabel (key, stauts) {
      var form = this.form
      var valueSelectObject = {
        label: '',
        value: ''
      }
      var selectCode = key + 'Options'
      if (selectCode in form) {
        valueSelectObject = form[selectCode].find(function (val) {
          return val.value === stauts
        })
      }
      return valueSelectObject ? valueSelectObject.label : ''
    },

    getValuesetLabel (value, stauts) {
      var form = this.form
      var valueSelectObject = {
        label: '',
        value: ''
      }
      var valCode = ''
      var valuesetCode = value + 'configCode'
      if (valuesetCode in form) {
        valCode = form[valuesetCode]
        valueSelectObject = form[valCode].find(function (val) {
          return val.value === stauts
        })
      } else if (this[valuesetCode]) {
        valCode = this[valuesetCode]
        valueSelectObject = this[valCode].find(function (val) {
          return val.value === stauts
        })
      }
      return valueSelectObject ? valueSelectObject.label : ''
    },

    initValuesets () {
      var _this = this
      var valuesetCodes = this.valuesetCodes
      if (!valuesetCodes.length) {
        return
      }
      this.$http
        .post('/api/valueset/query', {
          data: {
            filterFields: [
              {
                fieldName: 'code',
                conditionOperator: '=',
                relationship: 'AND',
                value: this.valuesetCodes
              }
            ]
          }
        })
        .then(function (res) {
          var data = Array.isArray(res.data) ? res.data : []
          _this.schemaConfig.config.schema.searchFields.map(item => {
            data.map(value => {
              if (item.config && 'code' in item.config) {
                if (item.config.code === value.code) {
                  item.options = value.values.map(val => {
                    return { label: val.value, value: val.code }
                  })
                }
              }
            })
          })
          _this.valuesetList = data
          _this.updateFieldOptions()
        })
    },

    updateFieldOptions () {
      var _this = this
      var form = this.form
      this.valuesetList.map(function (item) {
        var valCode = item.code + 'Options'
        if (valCode in form) {
          _this.form[valCode] = item.values.map(function (val) {
            return { label: val.value, value: val.code }
          })
        } else if (valCode in _this) {
          _this[valCode] = item.values.map(function (val) {
            return { label: val.value, value: val.code }
          })
        }
      })
      // for (const key in form) {
      //   if (key in form) {
      //     const valueset = this.valuesetList.find(val => `${val.code}Options` === key);
      //     if (valueset) {
      //       this.form[key] = valueset.values.map(val => ({ label: val.value, value: val.code }));
      //     }
      //   }
      // }
    },

    deleteItem (row, $event) {
      var _this = this
      this.$http
        .post(apis[this.removeURL], {
          data: [row.code],
          token: 'admin'
        })
        .then(function (res) {
          _this.search()
        })
    },

    sortChange (col) {
      if (col.order) {
        this.sort =
          col.order.indexOf('desc') !== -1
            ? { fieldName: col.prop, order: 'desc' }
            : { fieldName: col.prop, order: 'asc' }
      }
      this.search()
    },

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
      this.schemaConfig.config.schema.searchFields.map(item => { item.value = '' })
    },

    tablePageSizeChange (size) {
      this.tablePageSize = size
      this.search()
    },

    tablePageIndexChange (index) {
      this.tablePageIndex = index - 1
      this.search()
    },

    tablesortChange (column, prop, order) {
      this.sortChange(column, prop, order)
    },

    onDelBtnClick (row, $evt) {
      this.deleteItem(row, $evt)
    },

    onSearchBtnClick () {
      this.tablePageIndex = 0
      this.search()
    },

    onResetBtnClick () {
      this.resetForm('form')
    },
    clearHandle () {
      this.$emit('selectData', null)
    },
    /**
   * 字典的Value => Label
   */
    getLabel (col, val, rowData, rowIndex) {
      const { sourceType, sourceTypeKey, type, options } = col
      const attributeName = []
      let result
      if (val === undefined || val === null) {
        return val
      } else {
        result = val
      }
      if (type === 'datetime' || type === 'date') {
        result = this.formatDateTime(val)
      } else if (type === 'Object' && sourceType) {
        result = val[sourceType]
      } else if (type === 'showLabel') {
        val.forEach(element => {
          options.forEach(ele => {
            if (element === ele.value) {
              attributeName.push(ele.label)
            }
          })
        })
        result = attributeName
      } else if (type === 'showName') {
        const name = val.split(' ')[1]
        result = name
      } else if (type === 'string') {
        if (sourceType === 'ArrayObject' && sourceTypeKey) {
          result = (val)
            .map(item => item[sourceTypeKey])
            .join(', ')
        } else if (
          sourceType === 'ObjectInArrayObject' &&
          Array.isArray(sourceTypeKey)
        ) {
          result = (val).map(item => {
            let target = item
            for (let index = 0; index < sourceTypeKey.length; index++) {
              if (!target) {
                break
              }
              target = target[sourceTypeKey[index]]
            }
            return target
          })
        } else if (sourceType === 'Object') {
          result = val.name
        }
      } else if (type === 'address') {
        const { country, province, city, county, village } = rowData
        return `${country ? country.name : ''} ${province ? province.name : ''} ${city ? city.name : ''} ${county ? county.name : ''} ${village ? village.name : ''}`
      } else {
        if (options) {
          const target = options.find(opt => opt.value === val)
          if (target) {
            result = target.label
          }
        }
      }
      // 下拉逻辑
      if (typeof col.format === 'function') {
        result = col.format(
          result,
          rowData,
          rowIndex + 1,
          this.pageIndex,
          this.pageSize,
          col
        )
      }
      return result
    },

    mapOfCheckedId (row) {
      this.selectedRow = row
    },

    handleOk () {
      const { key, label, type } = this.schemaConfig.config
      const row = this.selectedRow

      if (!this.selectedRow) {
        this.$message.warning('请选择条目')
        return false
      }
      if (this.selectedRow) {
        if (type === 'string') {
          this.innerValue = row[label]
          this.$emit('selectData', `${row[key]} ${row[label]}`)
        } else if (type === 'stringCode') {
          if (label.includes('.')) {
            this.inputName = row
            const keys = label.split('.')
            for (const key of keys) {
              this.innerValue = this.innerValue[key]
            }
          } else {
            this.innerValue = row[label]
          }
          this.$emit('selectData', row[key])
        } else {
          this.innerValue = row[label]
          this.$emit('selectData', row)
        }
      }
      this.dialogVisible = false
    },

    getValue (newValue) {
      const { type, label } = this.schemaConfig.config
      if (!newValue) {
        this.innerValue = newValue
        return
      }
      if (type === 'string') {
        if (typeof newValue === 'string') {
          if (newValue.indexOf(' ') > 0) {
            this.innerValue = newValue.split(' ')[1]
          } else {
            this.innerValue = newValue
          }
        } else if (typeof newValue === 'object') {
          this.innerValue = newValue[label]
        }
      } else if (type === 'stringCode') {
        if (typeof newValue === 'string') {
          this.innerValue = newValue
        } else {
          this.innerValue = newValue[label]
        }
      } else {
        return this.getText(newValue) || ''
      }
    },

    getText (newValue) {
      if (newValue == null) { return '' }
      const { label } = this.schemaConfig.config
      const keys = label.split('.')
      if (!keys.length) { return '' }
      for (const key of keys) {
        if (newValue) {
          this.innerValue = newValue[key]
        }
      }
    }
  }
}
</script>
