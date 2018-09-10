<template v-if='networkstatus.length > 0'>
  <div></div>
</template>

<script>
  export default {
    name: "ai_connection",
    beforeMount: function() {
      let _this = this;  

      var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

      function updateConnectionStatus() {
        if(connection && connection.type) {
          if(connection.type != 'ethernet' && connection.type != 'wifi') {
            _this.networkstatus = 'Your connection type is '+ connection.type + '<br>It requires to download AI models from server, it\'s better to use Ethernet or WIFI rather than Cellular network.';
          }
          else {
            _this.networkstatus = 'Your connection type is '+ connection.type + '.';
            _this.$toast.open({
                duration: 5000,
                message:  _this.networkstatus,
                position: 'is-bottom'
            })
          }
        }
      }
      if(connection && connection.type) {
        updateConnectionStatus();
        connection.addEventListener('typechange', updateConnectionStatus);
        // connection.addEventListener('change', updateConnectionStatus);
      }
    },
    data() {
      return {
        networkstatus: ''
      }
    }
  }
</script>