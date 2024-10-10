/* eslint-disable quotes */
import React, { useState } from "react";
import './rds-comp-user-comments.scss';
import { RdsIcon, RdsInput } from "../rds-elements";

interface Comment {
    username: string;
    profilePic: string;
    date: Date;
    comment: string;
}

interface RdsCompUserCommentsProps {
    comments: Comment[];
    currentUser: {
        firstName: string;
        lastName: string;
        profilePic: string;
    };
    allowDelete?: boolean; // Optional prop to control delete functionality
    width?: "small" | "medium" | "large"; // Width options
}

const RdsCompUserComments: React.FC<RdsCompUserCommentsProps> = ({ 
    comments, 
    currentUser, 
    allowDelete = false,
    width = "medium" // Default width
}) => {
    const [commentText, setCommentText] = useState('');
    const [commentList, setCommentList] = useState<Comment[]>(comments);
    const [lastUserCommentIndex, setLastUserCommentIndex] = useState<number | null>(null); // Track last comment index

    const handleAddComment = () => {
        if (commentText.trim() === '') return;

        const newComment: Comment = {
            username: `${currentUser.firstName} ${currentUser.lastName}`,
            profilePic: currentUser.profilePic,
            date: new Date(),
            comment: commentText,
        };

        setCommentList([...commentList, newComment]);
        setCommentText('');
        setLastUserCommentIndex(commentList.length); // Update the index of the last user comment
    };

    const handleDeleteComment = (index: number) => {
        if (allowDelete) {
            const updatedComments = commentList.filter((_, i) => i !== index);
            setCommentList(updatedComments);

            // Reset lastUserCommentIndex if the deleted comment was the last one
            if (lastUserCommentIndex === index) {
                setLastUserCommentIndex(null);
            } else if (lastUserCommentIndex !== null && index < lastUserCommentIndex) {
                setLastUserCommentIndex(prevIndex => (prevIndex !== null ? prevIndex - 1 : null));
            }
        }
    };

    return (
        <div className={`comments-container ${width}`}>
            {commentList.map((comment, index) => {
                const isCurrentUser = comment.username === `${currentUser.firstName} ${currentUser.lastName}`;
                const isLastCurrentUserComment = isCurrentUser && lastUserCommentIndex === index;

                return (
                    <div key={index} className={`comment-box ${isCurrentUser ? 'current-user' : 'other-user'}`}>  
                        <div className="d-flex flex-row-reverse">
                            <div className="profile-initials">
                                {comment.profilePic && comment.profilePic.trim() !== "" ? (
                                    <img
                                        src={comment.profilePic}
                                        alt={`${comment.username}'s profile`}
                                        className="profile-pic"
                                    />
                                ) : (
                                    <div className="initials">
                                        {`${currentUser.firstName.charAt(0)}${currentUser.lastName.charAt(0)}`}
                                    </div>
                                )}
                            </div>
                        <div className="comment-content">
                            <div className="comment-text">
                                {comment.comment}
                                {/* Show delete icon only for the last comment of the current user */}
                                {allowDelete && isLastCurrentUserComment && (
                                    <RdsIcon
                                        name="delete"
                                        fill={false}
                                        stroke={true}
                                        colorVariant="primary"
                                        isCursorPointer={true}
                                        width="30px"
                                        height="30px"
                                        onClick={() => handleDeleteComment(index)}
                                    />
                                )}
                            </div>
                        </div>
                   
                </div>
                       
                        <div className="comment-footer d-flex justify-content-end">
                            <div className="username">{comment.username}</div>
                            <div className="date text-muted ms-2">{comment.date.toLocaleString()}</div>
                        </div>
                    </div>
                );
            })}
            <div className="comment-input">              
                   <RdsInput
                                   value={commentText}
                                    inputType="text"                                 
                                    placeholder="Type comment..."
                                    name="password"                                   
                                    onChange={(e) => setCommentText(e.target.value)}                                  
                                    showIcon={true}
                                ></RdsInput>
          
                <RdsIcon
                                        name="sun"
                                        fill={false}
                                        stroke={true}
                                        colorVariant="primary"
                                        isCursorPointer={true}
                                        width="30px"
                                        height="30px"
                                        onClick={handleAddComment}
                                    />
                
            </div>
        </div>
    );
};

export default RdsCompUserComments;
