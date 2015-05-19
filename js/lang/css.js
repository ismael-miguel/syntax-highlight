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
				 'match':/(-?[a-z][a-z\-]+):(?:([^;}]+)(?=;|}))?/g,
				'replace':'<span class="style">$1</span>:<span class="value">$2</span>'
			},
			{
				'class':'comment',
				'match':/(\/\*(?:[^*]|\*[^\/])*\*\/)/g,
				'replace':window.highlight.default_replace
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
