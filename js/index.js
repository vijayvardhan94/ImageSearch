var callApiTimeout = null;

/* VUE.JS logic */
var vm = new Vue({
  el: '#main-container',
  data: {
    images: [],
    query: ''
  },
  watch: {
    query: function (value) {
      clearTimeout(callApiTimeout);
      callApiTimeout = setTimeout(function () {
        var reqURL = "https://api.flickr.com/services/feeds/photos_public.gne";
        var options = {
          params: {
            format: 'json',
            tags: this.query
          }
        };

        this.$http.jsonp(reqURL, options);
      }.bind(this), 250);
    }
  }
});

/* JSONP callback function */
function jsonFlickrFeed(response) {
  vm.$data.images = response.items;
}

/* VueJs utilites */
Vue.directive('img', {
  inserted: function (el, binding) {
    lazyload(el, binding);
  },
  update: function (el, binding) {
    lazyload(el, binding);
  }
});

Vue.prototype.filters = {
  splitTags: function (value) {
    // showing only first 5 tags
    return value.split(' ').slice(0,5);
  }
}

/* General utility functions */
function lazyload(el, binding) {
  var img = new Image();
  img.src = binding.value;

  img.onload = function() {
    el.src = binding.value;
  };
}