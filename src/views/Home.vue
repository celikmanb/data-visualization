<template>
  <div class="home">
    <b-container>
      <b-button v-b-toggle.sidebar-1 class="barButton">Filter</b-button>
      <b-sidebar id="sidebar-1" title="Filter" shadow>
          <b-form-group label="Disable columns" v-slot="{ ariaDescribedby }">
            <b-form-checkbox
              v-for="option in fields"
              v-model="selected"
              :key="option.key"
              :value="option"
              :aria-describedby="ariaDescribedby"
              style="text-align: left; margin-left: 5%;"
              name="flavour-3a"
            >
              {{option.label}}
            </b-form-checkbox>
          </b-form-group>
          <b-form-group label="Select Dates">
            <b-row class="mt-2" style="margin-left: 2%; margin-right: 2%;">
              <b-col cols="12">
                <b-form-datepicker id="example-datepicker" v-model="startDate" class="mb-2"></b-form-datepicker>
              </b-col>
              <b-col cols="12">
                <b-form-datepicker id="example-datepicker1" :min="startDate" v-model="endDate" class="mb-2"></b-form-datepicker>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-button @click="applyFilter">Apply</b-button>     
              </b-col>
              <b-col>
                <b-button @click="resetFilter">Reset</b-button>     
              </b-col>
            </b-row>
          </b-form-group>
      </b-sidebar>
      <b-tabs class="mt-3" v-model="tabIndex" align="center">
        <b-tab title="Report View" active>
          <report-data />
        </b-tab>
        <b-tab title="Graph View">
          <template v-if="tabIndex == 1">
              <graph-data :chart-data="revenueData" graph-name="Revenue" :tab="tabIndex"/>
              <graph-data :chart-data="clicksData" graph-name="Clicks" :tab="tabIndex"/>
              <graph-data :chart-data="installsData" graph-name="Installs" :tab="tabIndex"/>
              <graph-data :chart-data="dauData" graph-name="Dau" :tab="tabIndex"/>
              <graph-data :chart-data="impressionsData" graph-name="Impressions" :tab="tabIndex"/>  
          </template>
        </b-tab>
      </b-tabs>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import ReportData from '@/components/ReportData.vue'
import GraphData from '@/components/GraphData.vue'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    ReportData,
    GraphData
    //HelloWorld
  },
  data() {
    return {
      options: [
        { text: 'Orange', value: 'orange' },
        { text: 'Apple', value: 'apple' },
        { text: 'Pineapple', value: 'pineapple' },
        { text: 'Grape', value: 'grape' }
      ],
      selected: [],
      startDate: new Date(),
      endDate: new Date(),
      is_search:true,
      revenueData:[],
      clicksData:[],
      installsData:[],
      dauData:[],
      impressionsData:[],
      tabIndex: 1,
      graph:false,
    }
  },
  watch: {
    startDate() {
      this.is_search = false;
      this.endDate = this.startDate
    },
    filteredData(){
      this.revenueData = this.filteredData.map((element) => [new Date(element.date).getTime(), Math.floor(element.revenue)])
      this.clicksData = this.filteredData.map((element) => [new Date(element.date).getTime(), Math.floor(element.clicks)])
      this.installsData = this.filteredData.map((element) => [new Date(element.date).getTime(), Math.floor(element.installs)])
      this.dauData = this.filteredData.map((element) => [new Date(element.date).getTime(), Math.floor(element.dau)])
      this.impressionsData = this.filteredData.map((element) => [new Date(element.date).getTime(), Math.floor(element.impressions)])
    },
    endDate() {
      if(this.is_search){
        this.applyFilter()
      }
      this.is_search = true
    },
    selected() {
      this.setSelectedFields(this.selected)
    },
    fields(){
      this.arrayField = ['date','impressions','clicks', 'installs', 'dau', 'revenue']
      //this.selected = this.fields.map(element => {return {key: element.key, label: element.label, sortable: true}})
      this.selected = this.arrayField.map(element => {return {key: element, label: element.toUpperCase(), sortable: true}})
    }
  },
  computed:{
    ...mapState(['fields','filteredData'])
  },
  methods: {
    ...mapMutations(['setSelectedFields', 'setFilteredData', 'setResetData', 'setTableInfo']),
    resetFilter() {
      this.setResetData()
    },
    applyFilter(){
      let params = {
        start: this.startDate,
        end:this.endDate
      }
      this.setFilteredData(params)
    }
  },
  mounted() {
    
  }
}
</script>

<style>
  .barButton {
    float: left;
  }
  .custom-control-label{
    margin-left: 3%;
  }
</style>
