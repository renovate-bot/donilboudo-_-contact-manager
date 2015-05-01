var Contact = Backbone.Model.extend({
  defauts: {
    lastname: 'Desjardins',
    firstname: 'Marc',
    phone: '12345'
  }
});

//Collection
var ContactsList = Backbone.Collection.extend({
  model: Contact
});

//instance of collection
var contact_list = new ContactsList();

//View to show items collection
var ContactListView = Backbone.View.extend({
  template: _.template('<tr>\
                       <td><%=lastname%></td>\
                       <td><%=firstname%></td>\
                       <td><%=phone%></td>\
                       </tr>'),

  render: function(model) {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

//Main view
var MainView = Backbone.View.extend({
  //define a template
  template: _.template("<table>\
                       <tr><td>Last Name</td><td><input type='text' id='last-name' /></td></tr>\
                       <tr><td>First Name</td><td><input type='text' id='first-name' /></td></tr>\
                       <tr><td>Phone</td><td><input type='text' id='phone' /></td></tr>\
                        <tr><td></td><td><input type='button' id='add_button' value='Add' /><input type='button' id='reset_button' value='Reset' /></td></tr>\
                       </table><br/><br/>\
                       <h4>Contacts</h4>\
                       <table id='contactList'></table>"),

  initialize: function() {
    this.listenTo(this.collection, 'add', this.addItem);
  },

  events: {
            "click #add_button": "addContact",
            "click #reset_button": "removeItems"
        },

  addContact: function(event) {
    var lname = this.$("#last-name").val();
    var fname = this.$("#first-name").val();
    var phone = this.$("#phone").val();

    if(lname != '' && phone != ''){
        this.collection.add({lastname: lname, firstname: fname, phone: phone});
        this.$("#last-name").val('');
        this.$("#first-name").val('');
        this.$("#phone").val('');
    }
    else{
      alert("Please enter the good informations");
    }
  },

  addItem: function (contact) {
    this.$('#contactList').append(new ContactListView({ model: contact}).render().el);
  },

  removeItems: function() {
      this.$("#last-name").val('');
      this.$("#first-name").val('');
      this.$("#phone").val('');
  },

   render: function() {
    this.$el.html(this.template);
    this.collection.each(this.addItem, this);
    return this;
  }
});


var main_view = new MainView( {collection: this.contact_list}).render().el;
$('#main_container').html(main_view);
