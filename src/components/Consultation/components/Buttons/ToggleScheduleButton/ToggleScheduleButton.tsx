import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import ChairIcon from "../../../icons/ChairIcon"
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import Badge from "@material-ui/core/Badge";
import useChatContext from "../../../hooks/useChatContext/useChatContext";

export const ANIMATION_DURATION = 700;

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: 20,
    top: 13,
    padding: "0 4px",
  },
}))(Badge);

const useStyles = makeStyles({
  iconContainer: {
    position: "relative",
    display: "flex",
  },
  circle: {
    width: "10px",
    height: "10px",
    backgroundColor: "#5BB75B",
    borderRadius: "50%",
    position: "absolute",
    top: "-3px",
    left: "13px",
    opacity: 0,
    transition: `opacity ${ANIMATION_DURATION * 0.5}ms ease-in`,
  },
  hasUnreadMessages: {
    opacity: 1,
  },
  ring: {
    border: "3px solid #5BB75B",
    borderRadius: "30px",
    height: "14px",
    width: "14px",
    position: "absolute",
    left: "11px",
    top: "-5px",
    opacity: 0,
  },
  animateRing: {
    animation: `$expand ${ANIMATION_DURATION}ms ease-out`,
    animationIterationCount: 1,
  },
  "@keyframes expand": {
    "0%": {
      transform: "scale(0.1, 0.1)",
      opacity: 0,
    },
    "50%": {
      opacity: 1,
    },
    "100%": {
      transform: "scale(1.4, 1.4)",
      opacity: 0,
    },
  },
});

export default function ToggleScheduleButton(props: {
  className?: string;
  count: number;
}) {
  const classes = useStyles();
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const {
    isScheduleWindowOpen,
    setIsScheduleWindowOpen,
    conversation,
  } = useChatContext();

  const toggleChatWindow = () => {
    setIsScheduleWindowOpen(!isScheduleWindowOpen);
  };

  useEffect(() => {
    if (shouldAnimate) {
      setTimeout(() => setShouldAnimate(false), ANIMATION_DURATION);
    }
  }, [shouldAnimate]);

  useEffect(() => {
    if (conversation && !isScheduleWindowOpen) {
      const handleNewMessage = () => setShouldAnimate(true);
      conversation.on("messageAdded", handleNewMessage);
      return () => {
        conversation.off("messageAdded", handleNewMessage);
      };
    }
  }, [conversation, isScheduleWindowOpen]);

  return (
    <>
      {props.count == 0 ? (
        <Button
          data-cy-chat-button
          className={props.className}
          onClick={toggleChatWindow}
          startIcon={<ChairIcon />}
        />
      ) : (
        <StyledBadge badgeContent={props.count} color="primary">
          <Button
            data-cy-chat-button
            className={props.className}
            onClick={toggleChatWindow}
            startIcon={<ChairIcon />}
          />
        </StyledBadge>
      )}
    </>
  );
}
