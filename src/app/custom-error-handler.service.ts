import { Injectable, ErrorHandler, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandlerService extends ErrorHandler {

  constructor(private snackbar: MatSnackBar, private zone: NgZone) {
    super();
   }

  override handleError(error: unknown): any {
    this.zone.run(() => {
      this.snackbar.open('Error!', 'Close', { duration: 3000})
      console.warn(error);
    })
  }
}
