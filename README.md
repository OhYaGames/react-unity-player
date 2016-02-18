# react-unity-player

React component for Unity 3d Web player

This react component wraps modified contents of the [example](http://docs.unity3d.com/Manual/WorkingwithUnityObject.html) in Unity docs.

### Usage

From the command line

```$ npm install react-unity-player```

In your code:

```
import Unity3dPlayer from 'react-unity-player';

...

<Unity3dPlayer
	src={initPlugin}
	width={this.props.game.width}
	height={this.props.game.height}
	params={{
		enableDebugging: '0',
		logoimage: '/assets/img/objects/preloader.png',
		progressbarimage: '/assets/img/objects/progress.png',
		progressframeimage: '/assets/img/objects/container.png',
		backgroundcolor: '000000',
		disableExternalCall: true
	}} />
...
```

### Dependencies

jQuery 1.7.1 imported from ```https://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.1/jquery.min.js```

Unity Object 2 imported from ```https://ssl-webplayer.unity3d.com/download_webplayer-3.x/3.0/uo/UnityObject2.js```


### Contributing

Please feel free to open issues or submit pull requests.