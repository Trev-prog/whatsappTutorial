import { _ } from 'meteor/underscore';
import { Config, Runner } from 'angular-ecmascript/module-helpers';

import chatsTemplateUrl from '../templates/chats.html';
import settingsTemplateUrl from '../templates/settings.html';
import chatTemplateUrl from '../templates/chat.html';
import tabsTemplateUrl from '../templates/tabs.html';

import confirmationTemplateUrl from '../templates/confirmation.html';
import loginTemplateUrl from '../templates/login.html';
import profileTemplateUrl from '../templates/profile.html';

class RoutesConfig extends Config {
  
  constructor() {
    super(...arguments);
 
    this.isAuthorized = ['$auth', this.isAuthorized.bind(this)];
    //returns a promise, 
    // A promise is an object that may produce a single value some time in 
    //the future: either a resolved value, or a reason that it’s not resolved
    // (e.g., a network error occurred). A promise may be in one of 3 possible
    // states: fulfilled, rejected, or pending. Promise users can attach 
    //callbacks to handle the fulfilled value or the reason for rejection.
  }

  configure() {
    this.$stateProvider //!!!!!!!!!!!!!!!!!!!!!!!!!
//The $stateProvider provides interfaces to declare these states for your app.
//A state corresponds to a "place" in the application in terms of the overall UI and navigation
      .state('tab', {
        url: '/tab',
        abstract: true, 
//abstract indicates that the state 'tab' by itself is invalid, 
//but its child states (such as tab/chats) is valid
//see: https://stackoverflow.com/questions/33181532/why-give-an-abstract-true-state-a-url
        templateUrl: tabsTemplateUrl,
//this references the imported template above defined in '../templates/tabs.html'
        resolve: {
          user: this.isAuthorized
        } //user must be logged in to access this tab
      })
      .state('tab.chats', {
        url: '/chats',
        views: {
          'tab-chats': { //"tab-chats" used in tabs.html as the ion-nav-view name
            templateUrl: chatsTemplateUrl, //the url template is the imported chats html
            controller: 'ChatsCtrl as chats' //chats.controller.js is set to this state's controller
          }
        }
      })
      .state('tab.chat', {
        url: '/chats/:chatId',
        views: {
          'tab-chats': { //we are in the tab-chats from tabs.html
            templateUrl: chatTemplateUrl, //the template we call is the chatsTemplateUrl or the chat.html
            controller: 'ChatCtrl as chat' //use the ChatCtrl (chat.controller.js) and call it chat
          }
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: loginTemplateUrl,
        controller: 'LoginCtrl as logger'
      })
      .state('confirmation', {
        url: '/confirmation/:phone',
        templateUrl: confirmationTemplateUrl,
        controller: 'ConfirmationCtrl as confirmation'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: profileTemplateUrl,
        controller: 'ProfileCtrl as profile',
        resolve: {
          user: this.isAuthorized
        }
      })
      .state('tab.settings', {
        url: '/settings',
        views: {
          'tab-settings': {
            templateUrl: settingsTemplateUrl,
            controller: 'SettingsCtrl as settings',
          }
        }
      });
    //!!!!!!!!!!!!!!!!!!!!!!!!!
    this.$urlRouterProvider.otherwise('tab/chats');
    //this is our DEFAULT route, unless specified otherswise
  }
  isAuthorized($auth) {
    return $auth.awaitUser();
  }
}

//RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
//!!!!!!!!!!!!!!!!!!!!!!!!!

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
 
class RoutesRunner extends Runner {
  run() {
    this.$rootScope.$on('$stateChangeError', (...args) => {
      const err = _.last(args);
 
      if (err === 'AUTH_REQUIRED') {
        this.$state.go('login'); //where we go if not logged in
      }
    });
  }
}
 
RoutesRunner.$inject = ['$rootScope', '$state'];
 
export default [RoutesConfig, RoutesRunner];