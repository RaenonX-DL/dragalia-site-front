# Markdown Cheatsheet

## Common usage

[Cheatsheet](https://www.markdownguide.org/cheat-sheet/)

## Customized syntax

`[R]` means required.
`[O]` means optional.

### Text coloring

```
::[<Color>]<Text>::
```

- `[R]` `<Color>` can be either RGB as `#707070` or a preset CSS color like `red`.
- `[R]` `<Text>` is any kind of text.

### Text enlarging

Slightly larger (1.5rem):

```
!!<Text>!!
```

Larger (2rem):

```
!!!<Text>!!!
```

- `[R]` `<Text>` is any kind of text.

### Image with classes

```
![<Alt>](<ImageURL>|<ClassNames>)
```

- `[O]` `<Alt>` is the `alt` attribute for HTML `<img>`.
- `[R]` `<ImageURL>` is the URL of the image.
- `[R]` `<ClassNames>` are the css class names to apply onto the image.

#### Available class names

- `unitIcon` is for either character or dragon icon. This will be displayed inline.

### In-text calculation

```
==([fx])<Expression>([fx])(Decimal)==
```

Show the expression and the result in 2 decimals at the end:

```
==<Expression>[fx][2f]==
```

> Things in the parentheses are optional.

- `[O]` `[fx]` is a constant string representing the placeholder of the calculation expression.
- `[R]` `<Expression>` is the expression used for the calculation.
- `[O]` `<Decimal>` is the number of decimals to display.
  - Either have something like `[2f]` for showing 2 decimals, or omit it all.

> Both `*` and `x` mean multiply.
