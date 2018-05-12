// This is the js for the default/index.html view.

var app = function() {
    var url = "{{=URL('default', 'index')}}";
    var self = {};
    var musicArray = [];
    Vue.config.silent = false; // show all warnings

    // Extends an array
    self.extend = function(a, b) {
        for (var i = 0; i < b.length; i++) {
            a.push(b[i]);
        }
    };

    self.getTracks= function() {
      $.post(urrl,{}, function(data) {
          self.vue.musicAr = data.tracks;
        console.log(self.vue.musicAr);
        console.log("worked!")
      });
    };

    function getIndex(id) {
      function findToEdit(data) {
        return data.id == id;
      }
      return self.vue.musicAr.findIndex(findToEdit)
    }

    var disable = false; //disables this function from being called to quickly after its previous call
    self.delete_track = function(id) {
      if (disable)
        return;
      disable = true;
      var index = getIndex(id);
      $.post(del_memo_url,
        { id: id },
        function () {
          self.vue.musicAr.splice(index, 1);
        }
      )
      setTimeout(function () { disable = false }, 1000);
    }

    self.sortTable = function sortTable(col) {
      if (this.sortColumn === col) {
        this.ascending = !this.ascending;
      } else {
        this.ascending = true;
        this.sortColumn = col;
      }
      var ascending = this.ascending;
      this.rows.sort(function (a, b) { //replace with checklists array
        if (a[col] > b[col]) {
          return ascending ? 1 : -1
        } else if (a[col] < b[col]) {
          return ascending ? -1 : 1
        }
        return 0;
      })
    }
    //const cols = ['Artist', 'Song', 'Rating', 'Play/Pause', 'Upvotes', 'Delete'];
    // Complete as needed.
    self.vue = new Vue({
        el: "#songs",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['!{', '}'],
        data: {
            musicAr: [],
            sortKey: 'Artist',
            reverse: false,
            search: '',
            has_more: false,
            columns: ['Artist', 'Song', 'Rating', 'Play/Pause', 'Upvotes', 'Delete']
        },
        methods: {
          delete_track: self.delete_track,
          sortTable: self.sortTable,

    },

    });
    self.getTracks();
    $("#songs").show();
    return self;
};

var APP = null;

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function(){APP = app();});
