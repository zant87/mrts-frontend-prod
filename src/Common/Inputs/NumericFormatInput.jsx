import React from 'react';
import MaskedInput from 'react-text-mask';

const NumericFormatInput = (props) => {
    const {inputRef, ...other} = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/\d+/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

export default NumericFormatInput;
