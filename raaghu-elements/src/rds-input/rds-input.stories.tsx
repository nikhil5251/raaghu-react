import RdsInput from "./rds-input";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Input',
    component: RdsInput,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            options: ["small", "medium", "large"],
            control: { type: "select" },
        },
        inputType: {
            options: ["email", "text", "password", "otp", "number"],
            control: { type: "select" },
        },
        labelPosition: {
            options: ["top", "bottom", "floating", "right", "left"],
            control: { type: "select" },
        },
        tooltipPlacement: {
            options: ["top", "bottom", "right", "left"],
            control: { type: "radio" },
        },
        fontWeight: {
            options: ["normal", "bold", "light"],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsInput>;

export default meta;
type Story = StoryObj<typeof RdsInput>;

export const Default: Story = {
    args: {
        size: "medium",
        inputType: "text",
        placeholder: "Add Placeholder",
        label: "Label",
        labelPosition: "top",
        id: "default-input",
        value: "",
        required: true,
        showIcon: true,
        singleDigit: false,
        fontWeight: "normal",
    },
} satisfies Story;

Default.parameters = { controls: { include: ['size', 'inputType', 'placeholder', 'label', 'labelPosition', 'id', 'value', 'required', 'showIcon', 'singleDigit', 'fontWeight'] } };

export const Tooltip: Story = {
    args: {
        size: "medium",
        inputType: "text",
        placeholder: "Add Placeholder",
        label: "Label",
        labelPosition: "top",
        id: "tooltip-input",
        value: "",
        required: true,
        tooltipPlacement: "top",
        tooltipTitle: "This is tooltip",
        showIcon: true,
        fontWeight: "normal",
    },
} satisfies Story;

Tooltip.parameters = { controls: { include: ['size', 'inputType', 'placeholder', 'label', 'labelPosition', 'id', 'value', 'required', 'tooltipPlacement', 'tooltipTitle', 'showIcon', 'fontWeight'] } };

export const Disabled: Story = {
    args: {
        size: "medium",
        inputType: "text",
        placeholder: "Add Placeholder",
        label: "Label",
        labelPosition: "top",
        id: "disabled-input",
        value: "",
        required: true,
        isDisabled: true,
        showIcon: true,
        fontWeight: "normal",
    },
} satisfies Story;

Disabled.parameters = { controls: { include: ['size', 'inputType', 'placeholder', 'label', 'labelPosition', 'id', 'value', 'required', 'isDisabled', 'showIcon', 'fontWeight'] } };

export const Readonly: Story = {
    args: {
        size: "medium",
        inputType: "text",
        placeholder: "Add Placeholder",
        label: "Label",
        labelPosition: "top",
        id: "readonly-input",
        value: "",
        required: true,
        readonly: true,
        showIcon: true,
        fontWeight: "normal",
    },
} satisfies Story;

Readonly.parameters = { controls: { include: ['size', 'inputType', 'placeholder', 'label', 'labelPosition', 'id', 'value', 'required', 'readonly', 'showIcon', 'fontWeight'] } };

export const Email: Story = {
    args: {
        size: "medium",
        inputType: "email",
        placeholder: "Add Email",
        label: "Email",
        labelPosition: "top",
        id: "email-input",
        value: "",
        required: true,
        readonly: false,
        showIcon: true,
        fontWeight: "normal",
    },
} satisfies Story;

Email.parameters = { controls: { include: ['size', 'inputType', 'placeholder', 'label', 'labelPosition', 'id', 'value', 'required', 'readonly', 'showIcon', 'fontWeight'] } };

export const Password: Story = {
    args: {
        size: "medium",
        inputType: "password",
        placeholder: "Add Password",
        label: "Password",
        labelPosition: "top",
        id: "password-input",
        value: "",
        required: true,
        readonly: false,
        showIcon: true,
        fontWeight: "normal",
    },
} satisfies Story;

Password.parameters = { controls: { include: ['size', 'inputType', 'placeholder', 'label', 'labelPosition', 'id', 'value', 'required', 'showIcon', 'readonly', 'fontWeight'] } };

export const NumberInput: Story = {
    args: {
        size: "medium",
        inputType: "number",
        placeholder: "Add Number",
        label: "Number",
        labelPosition: "top",
        id: "number-input",
        value: "",
        required: true,
        readonly: false,
        showIcon: true,
        fontWeight: "normal",
        minValue: 1,
        maxValue: 100,
    },
} satisfies Story;

NumberInput.parameters = { controls: { include: ['size', 'inputType', 'placeholder', 'label', 'labelPosition', 'id', 'value', 'required', 'showIcon', 'readonly', 'minValue', 'maxValue', 'fontWeight'] } };

export const CardNumber: Story = {
    args: {
        size: "medium",
        inputType: "number",
        placeholder: "xxxx xxxx xxxx xxxx",
        label: "Card Number",
        labelPosition: "top",
        id: "card-number-input",
        value: "",
        required: true,
        readonly: false,
        showIcon: true,
        fontWeight: "normal",
        minLength: 16,
        maxLength: 16,
    },
} satisfies Story;

CardNumber.parameters = { controls: { include: ['size', 'inputType', 'placeholder', 'label', 'labelPosition', 'id', 'value', 'required', 'showIcon', 'readonly', 'minLength', 'maxLength', 'fontWeight'] } };
