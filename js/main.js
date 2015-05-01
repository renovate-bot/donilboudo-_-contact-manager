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

//View to show contacts 
var ContactListView = Backbone.View.extend({
  template: _.template("<tr id=contact>\
                       <td><%=lastname%></td>\
                       <td><%=firstname%></td>\
                       <td><%=phone%></td>\
                       <td><input type='button' id='update_button' value='Update' /></td>\
                       <td><input type='button' id='remove_button' value='Remove' /></td>\
                       </tr>"),

   events: {
            "click #update_button": "updateContact",
            "click #remove_button": "removeContact"
        },

  render: function(model, collection) {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  updateContact: function () {
    var contact = this.model.toJSON();
     console.log(contact);
    $("#last-name").val(contact.lastname);
    $("#first-name").val(contact.firstname);
    $("#phone").val(contact.phone);
  },

  removeContact: function () {
    contact_list.remove(this.model);
    this.$('#contact').remove();
  }
});

//Main view
var MainView = Backbone.View.extend({
  //define a template
  template: _.template("<table>\
                       <tr><td>Last Name</td><td><input type='text' id='last-name' /></td></tr>\
                       <tr><td>First Name</td><td><input type='text' id='first-name' /></td></tr>\
                       <tr><td>Phone</td><td><input type='text' id='phone' /></td></tr>\
                        <tr><td></td><td><input type='button' id='add_button' value='Save' /><input type='button' id='reset_button' value='Reset' /></td></tr>\
                       </table><br/><br/>\
                       <h4>Contacts</h4>\
                       <table id='contactList'></table>"),

  initialize: function() {
    this.listenTo(this.collection, 'add', this.addItem);
  },

  events: {
            "click #add_button": "addContact",
            "click #reset_button": 'removeItems'
        },

  addContact: function(event) {
    var lname = this.$("#last-name").val();
    var fname = this.$("#first-name").val();
    var phone = this.$("#phone").val();

    if (lname != '' && phone != '') {
        this.collection.add({ lastname: lname, firstname: fname, phone: phone });
        this.removeItems();
    } else {
      alert("Please enter the good informations");
    }
  },

  addItem: function (contact) {
    console.log(this);
    this.$('#contactList').append(new ContactListView({ model: contact}).render().el, this.collection);
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


var main_view = new MainView({ collection: this.contact_list }).render().el;
$('#main_container').html(main_view);
