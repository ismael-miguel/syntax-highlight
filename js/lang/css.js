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
				'class':'comment',
				'match':/(\/\*(?:[^*]|\*[^\/])*\*\/)/g,
				'replace':window.highlight.default_replace
			},
			{
				'class':'class',
				'match':/(\.[a-z\-\_]+)/gi,
				'replace':window.highlight.default_replace
			},
			{
				'class':'tag',
				'match':/([a-z]+|\*)/g,
				'replace':window.highlight.default_replace
			}
		];
	}

})(Function('return this')());
