import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private snackBar: MatSnackBar) { }

    success(message: string) {
        this.snackBar.open(message, null, {
            duration: 3000,
            panelClass: ['success-snackbar'],
            verticalPosition: 'top'
        });
    }

    error(message: string) {
        this.snackBar.open(message, null, {
            duration: 3000,
            panelClass: ['error-snackbar'],
            verticalPosition: 'top'
        });
    }
}
