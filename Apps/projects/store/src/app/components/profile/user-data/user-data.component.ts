import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  @Input() user: any;
  initials: string = '';

  colors: string[] = [
    '#003f88',
    '#fdd023',
    '#2e933c',
    '#6e4c0d',
    '#001d3d',
    '#4c5b5c',
    '#34252f',
    '#5989cf',
    '#9e3939',
    '#ff6200'
  ]
  color: string;

  constructor() { }

  ngOnInit(): void {
    //Avatar color
    this.color = this.getRandomColor()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'].currentValue.name) this.setInitialsAvatar();
    this.user = changes['user'].currentValue
  }

  // Initials to Avatar
  setInitialsAvatar(): void {
    for (let i = 0; i < this.user.name.length; i++) {
      if (i == 0) {
        this.initials = this.user.name.charAt(i).toUpperCase();
        continue;
      }

      if (this.user.name.charAt(i) === ' ')
        if ((i + 1) < this.user.name.length)
          if (this.user.name.charAt(i + 1) !== ' ')
            this.initials += this.user.name.charAt(i + 1).toUpperCase();

      if (this.initials.length >= 2)
        break;
    }

    if (this.initials.length < 2)
      this.initials += this.user.name.charAt(1).toUpperCase();
  }

  //Change color of avatar
  getRandomColor(): string {
    let index = Math.floor(Math.random() * (9 + 1))
    return this.colors[index];
  }

}
