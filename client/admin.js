import { Template } from 'meteor/templating';
import { Companies } from '../imports/api/companies.js';
import './admin.html'

Template.admin.onCreated(function createOnCreated() {
	this.autorun(() => {
		this.subscribe('companies');
	});
});
Template.admin.helpers({
    compan () {
    return Companies.find().fetch();
  }
});

Template.admin.events({
    'click .rebuild': function (e)  {
      e.preventDefault();
      var Item=[];

      $( '.editableRow' ).each(function( index ) {
        var myItem = {};
        myItem.id =  $( this ).find( 'tr > th > input.id') .val();
        myItem.logo =  $( this ).find( 'tr > th > input.logo') .val();
        myItem.name =  $( this ).find( 'tr > th > input.name') .val();
        myItem.address =  $( this ).find( 'tr > th > input.address') .val();
        myItem.countEmployee =  $( this ).find( 'tr > th > input.countEmployee') .val();
        Item[index] = myItem;
      });
      Meteor.call("rebuildList", Item,
      function (err, result) {
          if (err) {
            console.log("err",err);
          } else {
            console.log('Result from backend',result)
          }
        })
    }
  });
  