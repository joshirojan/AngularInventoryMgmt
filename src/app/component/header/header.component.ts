import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  fullName: string | null = null;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('jwtToken');
    if (this.isLoggedIn) {
      const token = localStorage.getItem('jwtToken');
      if (token != null) {
        const decodedToken: any = jwtDecode(token);
        this.fullName = decodedToken
          ? decodedToken[
              'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
            ]
          : null;
      }
    }
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
