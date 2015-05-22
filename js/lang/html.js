(function(window){
	'use strict';
	if('function' === typeof window.highlight)
	{
		window.highlight.langs.html=[
			{
				'match':/(?:<|&lt;)([a-z][\w\d\-\:]*)((?:\s*[a-z_\-]+(?:=(?:"[^"]*"|'[^']*'|[^>]+|(?!&gt;)))?)*)(?:>|&gt;)/gi,
				'replace':function(_,tag,props){
					'use strict';
					return '&lt;<span class="tag"><span>'+tag+'</span>'+
						props.replace(
							/(?:(\s*[a-z_\-\d]+)(?:=("[^"]*"|'[^']*'|[^>]+|(?!&gt;)))?)/g,
							function(_,attr,value){
								return '<span class="attribute">'+attr+'</span>'+
									(value?'=<span class="value">'+value+'</span>':'');
							}
						)+
						'</span>&gt;';
				}
			}
		];
	}

})(Function('return this')());
