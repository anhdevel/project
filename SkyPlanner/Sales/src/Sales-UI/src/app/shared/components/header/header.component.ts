import { Component, Input } from '@angular/core';
import { HeaderService } from './header.service';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    constructor(public headerService: HeaderService) {}
    @Input()
    title: string = '';
}
