import { Component } from '@angular/core';

@Component({
  selector: 'app-slot-screen',
  templateUrl: './slot-screen.component.html',
  styleUrls: ['./slot-screen.component.css']
})
export class SlotScreenComponent {
  // wordList: string[] = [
  //   'office', 'official', 'teamwork', 'monitor',
  //   'schedule', 'prepare', 'track', 'record',
  //   'remember', 'make a note', 'archive', 'timeshift',
  // ];

  currentWord: string = '';
  isSpinning: boolean = false;
  private spinInterval: any;

  startSpin(wordList: string[]): Promise<string> {
    return new Promise((resolve) => {
      if (wordList.length === 0) {
        resolve('');
        return;
      }

      this.isSpinning = true;
      let index = 0;

      this.spinInterval = setInterval(() => {
        this.currentWord = wordList[index % wordList.length];
        index++;
      }, 100);

      // Stop after 3 seconds
      setTimeout(() => {
        clearInterval(this.spinInterval);
        const randomIndex = Math.floor(Math.random() * wordList.length);
        this.currentWord = wordList[randomIndex];
        this.isSpinning = false;

        resolve(this.currentWord);
      }, 3000);
    });
  }
}
