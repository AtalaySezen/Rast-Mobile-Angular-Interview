import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  filterText: string = '';

  ngOnInit() {

  }




}
