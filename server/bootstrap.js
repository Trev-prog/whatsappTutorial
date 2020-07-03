import Moment from 'moment';
import { Meteor } from 'meteor/meteor';
import { Chats, Messages, Extra } from '../lib/collections';
//add

Meteor.startup(function(){
	  if (Chats.find().count() !== 0) return;
 
  Messages.remove({});
 
  const messages = [ //an array of messages, with two data types, a text and a timestamp
    {
      text: 'You on your way?',
      timestamp: Moment().subtract(1, 'hours').toDate()
    },
    {
      text: 'Hey, it\'s me',
      timestamp: Moment().subtract(2, 'hours').toDate()
    },
    {
      text: 'I should buy a boat',
      timestamp: Moment().subtract(1, 'days').toDate()
    },
    {
      text: 'Look at my mukluks!',
      timestamp: Moment().subtract(4, 'days').toDate()
    },
    {
      text: 'This is wicked good ice cream.',
      timestamp: Moment().subtract(2, 'weeks').toDate()
    }
  ];
 
  messages.forEach((m) => { //insert all items in the messages array into
    //the Messages MongoDB
    Messages.insert(m);
  });


  //------------------------ADD
  const titles = [ //an array of messages, with two data types, a text and a timestamp
    {
      title: 'Dr.'
    },
    {
      title: 'Ms.'
    },
    {
      title: 'Mrs.'

    },
    {
      title: 'III'
    },
    {
      title: 'Jr.'
    }
  ];
 
  titles.forEach((t) => { //insert all items in the messages array into
    //the Messages MongoDB
    Extra.insert(t);
  });
  //-------------------------END ADD
 
  const chats = [ //an array of chats, with two data types, a name and picture
    {
      name: 'Ethan Gonzalez',
      picture: 'https://randomuser.me/api/portraits/thumb/men/1.jpg'
    },
    {
      name: 'Bryan Wallace',
      picture: 'https://randomuser.me/api/portraits/thumb/lego/1.jpg'
    },
    {
      name: 'Avery Stewart',
      picture: 'https://randomuser.me/api/portraits/thumb/women/1.jpg'
    },
    {
      name: 'Katie Peterson',
      picture: 'https://randomuser.me/api/portraits/thumb/women/2.jpg'
    },
    {
      name: 'Ray Edwards',
      picture: 'https://randomuser.me/api/portraits/thumb/men/2.jpg'
    }
  ];
 
  chats.forEach((chat) => {  //move all chates into the Chats MongoDB and give them a chatID ??
    const message = Messages.findOne({ chatId: { $exists: false } });
    //find an item in message which does not yet have a chatId
    chat.lastMessage = message; //creates a lastMessage key-value in each field in chats
    const chatId = Chats.insert(chat);
    //insert the chat into Chats, doing so, returns a mongoDB generated id that looks like: 
    Messages.update(message._id, { $set: { chatId } });
  });

});