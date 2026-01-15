    export const isValidCharacter = (character) => {
        const validCharacters = ["1","2","3","4","5","6","7","8","9","0",".","-"];
        if (!validCharacters.includes(character)) return false;
        return true;
    }

    export const isControlCharacter = (character) => {
        const controlCharacters = ["Backspace","Enter"];
        if(!controlCharacters.includes(character)) return false;
        return true;
    }

    export const isValidFormat = (input) => {
        const amountRegEx = /^-?[0-9]*.{0,1}[0-9]{0,2}$/;
        const validationResult = amountRegEx.test(input);
        return validationResult;
    }