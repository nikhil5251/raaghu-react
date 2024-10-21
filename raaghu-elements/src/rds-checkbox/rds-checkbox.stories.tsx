import RdsCheckbox from "./rds-checkbox";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: "Elements/Checkbox",
    component: RdsCheckbox,
    parameters: {
        layout: "padded",
    },
    tags: ["autodocs"],
    labelPosition: {
        options: ["right", "left"],
        control: { type: "select" },
    },
    argTypes: {
        state: {
            options: ["Checkbox", "Indeterminate", "ErrorCheckbox"],
            control: { type: "select" },
        },
        type: {
            options: ["Square", "Circular"],
            control: { type: "select" },
        }
    },
} satisfies Meta<typeof RdsCheckbox>;

export default meta;
type Story = StoryObj<typeof RdsCheckbox>;


export const checkBox: Story = {
    args: {
        type: "Square",
        state: "Checkbox",
        label: "default checkbox",
        checked: false,
        isDisabled: false,
        isSwitch: false,
        withlabel: true,
        id: "id1",
        labelPosition: "left",
        //errorMessage:"error Message",
        isInputGroup: false
    }
} satisfies Story;

checkBox.parameters = { controls: { include: ["type", "state", "label", "labelPosition", "checked", "isDisabled", "isSwitch", "withlabel", "id", "isInputGroup"] } };