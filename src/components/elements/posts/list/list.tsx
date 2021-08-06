import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {SequencedPostInfo} from '../../../../api-def/api';
import {PostEntry, PostEntryProps} from './entry';


type PostListProps<E extends SequencedPostInfo> = PostEntryProps<E> & {
  entries: Array<E>,
};


export const PostList = <E extends SequencedPostInfo>({entries, ...props}: PostListProps<E>) => {
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
