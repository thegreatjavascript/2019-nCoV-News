<template>
    <div id="app">
        <HelloWorld />
    </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
    name: 'app',
    components: {
        HelloWorld,
    },
};
</script>

<style lang="scss">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // background: #de335e;
    background: #f3f8fb;
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100%;
    width: 100%;
}
* {
    margin: 0;
    padding: 0;
}
</style>
