import React from 'react';

import Link from 'next/link';
import {Button, Col, Row} from 'react-bootstrap';

import {PagePath} from '../../../const/path/definitions';
import {useI18n} from '../../../i18n/hook';

type NewButtonEntry = {
  url: PagePath,
  title?: string,
}

export type PostManageBarProps = {
  newButtons: Array<NewButtonEntry>,
  editPostUrl?: string
}

// FIXME: New post button URL with `lang` or not?
export const PostManageBar = ({newButtons, editPostUrl}: PostManageBarProps) => {
  const {t} = useI18n();

  // FIXME: Check if the nav item is clickable (<Link> works)
  return (
    <Row>
      <Col>
        {
          editPostUrl &&
            <Link href={editPostUrl}>
              <Button variant="outline-info" className="float-right ml-2">
                {t((t) => t.posts.manage.edit)}
              </Button>
            </Link>
        }
        {
          newButtons.map(({url, title}, idx) => (
            <Link href={url} key={idx}>
              <Button variant="outline-success" className="float-right ml-2">
                {title || t((t) => t.posts.manage.add)}
              </Button>
            </Link>
          ))
        }
      </Col>
    </Row>
  );
};
