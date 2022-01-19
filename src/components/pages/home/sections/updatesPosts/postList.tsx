import React from 'react';

import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';

import {PostInfoEntry} from '../../../../../api-def/api';
import {GeneralPath} from '../../../../../api-def/paths';
import {useI18n} from '../../../../../i18n/hook';
import {SubscribeButton, SubscribeButtonProps} from '../../../../elements/common/button/subscribe/main';
import {RowNoGutter} from '../../../../elements/common/grid/row';
import {InternalLink} from '../../../../elements/common/link/internal';
import {PostEntry} from '../../../../elements/posts/list/entry';


type Props = SubscribeButtonProps & {
  title: string,
  titlePath: GeneralPath,
  entries: PostInfoEntry[],
  getIcon?: (entry: PostInfoEntry) => React.ReactElement,
};

export const PostList = ({title, titlePath, entries, getIcon, ...props}: Props) => {
  const {t, lang} = useI18n();

  const {defaultSubscribed} = props;

  const [disableIndividualSub, setDisableIndividualSub] = React.useState(defaultSubscribed);

  return (
    <div className="section">
      <RowNoGutter className="text-center m-1">
        <Col>
          <h5 className="m-0">
            <InternalLink locale={lang} href={titlePath} content={title}/>
          </h5>
        </Col>
        <Col xs="auto">
          <SubscribeButton
            onClick={setDisableIndividualSub}
            {...props}
          />
        </Col>
      </RowNoGutter>
      {
        entries.length ?
          entries.map((entry, idx) => {
            const {pid, info, type} = entry;

            return (
              <PostEntry
                key={idx}
                entry={info}
                type={type}
                pid={pid}
                title={entry.title}
                renderPostBadge={() => <Badge bg="dark-primary">#{entry.pid}</Badge>}
                icon={getIcon ? getIcon(entry) : undefined}
                disableSubscription={disableIndividualSub}
              />
            );
          }) :
          <p className="mb-0 text-center text-danger">
            {t((t) => t.home.message.noPost)}
          </p>
      }
    </div>
  );
};
