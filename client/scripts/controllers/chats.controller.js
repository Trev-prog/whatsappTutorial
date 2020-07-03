//controller for chats.html

import { Controller } from 'angular-ecmascript/module-helpers';
//import the controller from angular

import { Chats } from '../../../lib/collections';
//import Chats MondgoDB from lib collections.js 

import { Extra } from '../../../lib/collections';

 
export default class ChatsCtrl extends Controller {
  constructor() { //constructs a new object which returns Chats.find() --> this mondoDB.find() returns up to first twenty items in Chats
    super(...arguments); //calls parent object functions..how???!!!!!!!!!!!
 
    this.helpers({ //this function will return all chats in the Chats MongoDB
      data() { //the data datastruct holds the chats info
        return Chats.find(); //MongoDB.find() returns all items in Chats
      },
      getTitle(){
        return Extra.findOne(); //added
      }
    });
  }
 
  remove(chat) { //this function removes a chat from Chats MongoDB by chat id
    Chats.remove(chat._id);
  }
}

ChatsCtrl.$name = 'ChatsCtrl';

//name the exported function as ChatsCtrl???