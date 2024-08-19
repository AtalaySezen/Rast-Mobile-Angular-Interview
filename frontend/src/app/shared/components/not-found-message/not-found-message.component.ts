import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-not-found-message',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './not-found-message.component.html',
  styleUrl: './not-found-message.component.scss'
})
export class NotFoundMessageComponent {
  @Input() message: string = '';
  @Input() showNotFound: boolean = false;


}
