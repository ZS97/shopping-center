// 利用moment
//基于vue
/**import Vue from 'vue'
import moment from 'moment'
*/
Vue.filter('dateFrmt',(input,filterDate ='YYYY-MM-DD')=>{
    return moment(input).format(filterDate);
} )
