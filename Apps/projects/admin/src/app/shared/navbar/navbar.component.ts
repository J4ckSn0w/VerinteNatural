import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/sessionService.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logged = false;

  constructor(
    private router: Router,
    private sessionService:SessionService
  ) { }

  ngOnInit(): void {
    this.fnSesionIniciada();
    this.myFunction();
  }

  fnSesionIniciada(){
    let valor = localStorage.getItem("authorization");
    if(localStorage.getItem("authorization")){
      console.log('Entre al true');
      this.logged = true;
    }else{
      console.log('Entre a false');
      this.logged = false;
    }
  }

  fnLogout() {
    this.sessionService.fnLogOut();
    this.router.navigate(['/']);
}

 openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("container").style.marginLeft = "250px";
  }

 closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("container").style.marginLeft = "0";
  }

  myFunction(){
    var dropdown = document.getElementsByClassName("dropdown-btn");
    console.log(dropdown);
    var i;

    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var dropdownContent = this.nextElementSibling;
      if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
      } else {
      dropdownContent.style.display = "block";
      }
      });
  }
}

}
