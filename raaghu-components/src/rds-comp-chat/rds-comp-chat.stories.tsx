import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import RdsCompUserComments from './rds-comp-chat';
const meta: Meta<typeof RdsCompUserComments> = {
    title: "Components/Chat",
    component: RdsCompUserComments,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        allowDelete: { control: "boolean" },
        isEmojiPicker : {control :"boolean"},
        isFilepload : {control :"boolean"},
        dateFormat: {
            options: ["dd/mm/yyyy", "mm/dd/yyyy", "Default-with-time"],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsCompUserComments>;

export default meta;

type Story = StoryObj<typeof RdsCompUserComments>;
const handleCommentCountChange = (newCount: number) => {
    console.log("Updated comment count:", newCount);
};


export const Default: Story = {
    args: {
        currentUser: {
            firstName: "Max",
            lastName: "Kevin",
            // If currentUser's profilePic is an empty string, display the first characters of firstName and lastName as a placeholder profile picture.
            profilePic :"https://cdn.shortpixel.ai/spai/q_lossy+ret_img+to_webp/honestproductreviews.com/wp-content/uploads/2018/08/Asset-5.png"
        },
        comments: [
            {
                firstName: "Alice",
                lastName: "Smith",
                profilePic: "https://png.pngtree.com/png-vector/20220807/ourmid/pngtree-women-avatar-wearing-suit-with-long-black-hair-png-image_6102781.png",
                date: new Date().toLocaleDateString('en-US'),  
                comment: "Description is missing in the current version."
            },
            {
                firstName: "Maria",
                lastName: "Brown",
                profilePic: "https://www.educationworld.co.in/wp-content/uploads/2023/05/dummy-female.jpg",
                date: new Date().toLocaleDateString('en-US'),
                comment: "Refer ISO 21.5 for the same."
            },
            {
                firstName: "Ann",
                lastName: "Augustine",
                profilePic: "https://static.vecteezy.com/system/resources/previews/009/398/577/original/man-avatar-clipart-illustration-free-png.png",
                date: new Date().toLocaleDateString('en-US'),
                comment: "I had a wonderful experience."
            },
            {
                firstName: "David",
                lastName: "Brown",
                profilePic: "",
                date: new Date().toLocaleDateString('en-US'),
                comment: "I had a wonderful experience."
            },
        ],
        allowDelete: false,
        isEmojiPicker : false ,
        isFilepload : false,
        dateFormat  : 'mm/dd/yyyy',
        onCommentCountChange: handleCommentCountChange, // Added callback for comment count change
    },
};

export const WithDelete: Story = {
    args: {
        currentUser: {
            firstName: "Jane",
            lastName: "Doe",
            profilePic : ""
        },
        comments: [
            {
                firstName: "Alice",
                lastName: "Smith",
                profilePic: "https://png.pngtree.com/png-vector/20220807/ourmid/pngtree-women-avatar-wearing-suit-with-long-black-hair-png-image_6102781.png",
                date: new Date().toLocaleDateString('en-US'),
                comment: "This is a great product!"
            },
            {
                firstName: "Maria",
                lastName: "Brown",
                profilePic: "https://www.educationworld.co.in/wp-content/uploads/2023/05/dummy-female.jpg",
                date: new Date().toLocaleDateString('en-US'),
                comment: "I had a wonderful experience."
            },
            {
                firstName: "Ann",
                lastName: "Augustine",
                profilePic: "https://static.vecteezy.com/system/resources/previews/009/398/577/original/man-avatar-clipart-illustration-free-png.png",
                date: new Date().toLocaleDateString('en-US'),
                comment: "I had a wonderful experience."
            },
            {
                firstName: "David",
                lastName: "Brown",
                profilePic: "",
                date: new Date().toLocaleDateString('en-US'),
                comment: "I had a wonderful experience."
            },
        ],
        allowDelete: true,
        isEmojiPicker : false ,
        isFilepload : false,
        dateFormat  : 'mm/dd/yyyy',
        onCommentCountChange: handleCommentCountChange, // Added callback for comment count change
    },
};
