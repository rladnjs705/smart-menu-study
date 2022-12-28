//startup의 index.js를 구동시켜주는 역할
import { Meteor } from 'meteor/meteor';

if(Meteor.isServer) {
  import '/imports/startup';
}