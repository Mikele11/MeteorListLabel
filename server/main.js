import '/imports/startup/server';

import {Meteor} from 'meteor/meteor';
import { Companies } from '../imports/api/companies.js';

Meteor.methods({
    'insertVal': function (value) {
        Companies.insert(value);
        return Companies.find().fetch();
    },
    'deleteVal':function(id) {
        Companies.remove(id);
        return Companies.find().fetch();
    },
    'getAllVal':function() {
        return Companies.find().fetch();
    },
    'rebuildList':function(arr) {
      for (var i = 0; i < arr.length; i++) {
        Companies.update({"_id" : arr[i].id},
        {$set: {logo: arr[i].logo, name: arr[i].name, address: arr[i].address, countEmployee: arr[i].countEmployee}});
      }
      return Companies.find().fetch();
    },
});



