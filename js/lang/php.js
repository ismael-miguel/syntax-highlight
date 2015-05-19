(function(window){

	if('function' === typeof window.highlight)
	{
		(console.warn||console.log).call(console,'The syntax highlight for PHP is broken.');
		
		window.highlight.lang.php=[
			{
				'match':/<<<'?((?:[a-z_][a-z_\d]*|[a-z_][a-z_\d]*))'?((?:\s|.)*)$/gi,
				'replace':function(_, delimiter, remaining){
					return '<span class="doc">&lt;&lt;&lt;'+delimiter+remaining.replace(new RegExp('([\r\n])('+delimiter+')([\r\n;])',''),'$1$2</span>$3');
				}
			},
			{
				'class':'comment',
				'match':/((?:\/\/|#).*|\/\*(?:[^*]|\*[^\/])*\*\/)/g,
				'replace':window.highlight.default_replace
			},
			{
				'class':'var',
                'match':/(\$[a-z_][a-z\d_]*)/gi,
				'replace':window.highlight.default_replace
			},
			{
				'class':'keyword',
				'match':/\b(a(?:bstract|nd|rray|s)|c(?:a(?:llable|se|tch)|l(?:ass|one)|on(?:st|tinue))|d(?:e(?:clare|fault)|ie|o)|e(?:cho|lse(?:if)?|mpty|nd(?:declare|for(?:each)?|if|switch|while)|val|x(?:it|tends))|f(?:inal|or(?:each)?|unction)|g(?:lobal|oto)|i(?:f|mplements|n(:?clude(?:_once)?|st(?:anceof|eadof)|terface)|sset)|n(?:amespace|ew)|p(?:r(?:i(?:nt|vate)|otected)|ublic)|re(?:quire(?:_once)?|turn)|s(?:tatic|witch)|t(?:hrow|r(?:ait|y))|u(?:nset|se)|__halt_compiler|break|list|x?or|var|while)\b/gi,
				'replace':window.highlight.default_replace
			}
		];
	}

})(Function('return this')());
