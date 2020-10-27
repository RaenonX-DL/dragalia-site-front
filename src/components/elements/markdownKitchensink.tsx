import React from 'react';
import {Markdown} from './markdown';

export const MarkdownKitchensink = () => {
  const data = `
Paragraph

# h1

## h2

### h3

#### h4

##### h5

###### h6

> ## This is a header.
> 1. This is the first list item.
> 2. This is the second list item.
>
> Here's some example code:
>
>     Markdown.generate();

- Red
- Green
- Blue

1. Buy flour and salt
1. Mix together with water
1. Bake

Normal paragraph.
Code

---------------------------------------

This is [an example](http://example.com "Example") link.

[This link](http://example.com) has no title attr.

This is [an example][id] reference-style link.

[id]: http://example.com "Optional Title"

*single asterisks*

_single underscores_

**double asterisks**

__double underscores__

This paragraph has some \`code\` in it.

![Alt Text](https://get.svg.workers.dev/?s=64&f=gray "Image Title")

Col A | Col B | Col C | Col D
:---  | :---: |  ---: |  ---
A     | B     | C     | D
A     | B     | C     | D
A     | B     | C     | D
A     | B     | C     | D

https://youtu.be/r3JymUaIIYE

https://i.imgur.com/PBKQ0ZX.jpg`;

  return (<Markdown>{data}</Markdown>);
};
