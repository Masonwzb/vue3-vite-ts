/// <reference path="Validation.ts" />
namespace Validation {
    const lettersRegexp = /^[A-Za-z]+$/;
    export class LettersOnlyValidator implements StringValidator {
        myA: string = '123';
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }
}