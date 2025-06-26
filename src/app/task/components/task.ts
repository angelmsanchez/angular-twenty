import { Component } from '@angular/core';
import { Button } from '../../shared/components/button/button';

@Component({
  selector: 'app-task',
  templateUrl: './task.html',
  styleUrl: './task.scss',
  imports: [Button],
})
export class Task {
  protected title = 'task-twenty';
}
