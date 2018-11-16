<template>
  <div>
    <div style="text-align: right;margin-bottom: 10px;">
      <el-button type="primary" @click="openDialog">注册人员</el-button>
    </div>
    <el-table border :data="tableData">
      <el-table-column label="姓名" prop="empName"></el-table-column>
      <el-table-column label="工作" prop="job"></el-table-column>
      <el-table-column label="部门号" prop="empno"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="remove(scope.row.empName)" type="danger">删除</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="openDialog2(scope.row.id)" type="danger">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <UserForm :visible.sync="visible" @success="loadData"></UserForm>
    <UserForm2 :visible.sync="visible_modify" @success="loadData" v-bind:itemid="itemId"></UserForm2>

  </div>
</template>

<script>

import axios from 'axios'
import UserForm from './form.vue'
import UserForm2 from './form_modify.vue'

import UserApi from '@/api/user'

export default {
  components: {UserForm, UserForm2},
  data () {
    return {
      itemId:0,
      visible: false,
      visible_modify: false,
      tableData: [],
      total: 0,
      query: {
        pageIndex: 1,
        pageSize: 10,
        userName: ''
      }
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {

    async loadData () {
      let resp = await UserApi.paging(this.query)
      console.log(JSON.parse(JSON.stringify(resp))['data'])
      this.tableData = JSON.parse(JSON.stringify(resp))['data']
      this.total = resp.total
    },
    pageChange (page) {
      this.query.pageIndex = page
      this.loadData()
    },
    remove (empName) {
      alert(empName)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let resp = await UserApi.remove(empName)
        this.$message({
          message: '删除成功!',
          type: 'success'
        })
        this.loadData()
      }).catch(() => {

      })
    },
    openDialog () {
      this.visible = true
    },
    openDialog2 (id) {
      this.itemId = id;
      alert("在父组件改成"+this.itemId)
      this.visible_modify = true
    }
  }
}
</script>
