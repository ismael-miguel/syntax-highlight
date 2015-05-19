(function(window){

	if('function' === typeof window.highlight)
	{
		
		window.highlight.css=[
			{
				'class':'attribute',
				'match':/(\[[a-z\-\_]+(?:[|*\^\$\~]?="(?:[^"]|\\")*"|'(?:[^']|\\')*')?\])/gi,
				'replace':window.highlight.default_replace
			},
			{
				'class':'style',
				'match':/(-?[a-z][a-z\-]+)(?=:)/g,
				'replace':window.highlight.default_replace
			},
			{
				'class':'value',
				'match':/\b([^;}]+)(?=;|})/g,
				'replace':window.highlight.default_replace
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
				'match':/([a-z]+|\*)(?=:|\s|\.|,|\[)/g,
				'replace':window.highlight.default_replace
			}
		];
	}

})(Function('return this')());
