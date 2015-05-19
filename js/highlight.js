(function(window){
	
	var f=window.highlight = function(element, lang){
		
		if(!(element instanceof Element))
		{
			throw new TypeError( 'The 2nd parameter must be an Element' );
		}
		
		lang = lang || element.getAttribute('data-lang') || '';
		
		if(!lang)
		{
			throw new TypeError( 'Missing language definition. Set the 2nd parameter or the attribute data-lang' );
		}
		
		var lang_defs = f.langs[lang];
		
		if(!lang_defs)
		{
			throw new TypeError( 'The language "' + lang + '" was not yet defined' );
		}
		
		element.className += ' highlight ' + lang;
		
		for(var i = 0, l = lang_defs.length; i<l; i++)
		{
			var html = '';
			
			for(var j = 0, k = element.childNodes.length; j<k; j++)
			{
				if(element.childNodes[j].nodeType === 3)
				{
					html += element.childNodes[j].nodeValue
						.replace(
							lang_defs[i].match,
							/*shortcut to decide if the lang_defs[i].replace is one of those types
							 *if so, passes it directly
							 *otherwise, makes a string matching based on the object
							 */
							{'string':1, 'function':1}[ typeof lang_defs[i].replace ]
								? lang_defs[i].replace
								: '<' + lang_defs[i].replace.tag +
									' class="' + lang_defs[i]['class'] + '">' +
										lang_defs[i].replace.text +
									'</' + lang_defs[i].replace.tag + '>'
						);
				}
				else
				{
					html += element.childNodes[j].outerHTML;
				}
			}
			element.innerHTML = html;
			
			if('function' === typeof lang_defs[i].patch)
			{
				var returned = lang_defs[i].patch.call( element );
				if('string' === typeof returned)
				{
					element.innerHTML = returned;
				}
			}
		}
	};

	//default replace object
	f.default_replace = {'tag': 'span', 'text': '$1'};
	
	//all the languages will be added here
	f.langs = {};

})(Function('return this')());//just be sure that we have the real window
