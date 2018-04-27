<!DOCTYPE html>
<html>
	<head>
		<title>ideal</title>
		<meta charset="utf-8">
	</head>
	<body>
		<div id="test">
			<p>{{msg}}</p>
			<p>{{msg}}</p>
			<p>{{msg}}</p>
			<p>{{what}}</p>
			<p>{{hey}}</p>
		</div>
		<script>
			var bindingMark = 'data-element-binding'
			function Element (id, initData) {
				var self	 = this,
					el 		 = self.el = document.getElementById(id)
					bindings = {} // the internal copy
					data 	 = self.data = {} // the external interface
					content  = el.innerHTML.replace(/\{\{(.*)\}\}/g, markToken)
				el.innerHTML = content
				for (var variable in bindings) {
					bind(variable)
				}
				if (initData) {
					for (var variable in initData) {
						data[variable] = initData[variable]
					}
				}
				function markToken (match, variable) {
					bindings[variable] = {}
					return '<span ' + bindingMark + '="' + variable +'"></span>'
				}
				function bind (variable) {
					bindings[variable].els = el.querySelectorAll('[' + bindingMark + '="' + variable + '"]')
				    ;[].forEach.call(bindings[variable].els, function (e) {
				        e.removeAttribute(bindingMark)
				    })
					Object.defineProperty(data, variable, {
						set: function (newVal) {
						    [].forEach.call(bindings[variable].els, function (e) {
						        bindings[variable].value = e.textContent = newVal
						    })
						},
						get: function () {
						    return bindings[variable].value
						}
					})
				}
			}
			
			var app = new Element('test', {
				msg: 'hello'
			})
		</script>
	</body>
</html>