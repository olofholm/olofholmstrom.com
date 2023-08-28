import { Component, OnInit } from '@angular/core';
import { Database, ref, set, onValue, push, remove } from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message : string = '';
  chats : string[] = [];

  constructor ( private database : Database) {}

  ngOnInit(): void {
    this.initChat();
  }

  initChat () {
    const updateRef = ref(this.database, 'messages/');
    onValue(updateRef, (snapshot) => {
      this.chats = [];
      snapshot.forEach((child) => {
        this.chats.push(child.val()['message']);
      })
      this.chats.reverse();
    });
  }

  sendMessage (message : string) {
    const reference = ref(this.database, 'messages/');
    const postRef = push(reference);
    set(postRef, {
      message
    });

    this.message = '';
  }

  clearChat () {
    const reference = ref(this.database, 'messages/');
    remove(reference);
  }
}
