import { Component, signal } from '@angular/core';
import { Button } from '../../shared/components/button/button';
import { Title } from '../../shared/components/title/title';

@Component({
  selector: 'app-task',
  templateUrl: './task.html',
  styleUrl: './task.scss',
  imports: [Button, Title],
})
export class Task {
  title = signal('task-twenty');
  counter = signal(0);
  protected subTitle = 'subTitle string';

  handleClickButton():void{
    console.log('Button clicked: '+ this.counter() + ' times'
    );
    this.counter.update((value) => value + 1);
    this.title.update((value) => value + this.counter());
  }
}
