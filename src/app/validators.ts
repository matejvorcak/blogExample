import { Validator, AbstractControl, NG_VALIDATORS, ValidatorFn } from '@angular/forms';
import { Directive, Input } from "@angular/core";

export function equalPassValidator(appEqualValidator: string): ValidatorFn {
    return (c: AbstractControl): { [key: string]: any | null } => {
        const controlToCompare = c.root.get(appEqualValidator);
        if (controlToCompare && controlToCompare.value === c.value) return null;
        return { "equal": false }
    }
}

@Directive({
    selector: "[appEqualValidator]",
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: EqualValidatorDirective,
        multi: true
    }]
})
export class EqualValidatorDirective implements Validator {
    @Input() appEqualValidator: string;
    validate(c: AbstractControl): { [key: string]: any | null } {
        return this.appEqualValidator ? equalPassValidator(this.appEqualValidator)(c) : null;
    }

    registerOnValidatorChange(fn: () => void): void {
        // throw new Error("Method not implemented");
    }
}