# Answers

### q1

A PureComponent trigger the re-render automatically only when props or state changes, instead a Component re-render every time the parent component re-render.

How you can break an app:\
```
// Children div
class MyDiv extends React.PureComponent {
  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}
class MyContainer extends React.Component {
  render() {
    return (<>
     <MyDiv type='string'>
        This is simple text
     </MyDiv>
     <MyDiv type='html'>
       <span>This is html child</span>
     </MyDiv>
    </>);
  }
}
```
In the above example the app will break because the shallow comparison inside the `<MyDiv type="html"` component always returns false.

### q2

Because if a component changes it context value, others descendants components that use that value won’t update if an intermediate component returns false from shouldComponentUpdate.

### q3

Using `prop`, using `ref`, using `context`

### q4

Using `React.memo()` for wrapping components\
Using `React.useMemo()` for wrapping components or functions that prevents re-render\
Using `React.useCallback()` for wrapping functions that prevents re-render\

### q5

Fragment is used to wrap list of children without creating extra nodes.

### q6


### q7

in Promise using reject\
in Callbacks returning an error object\
in async/await using try/catch

### q8

Two arguments.\
Is async because making it synchronous might leave the browser unresponsive

### q9 

1 - remove constructor
2 - refactor state variables with useState hook
3 - remove data binding and use just functions
4 - remove lifecycle functions and use useEffect hook
5 - remove render and return the jsx

### q10

- importing stylesheets from an external module
- using inline style
- using an object as stylesheet inside component

### q11

```
return <div dangerouslySetInnerHTML={{__html: myHtmlVariable }}></div>
```
