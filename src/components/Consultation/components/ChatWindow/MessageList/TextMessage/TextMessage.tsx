import React from 'react';
import clsx from 'clsx';
import { Link } from '@material-ui/core';
import linkify from 'linkify-it';
import { makeStyles } from '@material-ui/styles';
import Chats from '../../Chats/Chats';
const useStyles = makeStyles({
  messageContainer: {
    borderRadius: '16px',
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.5em 0.8em 0.6em',
    margin: '0.3em 0 0',
    wordBreak: 'break-word',
    backgroundColor: '#E1E3EA',
    hyphens: 'auto',
    whiteSpace: 'pre-wrap',
  },
  isLocalParticipant: {
    backgroundColor: '#CCE4FF',
  },
});

interface TextMessageProps {
  body: string;
  isLocalParticipant: boolean;
  author:string;
  dateCreated:string;
}

function addLinks(text: string) {
  const matches = linkify().match(text);
  if (!matches) return text;

  const results = [];
  let lastIndex = 0;

  matches.forEach((match, i) => {
    results.push(text.slice(lastIndex, match.index));
    results.push(
      <Link target="_blank" rel="noreferrer" href={match.url} key={i}>
        {match.text}
      </Link>
    );
    lastIndex = match.lastIndex;
  });

  results.push(text.slice(lastIndex, text.length));

  return results;
}

export default function TextMessage({ body, author ,isLocalParticipant,dateCreated }: TextMessageProps) {
  return (
    <>
    {/* <Chats client={"local"} msg={"hi"} author={"shivam"} time={"just min ago"} />
    <Chats client={"global"} msg={"hello"} author={"sachin"} time={"just min ago"} /> */}
    {(isLocalParticipant) ?
    <Chats client={"local"} msg={body} author={author} time={dateCreated} /> :<>
  <Chats client={"global"} msg={body} author={author} time={dateCreated} />
    </>}
    </>
  );
}
