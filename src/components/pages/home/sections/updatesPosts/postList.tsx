import React from 'react';

import Badge from 'react-bootstrap/Badge';

import {PostInfoEntry} from '../../../../../api-def/api';
import {GeneralPath} from '../../../../../const/path/definitions';
import {toPostPath} from '../../../../../const/path/utils';
import {useI18n} from '../../../../../i18n/hook';
import {makePostUrl} from '../../../../../utils/path/make';
import {InternalLink} from '../../../../elements/common/link/internal';
import {PostEntry} from '../../../../elements/posts/list/entry';


type Props = {
  title: string,
  titlePath: GeneralPath,
  entries: PostInfoEntry[],
  getIcon?: (entry: PostInfoEntry) => React.ReactElement,
};

export const PostList = ({title, titlePath, entries, getIcon}: Props) => {
  const {t, lang} = useI18n();

  return (
    <div className="section">
      <h5 className="text-center mt-2">
        <InternalLink locale={lang} href={titlePath} content={title}/>
      </h5>
      {
        entries.length ?
          entries.map((entry, idx) => {
            const {pid, info} = entry;

            return (
              <PostEntry
                key={idx}
                entry={info}
                link={makePostUrl(toPostPath[entry.type], {pid, lang: info.lang})}
                title={entry.title}
                renderPostBadge={() => <Badge bg="secondary">#{entry.pid}</Badge>}
                icon={getIcon ? getIcon(entry) : undefined}
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
