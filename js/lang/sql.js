(function(window){

	if('function' === typeof window.highlight)
	{
		
		window.highlight.langs.css=[
			{
				'class':'string',
				'match':/("(?:[^"]|[\\"]")*"|'(?:[^']|[\\']')*')(?=[\b\s\),;\/\]]|$)/g,
				'replace':window.highlight.default_replace
			},
			{
				'class':'attribute',
				'match':/\[([a-z\-\_]+)(?=\s*(?:[\|*\^\$\~]?=|\]))/gi,
				'replace':'[<span class="attribute">$1</span>'
			},
			{
				'match':/(-?[a-z][a-z\-]+):(?:([^;}]+)(?=;|}))?/gi,
				'replace':'<span class="style">$1</span>:<span class="value">$2</span>'
			},
			{
				'class':'comment',
				'match':/(\/\*(?:[^*]|\*[^\/])*(?:\*\/|$))/g,
				'replace':window.highlight.default_replace,
				'patch':function(){
					return this.innerHTML.replace(//matches multi-line comments
							/<span class="comment">(\/\*(?:[^*]|\*[^\/])+(?:\*\/(?:<\/span>)?|$))/g,
							function(_,part1){
								return '<span class="comment">'+
									//cleans up all spans
									(part1||'').replace(/<\/?span(?: class="[^"]+")?>/g,'')+
									'</span>';
							}
						);
				}
			},
			{
				'class':'at-rule',
				'match':/@(-?[a-z\-\_]+)/gi,
				'replace':'@<span class="at-rule">$1</span>'
			},
			{
				'class':'pseudo',
				'match':/:(:?)(-?[a-z\-\_]+)/gi,
				'replace':':$1<span class="pseudo">$2</span>'
			},
			{
				'class':'class',
				'match':/\.([a-z\-\_]+)(?=\s*|{|\.)/gi,
				'replace':'.<span class="class">$1</span>'
			},
			{
				'class':'tag',
				'match':/([a-z]+|\*)(?=[:\s\.,\[\{])/g,
				'replace':window.highlight.default_replace
			}
		];
	}

})(Function('return this')());
