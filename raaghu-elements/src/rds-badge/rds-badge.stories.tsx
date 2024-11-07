import React from "react";
import RdsBadge from "./rds-badge";
import RdsIcon from "../rds-icon/rds-icon";
import RdsButton from "../rds-button/rds-button";
import { Meta, StoryObj, } from "@storybook/react";
import { alert_colors } from "../../libs";
import { badge_colors } from "../../libs/types/colorvariant";

const meta: Meta = {
  title: 'Elements/Badge',
  component: RdsBadge,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ["small", "smaller", "smallest", "medium", "large"],
      control: { type: "select" },
    },
    badgeType: {
      options: ["rectangle", "pill", "box"],
      control: { type: "select" },
    },
    colorVariant: {
      options: badge_colors,
      control: { type: "select" },
    },
    layout: {
      options: ["Icon only", "Icon+Text", "Text only", "Text+Icon"],
      control: { type: "select" },
    },
    style: {
      options: ["Primary", "Outline", "disabled", "transparent"],
      control: { type: "select" },
    },
    state: {
      options: ["Primary", "Secondary", "Tertiary", "Error", "Neutral"],
      control: { type: "select" },
    },
    iconPosition: {
      options: ["left", "right"],
      control: { type: "select" },
    },
    isIconshow: {
      control: { type: "boolean" },
    },
    iconName: {
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof RdsBadge>;

export default meta;
type Story = StoryObj<typeof RdsBadge>;

const Positioned = (args: any) => (
  <>
    <RdsButton
      type="button"
      colorVariant="primary"
      size="small"
      label="Button"
    />
    <span className="position-fixed ms-2 translate-middle">
      <RdsBadge label={""} {...args}></RdsBadge>
    </span>
  </>
);

const PositionedIcon = (args: any) => (
  <>
    <RdsIcon
      name="notification"
      width="25px"
      height="25px"
      fill={false}
      stroke={true}
    />
    <span className="position-absolute ms-2 translate-middle">
      <RdsBadge label={""} {...args}></RdsBadge>
    </span>
  </>
);

export const TextBadge: Story = {
  args: {
    size: "small",
    label: "Badge",
    colorVariant: "primary",
    badgeType: "rectangle",
    layout: "Text Only",
    style: "Primary",
    state: "Primary"
  }
} satisfies Story;
TextBadge.parameters = { controls: { include: ['size', 'label', 'colorVariant', 'badgeType', 'layout', 'style', 'state'] } };

export const WithLabel: Story = {
  args: {
    size: "smaller",
    label: "99",
    colorVariant: "danger",
    badgeType: "rectangle",
    positioned: true,
  },
  render: Positioned
} satisfies Story;
WithLabel.parameters = { controls: { include: ['size', 'label', 'colorVariant', 'badgeType', 'positioned'] } };

export const WithIcon: Story = {
  args: {
    size: "smallest",
    label: "9",
    colorVariant: "danger",
    badgeType: "pill",
    positioned: true,
  },
  render: PositionedIcon
} satisfies Story;
WithIcon.parameters = { controls: { include: ['size', 'label', 'colorVariant', 'badgeType', 'positioned'] } };
export const TextWithLabel: Story = {
  args: {
    size: "smallest",
    label: "9",
    colorVariant: "danger",
    badgeType: "pill",
  },
  // render: PositionedIcon
} satisfies Story;
TextWithLabel.parameters = { controls: { include: ['size', 'label', 'colorVariant', 'badgeType', 'positioned', 'borderColor'] } };
export const BadgeWithIcon: Story = {
  args: {
    size: "small",
    colorVariant: "primary",
    badgeType: "pill",
    isIconshow: true,
    iconName: "notification", // Name of the icon
  },
  render: (args) => (
    <RdsBadge {...args}>
      <RdsIcon name={args.iconName} width="16px" height="16px" />
    </RdsBadge>
  ),
};
BadgeWithIcon.parameters = { controls: { include: ['size', 'colorVariant', 'badgeType', 'iconName', 'isIconshow'] } };

export const BadgeWithIconAndText: Story = {
  args: {
    size: "small",
    label: "Badge",
    colorVariant: "primary",
    badgeType: "pill",
    iconName: "notification", // Adjust based on your available icons
    iconPosition: "left", // Control whether the icon is on the left or right
  },
  render: (args) => (
    <RdsBadge {...args}>
      {args.iconPosition === "left" && (
        <RdsIcon name={args.iconName} width="16px" height="16px" classes="me-1" />
      )}
      {args.label}
      {args.iconPosition === "right" && (
        <RdsIcon name={args.iconName} width="16px" height="16px" classes="ms-1" />
      )}
    </RdsBadge>
  ),
};
BadgeWithIconAndText.parameters = { controls: { include: ['size', 'label', 'colorVariant', 'badgeType', 'iconName', 'iconPosition'] } };
