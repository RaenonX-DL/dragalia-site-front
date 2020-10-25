import React from 'react';
import {Table} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';

// These keys need to be consistent with the definition structure at the back side
// Type name: `QuestPostDirResponseKey`
export type PostListEntry = {
  seqId: number | string,
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
          <th className="text-center">{t('posts.list.id')}</th>
          <th className="text-center w-25">{t('posts.list.title')}</th>
          <th className="text-center">{t('posts.list.view_count')}</th>
          <th className="text-center">{t('posts.list.last_modified')}</th>
          <th className="text-center">{t('posts.list.published')}</th>
        </tr>
      </thead>
      <tbody>
        {
          posts.map((post) => {
            return (
              <tr key={post.seqId}>
                <td className="text-center">#{post.seqId}</td>
                <td><a href={linkGenerator(post.seqId)}>{post.title}</a></td>
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
