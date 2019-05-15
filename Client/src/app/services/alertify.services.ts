import { Injectable } from "@angular/core";
declare let alertify: any;
@Injectable({
    providedIn: 'root'
})

export class AlertifyService {
    constructor() {}
    //OkCallback: () => any means function of type any
    confirm(message: string, OkCallback: () => any){
        //e represents the user clicking OK, it's the clickevent. So if user cliks OK we call the OkCallback function
        alertify.confirm(message, function(e) {
            if (e) {
                OkCallback();
            } else {}
        })
    }

    success(message: string) {
        alertify.success(message);
    }
    error(message: string) {
        alertify.error(message);
    }
    warning(message: string) {
        alertify.warning(message);
    }
    message(message: string) {
        alertify.message(message);
    }
}