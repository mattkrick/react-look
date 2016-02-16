# Getting started

The following usage guide should provide enough information to build apps with Look.

1. [Installation](#1-installation)
2. [First Component](#2-first-component)
3. [Stateless Components](#3-stateless-components)
4. [Pseudo classes](#4-pseudo-classes) <img src="res/dom-badge.png" height=15>
5. [Media queries](#5-media-queries) <img src="res/dom-badge.png" height=15>
6. [Mixins & Plugins](#6-mixins--plugins)
	* 6.1. [Configuration & LookRoot](#61-configuration--lookroot)
	* 6.2. [look wrapper](#62-look-wrapper)
	* 6.3. [Usage](#63-usage)
7. [Fallback values](#7-fallback-values) <img src="res/dom-badge.png" height=15>
8. [Vendor prefixes](#8-vendor-prefixes) <img src="res/dom-badge.png" height=15>
9. [Server-side rendering](#9-server-side-rendering) <img src="res/dom-badge.png" height=15>
10. [DevTools](#10-devtools)

## 1. Installation
First of all we need to install Look to our project.

<img src="res/dom-badge.png" height=25>
```sh
npm install react-look --save
```
<img src="res/native-badge.png" height=25>
```sh
npm install react-look-native --save
```

Now we are able to import Look into our code. We can either use the new ECMAScript 2015 `import` syntax or the CommonJS `require` syntax. *(The examples will use the `import`-syntax)*

<img src="res/dom-badge.png" height=25>
```javascript
// ECMAScript 2015
import look from 'react-look'

// CommonJS
const look = require('react-look')
```
<img src="res/native-badge.png" height=25>
```javascript
// ECMAScript 2015
import look from 'react-look-native'

// CommonJS
const look = require('react-look-native')
```
## 2. First Component
Now its time to compose your first Component. <br>
You basically start with a blank `React` Component that renders some markup.

<img src="res/dom-badge.png" height=25>
```javascript
import React, { Component } from 'react'

export default class FirstComponent extends Component {
	render() {
		return <div>My first Component!</div>
	}
}
```
<img src="res/native-badge.png" height=25>
```javascript
import React, { View, Component } from 'react-native'

export default class FirstComponent extends Component {
	render() {
		return <View>My first Component!</View>
	}
}
```

#### StyleSheet.create(styles)
Now that we got the basic Component let's start adding some styles.<br>

<img src="res/dom-badge.png" height=25>

We use the `StyleSheet.create` helper to generate unique `className`s.<br> This let's us reuse the same CSS class multiple times.

```javascript
import { StyleSheet } from 'react-look'
import React, { Component } from 'react'

export default class FirstComponent extends Component {
	render() {
		// pass the `className` to the element
		return <div className={styles.box}>My first Component!</div>
	}
}

const styles = StyleSheet.create({
	box: {
		color: 'red',
		fontSize: 14, // numbers automatically get 'px' added
		padding: 8,
		border: '1px solid gray'
	}
})
```
<br>
<img src="res/native-badge.png" height=25>

We also use the `StyleSheet.create` helper with React Native, but it does (by now) only return the exact same styles.
> Note: It gets imported differently!

```javascript
import { StyleSheet } from 'react-look/native'
import React, { View, Component } from 'react-native'

export default class FirstComponent extends Component {
	render() {
		// pass the `style` to the element
		return <View style={styles.box}>My first Component!</View>
	}
}

const styles = StyleSheet.create({
	box: {
		color: 'red',
		fontSize: 14, // numbers automatically get 'px' added
		padding: 8,
		border: '1px solid gray'
	}
})
```
#### Multiple styles
You can even have multiple styles assigned to a single node as well as multiple styles for multiple nodes.

<img src="res/dom-badge.png" height=25>
```javascript
import { StyleSheet } from 'react-look'
import React, { Component } from 'react'
// We use this shortcut to write less code
const c = StyleSheet.combineStyles

export default class FirstComponent extends Component {
	render() {
		return (
			// Use the combineStyles to combine styles
			// You can pass in as many styles as you wish
			<div className={c(styles.box, styles.specialBox)}>
				<title className={styles.title}>My first Component!</title>
			</div>
		)
	}
}

const styles = StyleSheet.create({
	box: {
		color: 'red',
		fontSize: 14,
		padding: 8,
		border: '1px solid gray'
	},
	specialBox: {
		backgroundColor: 'red'
	},

	title: {
		fontWeight: 900,
		fontFamily: 'Lato'
	}
})
```
<br>
<img src="res/native-badge.png" height=25>
```javascript
import { StyleSheet } from 'react-look/native'
import React, { View, Text, Component } from 'react-native'
// We use this shortcut to write less code
const c = StyleSheet.combineStyles

export default class FirstComponent extends Component {
	render() {
		return (
			// Use the combineStyles to combine styles
			// You can pass in as many styles as you wish
			<View style={c(styles.box, styles.specialBox)}>
				<Text style={styles.title}>My first Component!</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	box: {
		color: 'red',
		fontSize: 14,
		padding: 8,
		border: '1px solid gray'
	},
	specialBox: {
		backgroundColor: 'red'
	},

	title: {
		fontWeight: 900,
		fontFamily: 'Lato'
	}
})
```

## 3. Stateless Components
With Look you can easily style even **[Stateless Components](http://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#stateless-function-components)** which have been introduced with React 0.14.
> Note: This will destroy the performance benefit as Look transforms those to Stateful Components again, but it is less code to type.

<img src="res/dom-badge.png" height=25>
```javascript
import { StyleSheet } from 'react-look'
import React, { Component } from 'react'

export default ({title}) => <div className={styles.box}>{title}</div>

const styles = StyleSheet.create({
	box: {
		color: 'red',
		fontSize: 14,
		padding: 8,
		border: '1px solid gray'
	}
})
```
<br>
<img src="res/native-badge.png" height=25>
```javascript
import { StyleSheet } from 'react-look/native'
import React, { View, Component } from 'react-native'

export default ({title}) => <View style={styles.box}>{title}</View>

const styles = StyleSheet.create({
	box: {
		color: 'red',
		fontSize: 14,
		padding: 8,
		border: '1px solid gray'
	}
})
```

## 4. Pseudo classes <img src="res/dom-badge.png" height=20>
Look supports every available pseudo class. The syntax is similar to Sass and supports multiple nested pseudo classes as well.

> Check [StyleSheet API reference - Pseudo classes](api/StyleSheet.md#pseudo-classes]) for more information on how the nesting gets resolved.

```javascript
import { StyleSheet } from 'react-look'

const styles = StyleSheet.create({
	box: {
		color: 'red',
		fontSize: 14,
		padding: 8,
		border: '1px solid gray',
		':hover': {
			color 'blue',
			// multiple nesting
			':active': {
				color: 'gray'
			}
		}
	}
})
```

## 5. Media Queries <img src="res/dom-badge.png" height=20>
You may also use media queries. They can be nested as well.
> Check [StyleSheet API reference - Media queries](api/StyleSheet.md#media-queries]) for more information on how the nesting gets resolved.

```javascript
import { StyleSheet } from 'react-look'

const styles = StyleSheet.create({
	box: {
		color: 'red',
		fontSize: 14,
		padding: 8,
		border: '1px solid gray',
		'@media (min-width: 300px)': {
			color 'blue',
			// => @media (min-width: 300px) and (min-height: 400px)
 			'@media (min-height: 400px)': {
				color: 'gray'
			}
		}
	}
})
```
> **Extra tip**: You can even mix media queries and pseudo classes together.

## 6. Mixins & Plugins
For **dynamic styling** we use an advanced set of mixins and plugins. <br>
But while basic styles just work with the `StyleSheet` API by default, it **requires some configuration** to be able to use plugins, mixins or devTools.

### 6.1. Configuration & [LookRoot](api/LookRoot.md)
We will use a preset which provides every mixin & plugin available. We will refer to this as the 'global config' as it should affect every Component resolved with Look. To apply those we need to wrap our whole application into the `LookRoot` Component which uses `context` to spread the configuration to all child Components.
> Note: If you want to use a custom configuration check out the [configuration guide](guides/configureLook.md).


<img src="res/dom-badge.png" height=25>
```javascript
import { Presets, LookRoot } from 'react-look'
import { render } from 'react-dom'
import React from 'react'

const config = Presets['react-dom']

render(<LookRoot config={config}><App /></LookRoot>, document.getElementById('app'))
```
<br>
<img src="res/native-badge.png" height=25>
```javascript
import { Presets } from 'react-look'
import { LookRoot } from 'react-look/native'
import React, { AppRegistry }  from 'react-native'

const config = Presets['react-native']

const Container = () => <LookRoot config={config}><App /></LookRoot>
AppRegistry.registerComponent('native', () => Container)
```
### 6.2. look wrapper
Resolving mixins and plugins requires your Component to be wrapped with the `look` wrapper.

<img src="res/dom-badge.png" height=25>
```javascript
import look from 'react-look'
import React, { Component } from 'react'

class FirstComponent extends Component {
	render() {
		return <div>My first Component!</div>
	}
}

// Now if importing 'FirstComponent'
// you will actually get the Look-enhanced one
export default look(FirstComponent)
```
<br>
<img src="res/native-badge.png" height=25>
```javascript
import look from 'react-look'
import React, { View, Component } from 'react-native'

class FirstComponent extends Component {
	render() {
		return <View>My first Component!</View>
	}
}

export default look(FirstComponent)
```

#### Decorator
Alternatively you may use the decorator/annotation `@look`.
Though I do not recommend this as they neither are part of the ECMAScript 2015 specification nor part of the ECMAScript 2016 by now.

<img src="res/dom-badge.png" height=25>
```javascript
import look from 'react-look'
import React, { Component } from 'react'

// Note that now you can export directly
@look
export default class FirstComponent extends Component {
	render() {
		return <div>My first Component!</div>
	}
}
```
<br>
<img src="res/native-badge.png" height=25>
```javascript
import look from 'react-look'
import React, { View, Component } from 'react-native'

@look
export default class FirstComponent extends Component {
	render() {
		return <View>My first Component!</View>
	}
}
```

### 6.3. Usage
Now as you got all the configuration and wrapping done, simply start using mixins within your `StyleSheet.create`.
> Check out [Mixins.md](Mixins.md) and [Plugins.md](Plugins.md) to learn about every available mixin and plugin and how to use them!

<img src="res/dom-badge.png" height=25>
```javascript
import look, { StyleSheet } from 'react-look'
import React, { Component } from 'react'

// Note that now you can export directly
@look
export default class FirstComponent extends Component {
	constructor() {
		super(...arguments)
		this.state = { clicks: 0 }
		this.increment = this.increment.bind(this)
	}

	increment() {
		this.setState({ clicks: this.state.clicks++ })
	}

	render() {
		return (
			<div className={styles.box} onClick={this.increment}>
				I am growing on click!
			</div>
		)
	}
}

const styles = StyleSheet.create({
	box: {
		backgroundColor: 'red',
		// with every click the width increments by 1 pixel
		width: (props, state) => state.clicks,
		// if specialProp is set to true the fontSize is 30
		// <FirstComponent specialProp />
		'specialProp=true': {
			fontSize: 30
		},
		// On iOS the font is 'Helvetica Neue'
		'@platform ios': {
			fontFamily: 'Helvetica Neue'
		}
	}
})
```
<br>
<img src="res/native-badge.png" height=25>
```javascript
import look from 'react-look'
import { StyleSheet } from 'react-look/native'
import React, { View, Component, TouchableHighlight } from 'react-native'

// Note that now you can export directly
@look
export default class FirstComponent extends Component {
	constructor() {
		super(...arguments)
		this.state = { clicks: 0 }
		this.increment = this.increment.bind(this)
	}

	increment() {
		this.setState({ clicks: this.state.clicks++ })
	}

	render() {
		return (
			<TouchableHighlight onPress={this.increment}>
				<View style={styles.box}>
					I am growing on click!
				</View>
			</TouchableHighlight>
		)
	}
}

const styles = StyleSheet.create({
	box: {
		backgroundColor: 'red',
		// with every click the width increments by 1 pixel
		width: (props, state) => state.clicks,
		// if specialProp is set to true the fontSize is 30
		// <FirstComponent specialProp />
		'specialProp=true': {
			fontSize: 30
		}
	}
})
```
## 7. Fallback values <img src="res/dom-badge.png" height=20>
Using the `Presets['react-dom']` we already include the [Fallback Value](plugins/FallbackValue.md) plugin that allows multiple fallback values as an array.
```javascript
{
	box: {
		color: ['rgba(0, 0, 0, 0.5)', '#ccc']
	}
}
```
which is similar to the following CSS code:
```CSS
.box {
	color: rgba(0, 0, 0, 0.5);
	color: #ccc;
}
```
## 8. Vendor prefixes <img src="res/dom-badge.png" height=20>
`Presets['react-dom']` also automatically includes the [Prefixer](plugins/Prefixer.md) plugin which uses [inline-style-prefixer](https://github.com/rofrischmann/inline-style-prefixer) to add only prefixes that are actually required. It uses data provided by [caniuse.com](caniuse.com) and evaluates the `userAgent` for browser information.

## 9. Server-side rendering <img src="res/dom-badge.png" height=20>
Look also fully supports server-side rendering with minimal additional configuration.<br>
You basically just need to pass the users `userAgent` with the `LookRoot` config to be able to prefix correctly. This is most likely done directly within the request. <br>
e.g. [universal example](../demo/server.js) (`npm run demo:universal`) using an [express](http://expressjs.com/) server:
```javascript
const serverConfig = Presets['react-dom']

app.get('/', (req, res) => {
	// Takes the userAgent directly form the request
  serverConfig.userAgent = req.headers['user-agent']

  const content = renderToString(
    <App lookConfig={serverConfig} />
  )

  res.write(indexHTML.replace('<!-- {{app}} -->', content))
  res.end()
})
```

## 10. DevTools
DevTools are **special** plugins used to boost **your** developer experience *(also now as DX)*. They come in handy if you want to *e.g.* debug your code or quality-proof it.

Look also provides some devTools which can be easily applied by just adding them to the plugins list, but you should **only use them for development**.
> Check out [Plugins.md](Plugins.md#devtools) for an overview of all devTools.

```javascript
import { Presets, Plugins } from 'react-look'

const config = Presets['react-dom']
// a devTool that improves className readability for better debugging
config.plugins.push(Plugins.friendlyClassName)
```