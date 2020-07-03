import Ionic from 'ionic-scripts';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Chats, Messages } from '../../../lib/collections';

export default class ChatCtrl extends Controller {
	constructor() { //constructor methods vs other methods?????
		super(...arguments);

		this.chatId = this.$stateParams.chatId; //stateParams????!!!!!!!!!!!!!!!!!!!!
		//!!!!!!!!!!!!!!!!!!!!!!!!!!
	    this.isIOS = Ionic.Platform.isWebView() && Ionic.Platform.isIOS();
	    this.isCordova = Meteor.isCordova;

		this.helpers({
			messages(){
				return Messages.find({ chatId: this.chatId }); //get the messages corresponding to this chatId
			},
			data(){
				return Chats.findOne(this.chatId); //find the chat correspondiong to this chatId
			}
		});
 
    this.autoScroll();
	}

	sendMessage(){
		if (_.isEmpty(this.message)) return;

		this.callMethod( 'newMessage', { //calls the method newMessage from lib/methods.js (accessible to bother server and client) and passes in the following:
			text: this.message,
			type: 'text',
			chatId: this.chatId
		})

		delete this.message

	}
	  autoScroll() {
	    let recentMessagesNum = this.messages.length;
	 
	    this.autorun(() => {
	      const currMessagesNum = this.getCollectionReactively('messages').length;
	      const animate = recentMessagesNum != currMessagesNum;
	      recentMessagesNum = currMessagesNum;
	      this.scrollBottom(animate);
	    });
	  }

	inputUp(){
		if(this.isIOS) {
			this.keyboardHeight = 216;
		}
		this.scrollBottom(true);
	}

	inputDown() {
		if (this.isIOS){
			this.keyboardHeight = 0;
		}

		this.$ionicScrollDelegate.$getByHandle('chatScroll').resize();
		//we enable this method to allow scrolling an call it in chat.html
	}

	closeKeyboard () {
	    if (this.isCordova) {
	      cordova.plugins.Keyboard.close();
	    }
	}
	 
	scrollBottom(animate) {
	    this.$timeout(() => {
	      this.$ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(animate);
	    }, 300);
	}

}

ChatCtrl.$name = 'ChatCtrl';
ChatCtrl.$inject = ['$stateParams']
//??