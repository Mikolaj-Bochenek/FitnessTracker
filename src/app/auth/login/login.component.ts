import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authServie: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    this.authServie.login({
      email: form.value.email,
      password: form.value.password
    });
  }
}
