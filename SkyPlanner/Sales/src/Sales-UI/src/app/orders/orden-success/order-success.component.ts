import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'order-success',
    templateUrl: './order-success.component.html',
    styleUrls: ['./order-success.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class OrderSuccessComponent {
    constructor(private router: Router) {}
    navigate(path: string): void {
        this.router.navigate([path]);
    }
}
