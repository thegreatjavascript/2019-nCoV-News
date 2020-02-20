import Vue from 'vue';
import LoadMore from '@/utils/LoadMore';
import store from '@/store/index';

const loadMore = new LoadMore();

Vue.directive('load-more', {
    bind(el) {
        // 每次只是数据列表的最后一个item绑定滚动加载事件
        if (
            el.getAttribute('index') ===
            String(store.state.messageList.length - 2)
        ) {
            loadMore.add(el);
        }
    },
});
