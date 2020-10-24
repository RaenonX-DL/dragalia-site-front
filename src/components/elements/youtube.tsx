import React from 'react';

type Props = {
  videoId: string
}

type States = {}

/**
 * Embedded Youtube video element.
 */
export class EmbeddedYoutubeVideo extends React.Component<Props, States> {
  /**
   * Extract video ID from the URL. Returns `null` if not extractable.
   *
   * @param {string} videoUrl URL of the youtube video to extract the ID
   * @return {string | null} ID of the video if any
   */
  static extractVideoId(videoUrl: string): string | null {
    const match = videoUrl.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);

    return (match && match[2].length === 11) ? match[2] : null;
  }

  /**
   * Render the youtube video element.
   *
   * @return {JSX} JSX of the element
   */
  render() {
    const videoUrl = `//www.youtube.com/embed/${this.props.videoId}`;
    console.log(videoUrl);

    return (
      <div className="youtube-embed mb-2">
        {/* Do not line break this, or the video preview will be in a super low quality. */}
        {/* eslint-disable-next-line max-len */}
        <iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" src={videoUrl} className="border-0 youtube-embed" title={`Youtube video: ${videoUrl}`} allowFullScreen/>
      </div>
    );
  }
}
