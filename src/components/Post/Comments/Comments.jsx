import React from 'react';
import { DiscussionEmbed } from 'disqus-react';

const Comments = ({ postTitle, postSlug, siteUrl, disqusShortname }) => {
  if (!disqusShortname) return null;

  return (
    <DiscussionEmbed
      shortname={disqusShortname}
      config={{
        url: siteUrl + postSlug,
        identifier: postTitle,
        title: postTitle,
      }}
    />
  );
};

export default Comments;
