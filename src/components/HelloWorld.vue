<template>
    <div class="container">
        <a class="title" href="https://t.me/s/nCoV2019" target="_blanket"
            >2019-nCoV疫情实时播报🅥</a
        >
        <div v-if="isMobile" class="share-info">
            <a class="share-link" href="http://2019ncov.tk" target="_blanket"
                >2019nCoV.tk</a
            >
            <strong>请广传！</strong>
        </div>
        <div class="subtitle">
            <div v-if="!isMobile" class="share-info">
                <a
                    class="share-link"
                    href="http://2019ncov.tk"
                    target="_blanket"
                    >网站：2019nCoV.tk</a
                >
                <strong>请广传！</strong>
            </div>
            <a
                href="https://github.com/thegreatjavascript/2019-nCoV-News"
                target="_blanket"
                ><img src="~@/assets/github.svg" alt="github"
            /></a>
            <p>
                数据来自
                <a
                    v-on:click="onClick"
                    href="https://t.me/nCoV2019"
                    target="_blanket"
                    >Telegram Channel</a
                >
            </p>
        </div>
        <img
            class="loading"
            v-if="loading"
            src="~@/assets/loading.svg"
            alt="loading"
        />
        <template v-else>
            <div class="card pinned">
                <img src="~@/assets/pin.png" alt="pinned message" />
                <vue-markdown
                    class="content"
                    :style="{
                        height: isCollapse
                            ? isMobile
                                ? '145px'
                                : '6vw'
                            : 'auto',
                    }"
                    :source="pinnedMessage.message"
                    :anchorAttributes="{ target: '_blank' }"
                ></vue-markdown>
                <div class="attach">
                    <p class="date">
                        {{ getTime(pinnedMessage.date) }}
                    </p>
                    <button @click="collapseHandler">
                        {{ isCollapse ? '展开' : '折叠' }}
                    </button>
                </div>
            </div>
            <template v-for="item in messageList">
                <div
                    class="card"
                    v-if="filterMessage(item.message)"
                    :key="item.id"
                    :index="item.index"
                    v-load-more
                >
                    <vue-markdown
                        :source="item.message"
                        :anchorAttributes="{ target: '_blank' }"
                    ></vue-markdown>
                    <p class="date">
                        {{ getTime(item.date) }}
                    </p>
                </div>
            </template>
        </template>
        <p class="loading-text">loading...</p>
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';
import { isMobile } from '@/utils/tool';
import { mapState } from 'vuex';
const moment = require('moment');

export default {
    name: 'HelloWorld',
    data() {
        return {
            isCollapse: true,
        };
    },
    computed: {
        loading: function() {
            return this.$store.state.loading;
        },
        messageList: function() {
            return this.$store.state.messageList;
        },
        pinnedMessage: function() {
            return this.$store.state.pinnedMessage;
        },
        isMobile: function() {
            return isMobile();
        },
    },
    methods: {
        collapseHandler() {
            this.isCollapse = !this.isCollapse;
        },
        filterMessage(title) {
            return title.trim() && !/^pinned/.test(title.trim());
        },
        removeBR(html) {
            if (/<br><br>$/.test(html)) {
                return html.replace(/<br><br>$/, '');
            }
            return html;
        },
        getTime(time) {
            return moment(time)
                .utc(8)
                .format('YYYY-MM-DD HH:mm:ss');
        },
        onClick(e) {
            alert('链接需要翻墙才能访问！');
        },
        getData(isAuto) {
            this.$store.dispatch('requestData', isAuto);
        },
    },
    created() {
        this.getData();
        // call api every five minutes.
        this.timer = setInterval(() => {
            this.getData(true);
        }, 300000);
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
    components: {
        VueMarkdown,
    },
};
</script>

<style scoped lang="scss">
.container {
    height: 100%;
    width: 55vw;
    margin: auto;
    color: #000000;
    font-size: 1.2vw;
    .loading {
        margin-top: 5vw;
        margin-left: calc(50% - 25px);
    }
    .title {
        text-align: center;
        display: block;
        font-size: 2vw;
        font-weight: bold;
        margin-top: 2vw;
        margin-bottom: 3vw;
    }
    .share-info {
        display: flex;
        justify-content: center;
        align-items: center;
        a {
            margin-right: 1vw;
        }
    }
    .subtitle {
        width: 100%;
        margin-bottom: 1vw;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        > a {
            margin-right: 1vw;
            height: 25px;
            img {
                width: 25px;
            }
        }
        p {
            text-align: right;
        }
    }
    .card {
        min-height: 100px;
        margin: 0.7vw 0;
        padding-bottom: 2vw;
        background: #ffffff;
        padding: 1vw;
        border-radius: 10px;
        &.pinned {
            margin-bottom: 1.5vw;
            min-height: 78px;
            position: relative;
            img {
                color: var(--text-color);
                position: absolute;
                width: 17px;
                right: 1vw;
                top: 5px;
                text-align: right;
            }
            .content {
                height: 6vw;
                overflow: hidden;
            }
            .attach {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                button {
                    cursor: pointer;
                    color: var(--text-color);
                    outline: none;
                    border: none;
                    margin-left: 10px;
                    background: inherit;
                    font-size: inherit;
                    line-height: 1;
                }
            }
        }
        /deep/ h4 {
            margin-bottom: 10px;
            color: var(--text-color);
        }
        .date {
            text-align: right;
        }
    }
    .loading-text {
        text-align: center;
        margin: 20px 0;
    }
}

@media (max-width: 768px) {
    .container {
        width: 90vw;
        font-size: 5vw;
        .title {
            font-size: 6vw;
            margin-top: 5vw;
        }
        .share-info {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 2vw;
            a {
                margin-right: 2vw;
            }
        }
        .subtitle {
            justify-content: center;
        }
        .card {
            padding: 3vw 5vw;
            margin: 3vw 0;
            &.pinned {
                min-height: 150px;
                .content {
                    height: 145px;
                }
            }
        }
        .loading {
            margin-top: 50vw;
        }
    }
}
</style>

<style>
a {
    text-decoration: none;
    color: var(--text-color);
}

.card img {
    width: 100%;
    display: block;
}

:root {
    --text-color: #de335e;
}
</style>
