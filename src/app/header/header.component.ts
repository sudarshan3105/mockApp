import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() scrollToSection = new EventEmitter<string>(); 
  close : boolean = true;
  isDark: boolean = false;
  theme: string | null | undefined;

  ngOnInit(){
    this.theme = sessionStorage.getItem('theme');
    if(this.theme == "true"){
      this.isDark = !this.isDark;
    }
  }

  closeMenu(){
    this.close = !this.close;
  }

}
