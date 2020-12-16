import React from 'react';
import {Table} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';

import {AnalysisPostListEntry, AnalysisPostType} from '../../constants/api';


type linkGenerator = (id: number | string) => string;


type PostListProps = {
  posts: Array<AnalysisPostListEntry>,
  linkGenerator: linkGenerator
};


export const AnalysisPostList = ({posts, linkGenerator}: PostListProps) => {
  const {t} = useTranslation();

  const translateType = (type: AnalysisPostType) => {
    if (type === AnalysisPostType.CHARACTER) {
      return t('posts.analysis.type.character');
    } else if (type === AnalysisPostType.DRAGON) {
      return t('posts.analysis.type.dragon');
    } else {
      return t('posts.analysis.type.uncategorized');
    }
  };

  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th className="text-center">{t('posts.info.id')}</th>
          <th className="text-center">{t('posts.analysis.unit_type')}</th>
          <th className="text-center w-25">{t('posts.analysis.unit_name')}</th>
          <th className="text-center">{t('posts.info.view_count')}</th>
          <th className="text-center">{t('posts.info.last_modified')}</th>
          <th className="text-center">{t('posts.info.published')}</th>
        </tr>
      </thead>
      <tbody>
        {
          posts.map((post) => {
            return (
              <tr key={post.seqId.toString() + post.lang}>
                <td className="text-center">#{post.seqId}</td>
                <td className="text-center">{translateType(post.type)}</td>
                <td className="no-line-break"><a href={linkGenerator(post.seqId)}>{post.unitName}</a></td>
                <td className="text-right">{post.viewCount}</td>
                <td className="text-center">{post.modified}</td>
                <td className="text-center">{post.published}</td>
              </tr>
            );
          })
        }
      </tbody>
    </Table>
  );
};
