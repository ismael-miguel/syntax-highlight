(function(window){

	if('function' === typeof window.highlight)
	{
		
		window.highlight.css=[
			{
				'class':'attribute',
                'regex':/(\[[a-z\-\_]+(?:[|*\^\$\~]?="(?:[^"]|\\")*"|'(?:[^']|\\')*')?\])/gi,
				'replace':window.highlight.default_replace
			},
			{
				'class':'comment',
				'regex':/(\/\*(?:[^*]|\*[^\/])*\*\/)/g,
				'replace':window.highlight.default_replace
			},
			{
				'class':'class',
				'regex':/(\.[a-z\-\_]+)/gi,
				'replace':window.highlight.default_replace
			},
			{
				'class':'tag',
                'regex':/([a-z]+|\*)/g,
				'replace':window.highlight.default_replace
			}
		];
	}

})(Function('return this')());
