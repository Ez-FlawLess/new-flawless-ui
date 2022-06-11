# Features

- [Conditional](#Conditional)

## Conditional

Group of components helping you in rendering components from lists or expressions.

#### Components

- [Show](#Show)
- [IfElse](#IfElse)
- [For](#For)

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

### For

Has a variaty of ways to help you render an array with ease

```javascript
<For list={array}>
    {item => (
        {jsx}
    )}
</For>
```

If you have small changes in your jsx depending on the index or it being the first or last item you can use it like this

```javascript
<For list={array}>
    {(item, index, isFirst, isLast) => (
        {jsx}
    )}
</For>
```

If your jsx is completely for first or last item you can pass their function in the ```firstItem``` and ```lastItem```. They will render in the correct place and it won't render again in the children function

```javascript
<For 
    list={array}
    firstItem={item => ({jsx})}
    lastItem={item => ({jsx})}
>
    {item => (
        {jsx}
    )}
</For>
```
