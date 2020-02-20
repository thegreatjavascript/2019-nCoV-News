import store from '@/store';

export default class LoadMore {
    observer = undefined;

    constructor() {
        this.init();
    }

    add(el) {
        if (this.observer) {
            this.observer.observe(el);
        }
    }

    init() {
        this.observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(async ({ target, isIntersecting }) => {
                    console.log('isIntersecting:', isIntersecting);
                    if (isIntersecting) {
                        console.log('开始请求数据');
                        store.dispatch('requestData').then(() => {
                            observer && observer.unobserve(target);
                        });
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.5,
            }
        );
    }
}
