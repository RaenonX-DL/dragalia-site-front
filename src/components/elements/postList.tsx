import React from 'react';
import {Table} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';

/**
 * Sync with `QuestPostListResponseKey` at back.
 */
export type PostListEntry = {
  seqId: number | string,
  lang: string,
  title: string,
  viewCount: number,
  modified: string,
  published: string
}


type linkGenerator = (id: number | string) => string;


export const PostList = ({posts, linkGenerator}: { posts: Array<PostListEntry>, linkGenerator: linkGenerator }) => {
  const {t} = useTranslation();

  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th className="text-center">{t('posts.info.id')}</th>
          <th className="text-center w-25">{t('posts.info.title')}</th>
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
                <td className="no-line-break"><a href={linkGenerator(post.seqId)}>{post.title}</a></td>
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
