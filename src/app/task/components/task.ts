import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { Button } from '../../shared/components/button/button';
import { Title } from '../../shared/components/title/title';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.html',
  styleUrl: './task.scss',
  imports: [Button, Title],
})
export class Task {
  title = signal('task-twenty');
  titleUpper = computed(() => this.title().toUpperCase());
  titleLinked = linkedSignal(() => this.title());
  counter = signal(0);
  protected subTitle = 'subTitle string';
  private taskService = inject(TaskService);

  handleClickButton(): void {
    console.log('Button clicked: ' + this.counter() + ' times');
    this.counter.update((value) => value + 1);
    this.title.update((value) => value + this.counter());
  }

  clearTitle(): void {
    this.title.set(this.taskService.clearTitle());
    this.titleLinked.set('clear title');
  }
}
