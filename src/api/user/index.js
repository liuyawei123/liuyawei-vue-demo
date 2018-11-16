/**
 * Created by binwang on 2018/11/7.
 */
import axios from 'axios'

export default {

  /**/
  data () {
    return {
      visible: false,
      tableData: [],
      total: 0,
      query: {
        pageIndex: 1,
        pageSize: 10,
        userName: ''
      }
    }
  },
  /* 查找所有 */
  paging: async () => {
    let resp = await axios.get(`/api/depts/all`)
    return resp.data
  },
  /* 创建 */
  create: async (user) => {
    let resp = await axios.post('/api/users', user)
    return resp.data
  },
  /* 删除 */
  remove: async (ename) => {
    let resp = await axios.delete(`/api/users/${ename}`)
    return resp.data
  },
  /* 登陆 */
  logining: async (user) => {
    let resp = await axios.post(`/api/users/actions/login/`, user)
    return resp.data
  },
  /*修改*/
  updateEmpObject: async(user) => {
    let resp = await axios.put('/api/users/', user)
    return resp.data
  }
}
