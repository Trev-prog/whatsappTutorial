import { Meteor } from 'meteor/meteor';
import { Chats, Messages } from '../lib/collections';

Meteor.methods({
	newMessage(message){
	    if (!this.userId) {
	      throw new Meteor.Error('not-logged-in',
	        'Must be logged in to send message.');
	    }
		check(message, { //check that the entered message is of type string
			type: String,
			text: String,
			chatId: String
		})

		message.timestamp = new Date(); //assign the new message the current date
		message.userId = this.userId;

		const messageId = Messages.insert(message); //insert it into the Messages MongoDB
		
		Chats.update(message.chatId, { $set : { lastMessage: message } });//update the current chats view to show this new message as the most recent message

		return messageId;
  },
  updateName(name) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update his name.');
    }
 
    check(name, String);
 
    if (name.length === 0) {
      throw Meteor.Error('name-required', 'Must provide a user name');
    }
 
    return Meteor.users.update(this.userId, { $set: { 'profile.name': name } });
	}
});