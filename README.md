# js-vdom

A lightweight framework for data binding that uses a virtual DOM inside. Perfect for web apps!

## Usage
This framework uses the concept of "components" to get its work done. A component is specified using the `data-iq-component` attribute.

```html
<div data-iq-component="TimerComponent"></div>
```

Somewhere in your page, a `TimerComponent` controller must exist.

```js
function TimerComponent() {
	this.time = {
		seconds = 0,
	};

	setInterval(() => {
		this.time.seconds++;
	}, 1000);
}
```

Data binding is achieved using brackets in the template.

```html
<div data-iq-component="TimerComponent">
	{{this.time.seconds}} seconds have passed!.
</div>
```

## Advanced usage
The framework also includes many other powerful features that you probably didn't know about!

### Component injection
The component controller has a few dependencies that can be injected by the framework.

#### Global application state
The component controller can inject a global application state managed by the framework.

```js
function TimerComponent({appState: state}) {}
```

The application state has the following methods:

##### `.all()`
Returns all entries in the global state.

##### `.create(key, value)`
Creates an entry in the global state with the given key and value.

##### `.update(key, value)`
Updates an entry in the global state. The global state may only be mutated through this method. Internally, this method causes the view to re-render.

##### `.get(key)`
Retrieves a value from the global state.

Here's a quick example of how the global app state can be used.

```js
function AppComponent({appState}) {
	appState.create('user', undefined);
}

function LoginComponent({appState}) {
	appState.update('user', 'michael');
}
```

Note that this is all experimental.

#### Component host
The component controller can inject the component host as a native DOM element, i.e. the element containing the `data-iq-component`.

```js
function TimerComponent({host: cmp}) {}
```

#### Virtual DOM
The component controller can inject the virtual DOM. This reveals a single method: `ComponentShouldChange()`. Use this when the view should be updated based on state changes, but it failed to work.

```js
function TimerComponent({view: vdom}) {}
```

*In case you're curious, this framework works by observing enumerable properties of an object. Sometimes, weird things like nested `Map`s don't get observed well. Changes to those nested values may not propagate correctly.*

### Event handling
Events handled by the framework are known as `IQ Events`. You can specify these by the syntax `data-iq:event`, where `event` is any HTML event.

```html
<div data-iq-component="TimerComponent">
	{{this.time.seconds}} seconds have passed!.
	<button data-iq:click="this.reset()">reset</button>
</div>
```

```js
function TimerComponent() {
	this.time = {
		seconds = 0,
	};

	this.reset = () => {
		this.time.seconds = 0;
	};

	setInterval(() => {
		this.time.seconds++;
	}, 1000);
}
```

Unlike my [previous data binding library](https://github.com/mlcheng/js-binding), this framework uses a uni-directional data flow because that's the cool thing these days right? (Well, it's actually easier to reason about because the state only goes in one direction). To create two way binding, update events must be triggered.

```html
<div data-iq-component="TwoWayBindingComponent">
	<input type="text" data-iq:input="this.updateState($iqEvent)">
	<span>The text is: {{this.text}}</span>
</div>
```

You may have noticed the `$iqEvent` variable. This is a special magic variable used to pass the `input` event to the handler.

```js
function TwoWayBindingComponent({host}) {
	this.text = 'Hi!';
	this.updateState = (event) => {
		this.text = event.target.value;
	};

	// Start out with `Hi!` as the text.
	host.querySelector('input').value = this.text;
}
```

### Dynamically loading components
If you're lazy loading things (and you should), this framework exposes only one method, and it's to help render a lazy-loaded component. `iqwerty.vdom.Load()` takes in a reference to an HTML element and instantiates it.

```js
iqwerty.vdom.Load(document.getElementById('lazy-loaded-section'));
```

### Dynamically rendering child nodes
Child nodes can be rendered in the template syntax as well. Here's a quick to-do app (that can only add items) as an example.

```html
<div data-iq-component="ToDoApp">
	<ul>
		{{this.items.map(item => `<li>${item}</li>`).join('')}}
	</ul>

	<input type="text" placeholder="todo item">
	<button data-iq:click="this.addItem()">add</button>
</div>
```

```js
function ToDoApp({host}) {
	this.items = ['Buy milk'];

	this.addItem = () => {
		const todo = host.querySelector('input');
		this.items.push(todo.value);

		todo.value = '';
		todo.focus();
	};
}
```

The syntax of this will very likely be changed in the future.

## Gotchas
* There are issues with white space and HTML comments.
* The components are `eval`uated with a (slight) attempt at securing the context.
* There are no tests.