import {
    MatSnackBar,
    MatSnackBarRef,
    SimpleSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SnackBarService {
    constructor(private _matSnackBar: MatSnackBar) {}
    show(
        message: string,
        actions: string,
        duration: number = 12000,
        verticalPosition: MatSnackBarVerticalPosition = 'top',
        horizontalPosition: MatSnackBarHorizontalPosition = 'right',
        panelClass: string = 'style-error',
    ): MatSnackBarRef<SimpleSnackBar> {
        return this._matSnackBar.open(message, actions, {
            duration: duration,
            verticalPosition: verticalPosition,
            horizontalPosition: horizontalPosition,
            panelClass: panelClass,
        });
    }
}
