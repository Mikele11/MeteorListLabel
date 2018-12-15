import { Companies } from '../companies.js';

Meteor.publish('companies', function companiesPublication() {
	return Companies.find();
});