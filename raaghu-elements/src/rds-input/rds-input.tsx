import React, { useEffect, useState } from "react";
import "./rds-input.css";
import RdsIcon from "../rds-icon";
import { useTranslation } from "react-i18next";

export interface RdsInputProps {
    size?: "small" | "large" | "medium" | string;
    isDisabled?: boolean;
    readonly?: boolean;
    value?: string;
    inputType?: string;
    validatonPattern?: RegExp;
    validationMsg?: string;
    placeholder?: string;
    autoFocus?: [boolean, number];
    singleDigit?: boolean;
    ref?: any;
    labelPosition?: string;
    name?: string;
    label?: string;
    id?: string;
    required?: boolean;
    dataTestId?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => any;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => any;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => any;
    onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    customClasses?: string;
    reset?: boolean;
    fontWeight?: string;
    minLength?: number;
    maxLength?: number;
    minValue?: number;
    maxValue?: number;
    showIcon?: boolean;
    state?: string;
    tooltipPlacement?: "top" | "bottom" | "left" | "right";
    tooltipTitle?: string;
}

const RdsInput = React.forwardRef<HTMLInputElement, RdsInputProps>((props, ref) => {
    const { t } = useTranslation();
    const [value, setValue] = useState(props.value);
    const [errorRegardingLengthOrValue, setErrorRegardingLengthOrValue] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isTouch, setIsTouch] = useState(false);
    const [isValid, setIsValid] = useState<boolean>(true);

    useEffect(() => {
        setValue(props.value ?? "");
    }, [props.value]);

    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setIsTouch(true);
        props.onChange && props.onChange(e);
        setHasError(!inputValue);

        if (props.validatonPattern && inputValue) {
            const urlPattern = props.validatonPattern;
            setIsValid(urlPattern.test(inputValue));
        } else {
            setIsValid(true);
        }

        const valueLength = inputValue.length;

        if (inputValue) {
            if (valueLength < (props.minLength || 0)) {
                setErrorRegardingLengthOrValue(`This field must be a string or array type with a minimum length of ${props.minLength}.`);
            } else if (valueLength > (props.maxLength || Infinity)) {
                setErrorRegardingLengthOrValue(`This field must be a string or array type with a maximum length of ${props.maxLength}.`);
            } else {
                setErrorRegardingLengthOrValue("");
            }

            const numInputValue = Number(inputValue);

            if (props.minValue !== undefined && numInputValue < props.minValue) {
                setErrorRegardingLengthOrValue(`Value should be greater than ${props.minValue}`);
            } else if (props.maxValue !== undefined && numInputValue > props.maxValue) {
                setErrorRegardingLengthOrValue(`Value cannot be more than ${props.maxValue}`);
            } else {
                setErrorRegardingLengthOrValue("");
            }
        } else {
            setErrorRegardingLengthOrValue("");
        }

        setValue(inputValue);
    };

    const inputClasses = "form-control mt-1 " + (props.customClasses || "");

    return (
        <div className="input-group mb-2">
            <label htmlFor={props.id} className={`text-capitalize form-label ${props.fontWeight ? `fw-${props.fontWeight}` : ''}`}>
                {props.label}
                {(props.required || props.validatonPattern) && <span className="text-danger ms-1">*</span>}
            </label>
            <div>
                <input
                    type={props.inputType === "password" ? (showPassword ? "text" : "password") : props.inputType}
                    maxLength={props.inputType === "otp" && props.singleDigit ? 1 : undefined}
                    className={inputClasses}
                    id={props.id}
                    placeholder={props.placeholder}
                    required={props.required}
                    onFocus={props.onFocus}
                    onBlur={props.onBlur}
                    onKeyDown={props.onKeyDown}
                    value={value ?? ""}
                    onChange={handlerChange}
                    disabled={props.isDisabled}
                    readOnly={props.readonly}
                    data-testid={props.dataTestId}
                    onClick={props.onClick}
                    ref={ref}
                />

            </div>
            {/* Error Messages */}
            {hasError && isTouch && (
                <div className="form-control-feedback">
                    {props.value === "" && (
                        <span className="text-danger">{props.label} {t("is required")}</span>
                    )}
                </div>
            )}
            {props.validatonPattern && props.validationMsg && isTouch && !isValid && (
                <div className="form-control-feedback">
                    <span className="text-danger">{props.validationMsg}</span>
                </div>
            )}
            {errorRegardingLengthOrValue && (
                <div className="form-control-feedback">
                    <span className="text-danger">{errorRegardingLengthOrValue}</span>
                </div>
            )}
        </div>
    );
});

RdsInput.displayName = "RdsInput";
export default RdsInput;
