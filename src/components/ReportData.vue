<template>
  <div>
    <b-form-group
      label-for="filter-input"
      label-cols-sm="3"
      label-align-sm="right"
      label-size="sm"
      class="mb-0"
    >
      <b-input-group size="sm">
        <b-form-input
          id="filter-input"
          v-model="filter"
          type="search"
          placeholder="Type to Search"
        ></b-form-input>

        <b-input-group-append>
          <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form-group>
    <b-table
      id="my-table" 
      :items="filteredData"
      :per-page="perPage"
      :current-page="tableInfo.currentPage"
      :fields="tableFields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :filter="filter"
      @filtered="onFiltered"
      sort-icon-left
      small
    >
      <template v-for="field in dynamicField" v-slot:[`cell(${field.key})`]="{item}">
        {{item[field.key]}}
      </template>
    </b-table>
    <b-pagination
      v-model="tableInfo.currentPage"
      :total-rows="tableInfo.totalRow"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex'
export default {
  data() {
    return {
      sortBy: 'revenue',
      totalRows: 1,
      sortDesc: false,
      perPage: 20,
      currentPage: 1,
      filter: null,
      tableFields: [],
    }
  },
  watch: {
    dynamicField() {
      this.tableFields = this.dynamicField
    }
  },
  computed: {
    ...mapState(['recruitmentData','selectedFields', 'fields', 'dynamicField', 'filteredData', 'tableInfo']),
  },
  methods: {
    ...mapActions(['getRecruitmentData']),
    ...mapMutations(['setRecruitmentData','setFields', 'setTableInfo']),
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      let params = {
        totalRow: filteredItems.length,
        currentPage: 1 
      }
      this.setTableInfo(params)
    },
    remove(index){ 
      this.dynamicField.splice(index,1)
    },
    addColumn(item) {
      this.dynamicField.push(item)
    }
  
  },
  mounted() {
    this.getRecruitmentData().then(({data})=>{
      let customFields = Object.getOwnPropertyNames(data.data[0]).map(element => {return {key: element, label: element.toUpperCase(), sortable: true}})
      this.setFields(customFields)
      this.tableFields = this.customFields
      this.setRecruitmentData(data.data)
      let params = {
        totalRow: this.recruitmentData.length,
        currentPage: 1 
      }
      this.setTableInfo(params)
      this.totalRows = this.recruitmentData.length
    })
  }
}
</script>

<style>

</style>