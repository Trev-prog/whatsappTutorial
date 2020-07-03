//we put these in a lib folder at the same level as the client
//and server directories in order to ensure they are accessible to both

import { Mongo } from 'meteor/mongo';
 
export const Chats = new Mongo.Collection('chats');
export const Messages = new Mongo.Collection('messages');

//my add
export const Extra = new Mongo.Collection('extra');