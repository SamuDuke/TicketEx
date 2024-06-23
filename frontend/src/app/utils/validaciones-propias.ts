import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

export class ValidacionesPropias {

    static contrasenaValida(control: AbstractControl): ValidationErrors| null {
        let psw = control.value;
        let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$!%*#?.^_-]).{8,64}$/;

        if (regex.test(psw))
            return null;
        else
            return { contrasenaValida: true }
    }

    static correoValido(control: AbstractControl): ValidationErrors| null {
        let email = control.value;
        let regex = /^[a-zA-Z0-9._-]+@(gmail|hotmail|educa\.jcyl)+\.(com|es)$/;

        if (regex.test(email))
            return null;
        else
            return { correoValido: true }
    }
}
