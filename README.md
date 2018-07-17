# @Barebones/Ajax
A simple Ajax call using fetch(), falling back to XmlHttpRequest for IE10+ support

```
npm install @barebones/ajax --save
```

```
  import ajax from '@barebones/ajax';

// Ajax Call
ajax( {
	'url' : 'https://csskarma.com/blog/wp-json/wp/v2/pages/1528',
	'type' : 'GET',
	'dataType' : 'json'
	}, function( data ) {
		console.log( data );
	}
);
```

If you're not using ES6, you don't need the `import`, just include the script