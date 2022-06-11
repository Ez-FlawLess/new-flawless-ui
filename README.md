# Features

- [Conditional](#Conditional)

## Conditional

Group of components helping you in rendering components from lists or expressions.

#### Components

- [Show](#Show)
- [IfElse](#IfElse)

### Show

Renders chilrend props if ```when``` prop is true

```javascript
<Show when={expression}>
    {jsx}
</Show>
```
### IfElse

If want to have a if-else statemnet you can wrap your ```<Show />``` components with this. it will only render the first ```<Show />``` component that has a true expression in its ```when``` prop

```javascript
<IfElse>
    <Show when={expression}>
        {jsx}
    </Show>
    <Show when={expression}>
        {jsx}
    </Show>
    <Show when={expression}>
        {jsx}
    </Show>
</IfElse>
```
