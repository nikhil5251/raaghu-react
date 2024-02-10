import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import RdsInputGroup from "./rds-input-group";
import { input_size } from "../../libs/types/size";
import { button_colors } from "../../libs/types/colorvariant";


const meta: Meta = {
    title: 'Elements/Input Group',
    component: RdsInputGroup,
    parameters: {
        layout: '',
    },
    tags: ['autodocs'],
    argTypes: {
        colorVariant: {
            options: button_colors,
            control: { type: "select" },
        },
        size: {
            options: input_size,
            control: { type: "select" },
        },
        labelPosition: {
            options: ["top", "bottom"],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsInputGroup>;

export default meta;
type Story = StoryObj<typeof RdsInputGroup>;



export const InputGroup: Story = {
    args: {
        buttonLabel: "BUTTON",
        colorVariant: "primary",
        placeholder: "Placeholder text",
        size: "medium",
        outline: true,
        inputGroupLabel: "Field Label",
        labelPosition: "top",
        icon: ""
    }
} satisfies Story;

