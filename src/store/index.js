import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    recruitmentData: [],
    fields: [],
    dynamicField: [],
    selectedFields: [],
    filteredData: [],
    tableInfo: {
      totalRow: 1,
      currentPage: 1
    },
  },
  mutations: {
    setRecruitmentData(state, val){
      state.recruitmentData = val
      state.filteredData = val  
    },
    setFilteredData(state, val){
      let start = new Date(val.start)
      let end = new Date(val.end)
      let filter = state.recruitmentData.filter(({date}) => new Date(date) > start && new Date(date) < end)
      state.filteredData = filter  
    },
    setFields(state, val){
      state.fields = val
    },
    setSelectedFields(state, val){
      state.selectedFields = val
      state.dynamicField = val
    },
    setResetData(state){
      state.filteredData = state.recruitmentData
    },
    setTableInfo(state, val) {
      state.tableInfo = {
        totalRow: val.totalRow,
        currentPage: val.currentPage
      }
    }
  },
  actions: {
    getRecruitmentData() {
      return axios.get("https://recruitment-mock-data.gjg-ads.io/data")
    }
  },
  modules: {
  }
})
