import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter < any >= new EventEmitter();
  @ViewChild('toggleButton')
  toggleButton!: ElementRef;
  @ViewChild('menu')
  menu!: ElementRef;
menuStatus:boolean=false
isMenuOpen!: boolean;
  constructor( private router: Router,private renderer: Renderer2) {
//     this.renderer.listen('window', 'click',(e:Event)=>{
//      if(e.target !== this.toggleButton.nativeElement.focus() && e.target!==this.menu.nativeElement.focus()){
//          this.isMenuOpen=false;
//      }
//  });
  }

  ngOnInit(): void {
  }
  SideNavToggle() {
    this.toggleSidebarForMe.emit();

  }

  toggleMenu(){
    this.isMenuOpen=!this.isMenuOpen
  }

  logOut() {
    this.router.navigate(['/auth/login']);
    localStorage.clear();
    localStorage.removeItem('UserDetails');
    localStorage.removeItem('otpResponse');
  }
}
