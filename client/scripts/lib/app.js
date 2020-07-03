//Opened first because it is in lib and everything else depends on it

//In this file, we initialize all libraries we need
import 'angular-animate';
import 'angular-meteor';
import 'angular-meteor-auth';
import 'angular-moment';
import 'angular-sanitize';
import 'angular-ui-router';
import 'ionic-scripts';
import Angular from 'angular';
import Loader from 'angular-ecmascript/module-loader'; //allows us to load angualrjs modules
import { Meteor } from 'meteor/meteor';

// Modules
import ChatsCtrl from '../controllers/chats.controller'; //import the chats controller
import ChatCtrl from '../controllers/chat.controller';
import ConfirmationCtrl from '../controllers/confirmation.controller';
import LoginCtrl from '../controllers/login.controller';
import ProfileCtrl from '../controllers/profile.controller';
import SettingsCtrl from '../controllers/settings.controller';
import InputDirective from '../directives/input.directive';
import CalendarFilter from '../filters/calendar.filter';
import Routes from '../routes'; //get the module that tells us our routes

const App = 'Whatsapp';

// App is a variable that holds the name of our module (Whatsapp), 
//and we pass in an array of dependencies
Angular.module(App, [
  'angular-meteor',
  'angular-meteor.auth',
  'angularMoment',
  'ionic'
]); //!!!!!!!!!!!!!!!!!


//essentially, take the new app we just made, and load a bunch of js scripts into it
new Loader(App) //!!!!!!!!!!!!!!!!!
  .load(ChatsCtrl) //load the chats controller
  .load(ChatCtrl)
  .load(ConfirmationCtrl)
  .load(InputDirective)
  .load(CalendarFilter)
  .load(LoginCtrl)
  .load(SettingsCtrl)
  .load(ProfileCtrl)
  .load(Routes); //we don't need to load html scripts because this ties all our html to our js

// Startup: check for the current platform (browser or mobile)
//!!!!!!!!!!!!!!!!!
if (Meteor.isCordova) {
  Angular.element(document).on('deviceready', onReady);
}
else {
  Angular.element(document).ready(onReady);
}

function onReady() {
  Angular.bootstrap(document, [App]);
}
