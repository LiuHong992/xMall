import Vue from 'vue'
import xmheader from '../components/Common/Xmheader'
import xmfooter from '../components/Common/XmFooter'
import goodmodel from "../components/Common/IndexGood";

Vue.component('xmheaders', xmheader)
Vue.component('xmfooters', xmfooter)
Vue.component('goodmodels', goodmodel)

// 封装的跳转方法
Vue.prototype.$goto = function(path, item, key, index = 1) {
    if (item && key) {
        this.$router.push({
            name: path,
            query: {
                items: JSON.stringify(item),
                key: key
            }
        });
    } else if (item) {
        this.$router.push({
            name: path,
            query: {
                items: JSON.stringify(item),
            }
        });
    } else {
        this.$router.push(path)
    }
}