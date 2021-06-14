import { environment } from 'environments/environment';
import { Order } from './shared/core/models/order';
import { Component, OnInit } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormBuilder,
    Validators,
} from '@angular/forms';
import { OrderProduct, Product } from '@shared/core/models';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor() {}

    title = 'SkyPlanner Sales';
}
