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
            options: ["medium","small",  "large"],
            control: { type: "select" },
        },
        inputType: {
            options: ["text","email", "password","number","phone number","card number", "otp"],
            control: { type: "select" },
        },
        state: {
            options: ["default","active", "selected","error","disable"],
            control: { type: "select" },
        },
        style: {
            options: ["Default","Bottom Outline", "Pill"],
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
    },
} satisfies Meta<typeof RdsInput>;

export default meta;
type Story = StoryObj<typeof RdsInput>;

export const Default: Story = {
    args: {
        size: "medium",
        inputType: "text",
        state: "default",
        style: "Default",
        label: "Label",
        showTitle: true,
        labelPosition: "top",
        HintText:"Hint Text",
        ShowHintText:true,
        id: "",
        value: "",
        required: true,
        showIcon: true,
        singleDigit: false,
    }
} satisfies Story;
Default.parameters = { controls: { include: ['size', 'inputType', 'state','style','placeholder', 'label','showTitle', 'labelPosition','HintText','showHintText', 'id', 'value', 'required', 'showIcon', 'singleDigit'] } };

export const Tooltip: Story = {
    args: {
        size: "medium",
        inputType: "text",
        state: "default",
        style: "Default",
        label: "Label",
        showIcon: true,
        labelPosition: "top",
        HintText:"Hint Text",
        ShowHintText:true,
        id: "",
        value: "",
        required: true,
        tooltipPlacement: "top",
        tooltipTitle: "This is tooltip",
        showTitle: true,
    }
} satisfies Story;
Tooltip.parameters = { controls: { include: ['size', 'inputType', 'state','style','placeholder', 'label', 'showTitle', 'labelPosition', 'HintText','showHintText','id', 'value', 'required', 'tooltipPlacement', 'tooltipTitle','showIcon'] } };

export const Disabled: Story = {
    args: {
        size: "medium",
        inputType: "text",
        state: "disable",
        style: "Default",
        label: "Label",
        showTitle: true,
        labelPosition: "top",
        HintText:"Hint Text",
        ShowHintText:true,
        id: "",
        value: "",
        required: true,
        isDisabled: true,
        showIcon: true,
    }
} satisfies Story;
Disabled.parameters = { controls: { include: ['size', 'inputType', 'state','style','placeholder', 'label', 'showTitle','labelPosition','HintText','showHintText', 'id', 'value', 'required', 'isDisabled', 'showIcon'] } };

export const Readonly: Story = {
    args: {
        size: "medium",
        inputType: "text",
        state: "default",
        style: "Default",
        label: "Label",
        showTitle: true,
        labelPosition: "top",
        HintText:"Hint Text",
        ShowHintText:true,
        id: "",
        value: "",
        required: true,
        readonly: true,
        showIcon: true,
    }
} satisfies Story;
Readonly.parameters = { controls: { include: ['size', 'inputType', 'state','style','placeholder', 'label','showTitle', 'labelPosition','HintText','showHintText', 'id', 'value', 'required', 'readonly', 'showIcon'] } };

export const Email: Story = {
    args: {
        size: "medium",
        inputType: "email",
        state: "default",
        style: "Default",
        label: "Email",
        showTitle: true,
        labelPosition: "top",
        HintText:"Hint Text",
        ShowHintText:true,
        id: "",
        value: "",
        required: true,
        readonly: false,
        showIcon: true,
    }
} satisfies Story;
Email.parameters = { controls: { include: ['size', 'state','style','placeholder', 'label', 'showTitle','labelPosition', 'HintText','showHintText','id', 'value', 'required','showTitle','showIcon', 'readonly'] } };

export const Password: Story = {
    args: {
        size: "medium",
        inputType: "password",
        state: "default",
        style: "Default",
        label: "Password",
        showTitle: true,
        labelPosition: "top",
        HintText:"Hint Text",
        ShowHintText:true,
        id: "",
        value: "",
        required: true,
        readonly: false,
        showIcon: true,
    }
} satisfies Story;
Password.parameters = { controls: { include: ['size', 'state','style','placeholder', 'label','showTitle', 'labelPosition','HintText','showHintText', 'id', 'value', 'required', 'showIcon', 'readonly'] } };