import { Component, OnInit, ElementRef } from '@angular/core';
import { ConfirmationBoxComponent } from '../popups/confirmation-box/confirmation-box.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
	 toggleButton: any;
   sidebarVisible: boolean;
   email=localStorage['email'];
  constructor(private element: ElementRef,public dialog: MatDialog,private router:Router) { }

  ngOnInit(){
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    }

   sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    onLogOut(){
       let dialogRef = this.dialog.open(ConfirmationBoxComponent, {
            width: '300px',
            data:{ message:"forLogout"}
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            if (result=="yes") {
                localStorage.removeItem('adminLogin');
               this.router.navigate(['/login'])
            }
          }
        });
    }

}
