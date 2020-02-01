import Vue from 'vue';
import LoadMore from '@/utils/LoadMore';
import store from '@/store/index';

const loadMore = new LoadMore();

Vue.directive('load-more', {
    bind(el) {
        if (
            el.getAttribute('index') === String(store.state.currentLength - 1)
        ) {
            loadMore.add(el);
        }
    },
});
