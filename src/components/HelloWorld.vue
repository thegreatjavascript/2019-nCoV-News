<template>
    <div class="container">
        <a class="title" :href="link" target="_blanket"
            >2019-nCoV疫情实时播报🅥</a
        >
        <div class="subtitle">
            <strong>请广传！</strong>
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
        <template v-else v-for="item in data">
            <div class="card" v-if="item.title !== 'pinned'" :key="item.id">
                <div v-html="removeBR(item.content)"></div>
                <p class="date">
                    {{ getTime(item.pubDate) }}
                </p>
            </div>
        </template>
    </div>
</template>

<script>
import fetch from 'node-fetch';
const moment = require('moment');

export default {
    name: 'HelloWorld',
    data() {
        return {
            title: '',
            link: '',
            data: [],
            loading: true,
        };
    },
    methods: {
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
        getData() {
            let api = 'https://api2019ncovnews.herokuapp.com/api';
            if (process.env.NODE_ENV !== 'production') {
                api = 'http://localhost:9919/api';
            }
            fetch(api)
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    this.title = res.title;
                    this.link = res.link;
                    this.data = res.items;
                    this.loading = false;
                });
        },
    },
    created() {
        this.getData();
        // call api every five minutes.
        this.timer = setInterval(() => {
            this.getData();
        }, 300000);
    },
    beforeDestroy() {
        clearInterval(this.timer);
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
        margin-top: 10vw;
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
        margin: 0.7vw 0;
        padding-bottom: 2vw;
        background: #ffffff;
        padding: 1vw;
        border-radius: 10px;
        .date {
            text-align: right;
        }
    }
}

@media (max-width: 768px) {
    .container {
        width: 90vw;
        font-size: 4vw;
        .title {
            font-size: 6vw;
            margin-top: 4vw;
        }
        .subtitle {
            justify-content: center;
        }
        .card {
            padding: 3vw 5vw;
            margin: 3vw 0;
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
    color: #de335e;
}

.card img {
    width: 100%;
    display: block;
}
</style>
