import { Component, OnInit } from '@angular/core';
import { Database, ref, set, onValue, push } from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message : string = '';
  chat : string = '';

  constructor ( private database : Database) {}

  ngOnInit(): void {
    const updateRef = ref(this.database, 'messages/');
    onValue(updateRef, (snapshot) => {
      snapshot.forEach((child) => {
        console.log(child.val());
        this.chat = child.val()['message'];
        console.log(this.chat);
      })
    });
  }

  sendMessage (message : string) {
    const reference = ref(this.database, 'messages/');
    const postRef = push(reference);
    set(postRef, {
      message
    })
  }
}
