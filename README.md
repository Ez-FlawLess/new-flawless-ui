# Features

- [Conditional](#Conditional)
- [Network](#Network)

## Conditional

Group of components helping you in rendering components from lists or expressions.

#### Components

- [Show](#Show)
- [IfElse](#IfElse)
- [For](#For)
- [Switch](#Switch)

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

### Switch

Works just like a normal switch case

```javascript
<Switch expression={variable}>
    <Case value={value1} break>
        {jsx}
    </Case>
    <Case value={value2}>
        {jsx}
    </Case>
    <Case default>
        {jsx}
    </Case>
</Switch>
```

## Network

It handles loading and feedback for HTTP requests.

#### Config

First you need to install [axios](https://www.npmjs.com/package/axios)

```bash
npm i axios
```

then you can create an [axios instance](https://www.npmjs.com/package/axios#creating-an-instance) and pass it to the config file and pass it to the ```FlawLessUI``` component

```javascript
const instance = axios.create({
    baseURL: BASE_URL,
})

import { FlawLessUI, createConfig } from 'flawless-ui'

const config = createConfig({
    axiosInstance: instance,
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <FlawLessUI config={config}>
    <App />
  </FlawLessUI>
)
```

#### Components

- [Loading](#Loading)
- [HttpFeedback](#HttpFeedback)

#### Hooks

- [useLoading](#useLoading)

### Loading

It handles loading for the given url

```javascript
useEffect(() => {
    getData()
}, [])

const getData = async () => {
  await api.get('seed/picsum/200/300')
}

return (
    <Loading url="seed/picsum/200/300">
        {(loading: boolean) => (
            <>
              {loading ? 'loading' : 'done'}
            </>
         )}
     </Loading>
)
```

### HttpFeedback

First you should create your Alert components and pass to the to the config file

```javascript
import { createConfig } from 'flawless-ui'

const config = createConfig({
    ...restOfConfig,
    components: {
        alerts: {
          success: (props: AlertI) => <div>S - {props.title} - {props.message}<button onClick={props.onClose}>close</button></div>,
          error: (props: AlertI) => <div>E - {props.title} - {props.message}<button onClick={props.onClose}>close</button></div>,
        },
    },
})
```

By default ```HttpFeedback``` handles error for all request but success for only post, put, patch and delete requests. You can change this how ever by passing an array of methods to the httpMethods of config

```javascript
import { createConfig, HTTP_METHODS } from 'flawless-ui'

const config = createConfig({
  ...restOfConfig,
  httpMethods: [...HTTP_METHODS, 'get'],
})
```

Then you can use it like this

```javascript
useEffect(() => {
    getData()
}, [])

const getData = async () => {
  await api.get('seed/picsum/200/300')
}

return (
    <HttpFeedback 
        url="seed/picsum/200/300"
    />
)
```

The message and title passed to the alert component come from 3 methods:
- [onError and onSuccess props](#onError-and-onSuccess-props)
- success and error key value pairs in config
- status code message from config

#### onError and onSuccess props

### useLoading

If not given a url it will return true if any request is being made or if given a url only returns true for that url

```javascript
const loading = useLoading()

return (
    <>
        {loading ? 'loading' : 'done'}
    </>
)
```
