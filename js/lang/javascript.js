(function(window){

	if('function' === typeof window.highlight)
	{
		(console.warn||console.log).call(console,'The syntax highlight for Javascript is broken.');
		
		window.highlight.javascript=[
			{
				'class':'string',
				'match':/("(?:[^"]|\\")*"|'(?:[^']|\\')*')(?=[\b\s\(\),:;])/g,
				'replace':window.highlight.default_replace
			},
			{
				'class':'number',
				'match':/(?![a-z_\-])(\d+(?:\.\d+))(?=[\b\s\(\),:;])/g,
				'replace':window.highlight.default_replace
			},
			{
				'class':'comment',
				'match':/(\/\/[^\r\n]*|\/\*(?:[^*]|\*[^\/])*\*\/)/g,
				'replace':window.highlight.default_replace
			},
			{
				'class':'regexp',
                'match':/(\/(?:\\\/|[^\/])+\/(?:[gim]+)?)/g,
				'replace':window.highlight.default_replace
			},
			{
				'class':'keyword',
				'match':/\b(do|if|in|for|let|new|try|var|case|else|enum|eval|null|this|true|void|with|await|break|catch|class|const|false|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)\b/g,
				'replace':window.highlight.default_replace
			}
		];
	}

})(Function('return this')());
