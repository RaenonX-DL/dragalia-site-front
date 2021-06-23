# Markdown Cheatsheet

## Common usage

[Cheatsheet](https://www.markdownguide.org/cheat-sheet/)

## Customized syntax

### Text coloring

```
::[<Color>]<Text>::
```

- `<Color>` can be either RGB as `#707070` or a preset CSS color like `red`.
- `<Text>` is any kind of text.

### Text enlarging

Slightly larger (1.5rem):

```
!!<Text>!!
```

Larger (2rem):

```
!!!<Text>!!!
```

- `<Text>` is any kind of text.

### Image with classes

```
![<Alt>](<ImageURL>|<ClassNames>)
```

- `<Alt>` is the `alt` attribute for HTML `<img>`.
- `<ImageURL>` is the URL of the image.
- `<ClassNames>` are the css class names to apply onto the image.

#### Available class names

- `unitIcon` is for either character or dragon icon. This will be displayed inline.
