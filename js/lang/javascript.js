(function(window){

	if('function' === typeof window.highlight)
	{
		(console.warn||console.log).call(console,'The syntax highlight for Javascript is broken.');
		
		window.highlight.javascript=[
			{
				'class':'string',
                'regex':/("(?:[^"]|\\")*"|'(?:[^']|\\')*')(?=[\b\s\(\),:;])/g,
				'replace':window.highlight.default_replace
			},
			{
				'class':'number',
				'regex':/(?![a-z_\-])(\d+(?:\.\d+))(?=[\b\s\(\),:;])/g,
				'replace':window.highlight.default_replace
			},
			{
				'class':'comment',
				'regex':/(\/\/[^\r\n]*|\/\*(?:[^*]|\*[^\/])*\*\/)/g,
				'replace':window.highlight.default_replace
			},
			{
				'class':'regexp',
                'regex':/(\/(?:\\\/|[^\/])+\/(?:[gim]+)?)/g,
				'replace':window.highlight.default_replace
			},
			{
				'class':'keyword',
				'regex':/\b(do|if|in|for|let|new|try|var|case|else|enum|eval|null|this|true|void|with|await|break|catch|class|const|false|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)\b/g,
				'replace':window.highlight.default_replace
			}
		];
	}

})(Function('return this')());
