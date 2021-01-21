<template>
  <div class="c-form-model">
    <a-form-model ref="formModel" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <div v-for="(item, index) in datas" :key="index">
        <a-form-model-item
          v-if="item.type == 'text' ||item.type == 'number'|| !item.type"
          :ref="item.prop"
          :label="item.label"
          :prop="item.prop"
        >
          <a-input :type="!item.type?'text':item.type" v-model="form[item.prop]" :placeholder="'请输入' + item.label" />
        </a-form-model-item>
        <a-form-model-item v-if="item.type == 'select'" :label="item.label" :prop="item.prop">
          <a-select v-model="form[item.prop]">
            <a-select-option v-for="(sItem, idx) in item.typeData" :key="idx" :value="sItem.value">{{
              sItem.label
            }}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item v-if="item.type == 'tree'" :label="item.label" :prop="item.prop">
          <a-tree
            @check="onTreeCheck"
            :tree-data="item.typeData"
            :defaultExpandedKeys="form[item.prop]"
            :replace-fields="item.replaceFields?item.replaceFields:replaceFields"
            checkable
            :checkedKeys="form[item.prop]"
          />
        </a-form-model-item>
        <a-form-model-item v-if="item.type == 'radio'" :label="item.label" :prop="item.prop">
          <a-radio-group v-model="form[item.prop]">
            <a-radio :value="rItem.value" v-for="(rItem, idx) in item.typeData" :key="idx" >
              {{ rItem.label }}
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item v-if="item.type == 'tree-select'" :label="item.label" :prop="item.prop">
          <a-tree-select
            v-model="form[item.prop]"
            :tree-data="item.typeData"
            :placeholder="'请输入' + item.label"
            @select="onTreeSelect"
          >
          </a-tree-select>
        </a-form-model-item>
        <a-form-model-item v-if="item.type == 'textarea'" :label="item.label" :prop="item.prop">
          <a-input v-model="form[item.prop]" type="textarea" />
        </a-form-model-item>
      </div>
    </a-form-model>
  </div>
</template>

<script>
export default {
  props: {
    datas: {
      type: Array,
      default: () => {
        return []
      }
    },
    rules: {
      type: Object,
      default: () => {
        return {}
      }
    },
    refName: {
      type: String,
      default: ''
    },
    value: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  data () {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      form: {},
      replaceFields: {
          children: 'children', title: 'title', key: 'key'
      },
      autoExpandParent: true,
      checkedKeys: []
    }
  },
  watch: {
    value (val) {
      this.form = val
    }
  },
  created () {
    this.form = this.value
  },
  mounted () {},

  methods: {
    onTreeCheck (checkedKeys, e) {
			this.form.resourceIds = checkedKeys
    },
    handleValidate () {
      const _this = this
      return new Promise((resolve, reject) => {
        _this.$refs.formModel.validate((valid) => {
          if (valid) {
            resolve(_this.form)
          } else {
            Promise.reject(new Error('valid'))
          }
        })
      })
    },
    onTreeSelect (value) {
      this.$emit('onTreeSelect', value)
    },
    resetForm () {
      this.$refs.formModel.resetFields()
    }
  }
}
</script>
