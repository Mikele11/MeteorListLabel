import { Template } from 'meteor/templating';
import { Companies } from '../imports/api/companies.js';

import './main.html';
import './admin.js';
import './navigation.html'

Router.route('/', function () {
  this.render('navigation');
});
Router.route('/home', function () {
  this.render('home');
});
Router.route('/admin', function () {
  this.render('admin');
});

Template.home.onCreated(function() {

  var tmpl = this;

  tmpl.sortBy = new ReactiveVar('name');
  tmpl.sortOrder = new ReactiveVar(1);
  tmpl.search = new ReactiveVar('');
  tmpl.searchBool = new ReactiveVar(false);

});

Template.home.onCreated(function createOnCreated() {
	this.autorun(() => {
		this.subscribe('companies');
	});
});

Template.home.helpers({
  comp: function() {

    var tmpl = Template.instance();
    var sortBy = tmpl.sortBy.get();
    var sortOrder = tmpl.sortOrder.get();
    var search = tmpl.search.get();
    var searchBool = tmpl.searchBool.get();
    var sortSpecifier = {};
    sortSpecifier[sortBy] = sortOrder;
    var comp = Companies.find({}, {sort: sortSpecifier});

    if (searchBool) {
      return Companies.find({'address':search});
    }

    return comp;
  }
});

Template.home.events({
  'click .addComp': function (e)  {
    e.preventDefault();
    var item = {
      logo: document.getElementsByClassName("logo")[0].value,
      name: document.getElementsByClassName("name")[0].value,
      address: document.getElementsByClassName("address")[0].value,
      countEmployee: document.getElementsByClassName("countEmploye")[0].value
    }

    Meteor.call("insertVal", item,
    function (err, result) {
      if (err) {
        console.log("err",err);
      } else {
        console.log('Result from backend',result)
      }
    })
  },
  'click th[data-sortby]': function(e, tmpl) {
    var sortBy = e.currentTarget.getAttribute('data-sortby');
    if (tmpl.sortBy.get() === sortBy) {
      tmpl.sortOrder.set(-tmpl.sortOrder.get());
    } else {
      tmpl.sortBy.set(sortBy);
      tmpl.sortOrder.set(1);
    }
  },
  'click .searchBtn': function (event, tmpl) {
    event.preventDefault();
    tmpl.search.set(document.getElementsByClassName("search")[0].value);
    tmpl.searchBool.set(true);
  },
});


