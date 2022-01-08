# Markdown Cheatsheet

Syntax below can be seen immediately in markdown input preview.

However, there are some syntax that will only process after the form submission,
such as [quick reference](/doc/quickReference.md).

## Common usage

[Cheatsheet](https://www.markdownguide.org/cheat-sheet/)

## Customized syntax

`[R]` means required; `[O]` means optional.

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

- `unit-icon` is for either character or dragon icon. This will be displayed inline.
- `modal` renders the image as a link. The viewer will need to click on it to see the image.

### In-text calculation

```
==([fx])<Expression>([fx])(Decimal)==
```

> Things in the parentheses are optional.

Show the expression and the result in 2 decimals at the end:

```
==<Expression>[fx][2f]==
```

- `[O]` `[fx]` is a constant string representing the placeholder of the calculation expression.
- `[R]` `<Expression>` is the expression used for the calculation.
- `[O]` `<Decimal>` is the number of decimals to display.
  - Either have something like `[2f]` for showing 2 decimals, or omit it all.
  - Default to 0 decimals i.e., the answer will be an integer if not set.

> Both `*` and `x` mean multiply.

### Unit link

```
--<UnitID>/<Name>--
```

- `[R]` `<UnitID>` is the unit ID of the link.
- `[O]` `<Name>` is the named used for getting the ID.
  - This will be the customized unit name instead of the real unit name.

#### References

Check [mathjs documentation](https://mathjs.org/docs/expressions/syntax.html)
for the expression syntax.
