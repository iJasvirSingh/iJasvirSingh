<script>
    window.history.pushState({page: 1}, &quot;&quot;, &quot;&quot;);

window.onpopstate = function(event) {
    if(event){
        window.location.href = &#39;https://www.myhighinfo.blogspot.com/&#39;;
        // Code to handle back button or prevent from navigation
    }
}
  </script>