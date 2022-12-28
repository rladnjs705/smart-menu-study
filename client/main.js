//imports/ui/main.js를 구동시켜주는 역할
import { Meteor } from 'meteor/meteor';

if(Meteor.isClient) import '/imports/ui/main';