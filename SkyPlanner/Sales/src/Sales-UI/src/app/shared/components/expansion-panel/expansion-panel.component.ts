import { FormGroup } from '@angular/forms';
import {
    Component,
    Input,
    OnInit,
    TemplateRef,
    ViewEncapsulation,
} from '@angular/core';

@Component({
    selector: 'expansion-panel',
    templateUrl: './expansion-panel.component.html',
    styleUrls: ['./expansion-panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ExpansionPanelComponent {
    constructor() {
        this._parent = new FormGroup({});
    }

    private _title: string | undefined;
    @Input()
    get title(): string {
        return this._title || 'No Header';
    }
    set title(value: string) {
        this._title = value;
    }
    @Input()
    description: TemplateRef<any> | undefined;
    @Input()
    content: TemplateRef<any> | undefined;
    @Input()
    resume: TemplateRef<any> | undefined;
    private _parent: FormGroup;
    @Input()
    get parent(): FormGroup {
        return this._parent;
    }
    set parent(value: FormGroup) {
        this._parent = value;
    }
    @Input()
    expandByDefault = false;
}
