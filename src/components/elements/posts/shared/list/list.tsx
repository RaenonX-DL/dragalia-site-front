import React from 'react';

import {Col, Row} from 'react-bootstrap';

import {PostListEntry} from '../../../../../api-def/api';
import {PostEntry, PostEntryProps} from './entry';


type PostListProps<E extends PostListEntry> = PostEntryProps<E> & {
  entries: Array<E>,
};


export const PostList = <E extends PostListEntry>({entries, ...props}: PostListProps<E>) => {
  return (
    <Row>
      {
        entries.map((post) => {
          return (
            <Col lg={12} key={post.seqId.toString() + post.lang} className="mb-3">
              <PostEntry entry={post} {...props}/>
            </Col>
          );
        })
      }
    </Row>
  );
};
