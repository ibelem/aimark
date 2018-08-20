<template v-if='networkstatus.length > 0'>
  <div></div>
</template>

<script>
  export default {
    name: "ai_connection",
    beforeMount: function() {
      let _this = this;  
      function updateConnectionStatus() {
        if(navigator.connection && navigator.connection.type) {
          if(navigator.connection.type != 'ethernet' && navigator.connection.type != 'wifi') {
            _this.networkstatus = 'Your connection type is '+ navigator.connection.type + '<br>It requires to download AI models from server, it\'s better to use Ethernet or WIFI rather than Cellular network.';
          }
          else {
            _this.networkstatus = 'Your connection type is '+ navigator.connection.type + '.';
            _this.$toast.open({
                duration: 5000,
                message:  _this.networkstatus,
                position: 'is-bottom',
                type: 'is-danger'
            })
          }
        }
      }
      if(navigator.connection && navigator.connection.type) {
        updateConnectionStatus();
        navigator.connection.addEventListener('typechange', updateConnectionStatus);
      }
    },
    data() {
      return {
        networkstatus: ''
      }
    }
  }
</script>