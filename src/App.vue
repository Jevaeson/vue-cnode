<template>
  <div :style="{backgroundColor: '#e1e1e1', paddingBottom: '20px'}">
    <Header/>
    <Main/>
  </div>
</template>

<script>
  import Header from './components/Header'
  import Main from './components/Main'
  import './static/gloable.css'
  export default {
    name: 'app',
    components: {
      Header,
      Main
    }
  }
</script>