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
                    if (isIntersecting) {
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
