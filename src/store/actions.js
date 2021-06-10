export default {
  getRecruitmentData() {
    return axios.get(process.env.VUE_APP_BASE_URL)
  }
}